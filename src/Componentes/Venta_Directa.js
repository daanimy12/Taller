import React, {Component} from 'react';
import HelpersVenta from '../Helpers/Venta';
import {firebaseDatabase} from "../system/model/firebase/firebase";
import Preload from './Preload'
import Collect from '../Helpers/Venta_Directa/Collect';
import '../system/styles/Venta_Directa.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Scanner from "../Helpers/Venta/Modal/Scanner";
import QrReader from "react-qr-reader";
import Alert from "react-s-alert";

class Venta extends Component {

    state = {
        search_product_code: '',
        products: [],
        view_products: null,
        view_agregados: [],
        number: 0,
        agregados: [],
        carga: false,
        modal: null,
        scrollTop: 0,
        Modal: false,
    }

    componentDidMount() {
        // HelpersVenta.Productos().then(e => {
        //     this.setState({products: e.val()}, () => this.carga());
        // })
        firebaseDatabase.ref('Product').orderByChild('Estatus').equalTo('Activo').on('value', e => {
            this.setState({products: e.val()}, () => this.carga());
        })
        document.title = `Venta_Directa`;
        window.addEventListener('scroll', this.handleScroll);
    }

    limpieza = (array = []) => {
        this.setState({agregados: []}, () => this.load_agregados())
    }

    Collect = () => {
        const data = this.state;
        let total = 0;
        let product = [];
        let ganancia = 0;

        Object.keys(data.agregados).map(e => {
            product[e] = [];
            product[e].Cantidad = data.agregados[e].Cantidad_Usuario;
            product[e].Precio = data.agregados[e].Precio_Venta;
            product[e].Producto_ID = data.agregados[e].key;
            ganancia = ganancia + (data.agregados[e].GananciaFinal * data.agregados[e].Cantidad_Usuario)
            product[e].ganancia = (data.agregados[e].GananciaFinal * data.agregados[e].Cantidad_Usuario)
            total = total + data.agregados[e].Precio_Venta * data.agregados[e].Cantidad_Usuario;
        })
        if (total !== 0) this.setState({
            modal: <Collect
                data={{total: total, products: product, limpieza: this.limpieza, ganancia: ganancia}}
            />
        })
    }

    Free = () => {
        const data = this.state;
        let total = 0;
        let product = [];
        Object.keys(data.agregados).map(e => {
            product[e] = [];
            product[e].Cantidad = data.agregados[e].Cantidad_Usuario;
            product[e].Precio = data.agregados[e].Precio_Venta;
            product[e].Producto_ID = data.agregados[e].key;
            total = total + data.agregados[e].Precio_Venta * data.agregados[e].Cantidad_Usuario;
        })
        if (total !== 0) {
            const b = window.confirm("Estos productos no se contarán en Ventas");
            if (b) {
                HelpersVenta.pagar_libre(product).then(e => {
                    this.setState({agregados: []}, () => {
                        this.load_agregados();
                        this.tooltip('Venta Registrada', true)
                    })
                }).catch(e => {
                    console.log(e);
                    this.tooltip('Error', false)
                });
            }
        }
    }

    tooltip = (title, type) => {
        type ? Alert.success(title, {
            position: 'top-right',
            effect: 'bouncyflip',
            timeout: 1000
        }) : Alert.error(title, {
            position: 'top-right',
            effect: 'bouncyflip',
            timeout: 1000
        });
    };

    add = (key) => {
        const data = this.state;
        if (data.agregados[key] === undefined) {
            let add = data.products[key];
            add.Cantidad_Usuario = 1;
            add.key = key;
            data.agregados[key] = add;
        } else {
            if (data.agregados[key].Cantidad_Usuario < data.agregados[key].Cantidad) data.agregados[key].Cantidad_Usuario = data.agregados[key].Cantidad_Usuario + 1;
        }
        this.setState({agregados: data.agregados}, () => this.load_agregados())
    }

    cambio_cantidad = (e) => {
        const name = e.target.id;
        const value = e.target.value;
    }

    sumar = (key) => {
        const data = this.state;
        data.agregados[key].Cantidad_Usuario = (+data.agregados[key].Cantidad_Usuario) + 1;
        this.load_agregados();
    }

    restar = (key) => {
        const data = this.state;
        if (data.agregados[key].Cantidad_Usuario > 0) data.agregados[key].Cantidad_Usuario = (+data.agregados[key].Cantidad_Usuario) - 1;
        this.load_agregados();
    }

    load_agregados = () => {
        const data = this.state;
        let Vista = [];
        Object.keys(data.agregados).map(e => {
            Vista.push(
                <div key={e.toString()} className="col-12 row">

                    <div className="col-12 col-sm-5">
                        <h4>{data.agregados[e].Nombre}</h4>
                    </div>

                    <div className="col-10 col-sm-5 box_count_products">
                        <div className="def-number-input number-input safari_only">
                            <button
                                onClick={() => this.restar(e)}
                                className="minus"></button>
                            <input type="number" min={0} id={e.toString()}
                                   onChange={(i) => {
                                       this.setState({agregados: data.agregados})
                                   }}
                                   value={data.agregados[e].Cantidad_Usuario}
                                // readonly
                            />
                            {/*<p>{data.agregados[e].Cantidad_Usuario}</p>*/}
                            <button
                                onClick={() => this.sumar(e)}
                                className="plus"></button>
                        </div>
                    </div>

                    <div className="col-2 col-sm-2 justify-content-center align-content-center">
                        <button className="btn btn-danger"
                                onClick={() => this.delete(e)}
                        >X
                        </button>
                    </div>

                </div>
            )
        })
        this.setState({view_agregados: Vista}, () => this.setState({view_agregados: Vista}))
    }

    search_product = () => {
        const data = this.state;
        let temp = data.search_product_code.toUpperCase();
        // console.log(temp)
        const text = temp + ".*";
        const regex = new RegExp(text);
        let Vista = [];
        // console.log(data.products)
        Object.keys(data.products).forEach(e => (regex.test(data.products[e].Nombre) || data.products[e].Codigo === (temp).toString()) ?
            Vista.push(
                (typeof data.products[e].Image !== 'undefined') ?
                    <div key={e.toString()} className="col-12 col-sm-6">
                        <div className="item_inp">
                            <h5 className="name_product">{data.products[e].Nombre}</h5>
                            <div className="item">
                                <img className="item_img" alt="item"
                                     src={data.products[e].Image}/>
                            </div>
                            <h5 className="price_product">${data.products[e].Precio_Venta}</h5>
                            <h5 className="price_product">Restantes: {data.products[e].Cantidad}</h5>
                            <button onClick={() => this.add(e)} className="btn btn-success">Agregar
                            </button>
                        </div>
                    </div>
                    :
                    <div className="item_border">
                        <div className="item_inp">
                            <h5 className="name_product">{data.products[e].Nombre}</h5>
                            <div className="item">
                                <img className="item_img" alt="item"
                                     src={data.products[e].Image}/>
                            </div>
                            <h5 className="price_product">${data.products[e].Precio_Venta}</h5>
                            <h5 className="price_product">Restantes: {data.products[e].Cantidad}</h5>
                            <button onClick={() => this.add(e)} className="btn btn-success">Agregar
                            </button>
                        </div>
                    </div>
            ) : null);
        this.setState({view_products: Vista})
    }

    carga = () => {
        const data = this.state;
        // console.log(data)
        let Vista = [];
        Object.keys(data.products).slice(0, 8).map(e => {
            const item = data.products[e];
            // console.log(item)
            Vista.push(
                (typeof item.Image !== 'undefined') ?
                    <div key={e.toString()} className="col-12 col-sm-6">
                        <div className="item_inp">
                            <h5 className="name_product">{item.Nombre}</h5>
                            <div className="item">
                                <img className="item_img" alt="item"
                                     src={item.Image}/>
                            </div>
                            <h5 className="price_product">${item.Precio_Venta}</h5>
                            <h5 className="price_product">Restantes: {item.Cantidad}</h5>
                            <button onClick={() => this.add(e)} className="btn btn-success">Agregar
                            </button>
                        </div>
                    </div>
                    :
                    <div className="item_border">
                        <div className="item_inp">
                            <h5 className="name_product">{item.Nombre}</h5>
                            <div className="item">
                                <img className="item_img" alt="item"
                                     src={item.Image}/>
                            </div>
                            <h5 className="price_product">${item.Precio_Venta}</h5>
                            <h5 className="price_product">Restantes: {item.Cantidad}</h5>
                            <button onClick={() => this.add(e)} className="btn btn-success">Agregar
                            </button>
                        </div>
                    </div>
            )
        })
        this.setState({view_products: Vista, carga: true})
    }

    update_state = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        // this.setState({[name]: value}, () => (name === 'search') ? this.search_product() : null);
        this.setState({[name]: value}, () => {
            if (name === 'search_product_code') {
                this.search_product();
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        // console.log(top)
        this.setState({scrollTop: top});
    }

    scrollToTop = () => {
        const data = this.state;
        // $(window).animate({scrollTop: 0}, this.props.duration);
        for (let i = data.scrollTop; i > 0; i = i - 10) {
            this.setState({scrollTop: i})
        }
    }

    delete = (product) => {
        const data = this.state;
        let tmp = {};
        Object.keys(data.agregados).map(e => {
            if (e !== product) {
                tmp[e] = data.agregados[e];
            }
        })
        this.setState({agregados: tmp}, () => this.load_agregados())
    }

    _Modal = () => {
        this.setState({Modal: !this.state.Modal});
    }

    handleError = err => {
        alert(err)
    }

    _Modal2 = () => {
        this.setState({Modal2: !this.state.Modal2});
        this.props.Modal.By = false;
    }

    handleScan = (data) => {
        if (data) {
            this.setState({
                result: data,
                search_product_code: data,
                Modal: false
            }, () => {
                this.search_product();
            })
        }
    }

    _QR = (e) => {
        if (e.target.id === "CB") {
            this.setState({Modal2: true, tipo: "CB"})
        } else {
            this.setState({Modal2: true, tipo: "QR"})
        }
    }

    render() {
        let heigth = window.screen.height;
        let preload = <Preload/>;
        let buton = (this.state.scrollTop < heigth * .5) ? null :
            <a href="#" onClick={this.scrollToTop}
               className="ir-arriba"
               title="Volver arriba">
                    < span
                        className="fa-stack">
        < i
            className="fa fa-circle fa-stack-2x"/>
    <i className="fa fa-arrow-up fa-stack-1x fa-inverse"/>
    </span>
            </a>;

        let mesas = (this.state.carga === true) ? this.state.vista : preload;

        let botones = (this.state.view_agregados.length > 0) ?
            <>
                <div>
                    <button onClick={this.Collect} className="btn btn-success col-6">Pagar</button>
                </div>
                <br/>
                <div>
                    <button onClick={this.Free} className="btn btn-info col-6">Descontar</button>
                </div>
            </>
            :
            <h5>No se ha agregado productos</h5>

        return (
            <div key="Venta_Directa" className="col-12 col-md-12 col-lg-12 col-xl-12">
                <Alert stack={{limit: 3}}/>
                <Modal className="modal-xl modal-lg modal-dialog modal-dialog-scrollable"
                       toggle={this._Modal}
                       isOpen={this.state.Modal}>
                    <ModalHeader toggle={this._Modal2}>
                        Escaner QR
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <QrReader
                                ref={this.qrReader1}
                                delay={300}
                                onError={this.handleError}
                                onScan={this.handleScan}
                                style={{width: '100%', height: '100%'}}
                                facingMode={'environment'}
                            />
                        </div>
                        <p>{this.state.result}</p>
                        {/*<p>{this.state.result !== '' ? this.state.result.codeResult.code : ''}</p>*/}
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className="btn btn-secondary"
                            onClick={this._Modal}> Cerrar
                        </button>
                    </ModalFooter>
                </Modal>

                {buton}
                {this.state.modal}
                <h2 className="title_venta">Venta Directa</h2>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <h3 className="products_agregados">Productos Agregados</h3>
                        <div className="row box_agregados col-12">
                            {this.state.view_agregados}
                        </div>
                        {botones}
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <h3>Lista de Productos</h3>
                        <div className="row col-12">
                            <input className="input_search_code col-10" type="text" id="search_product_code"
                                   value={this.state.search_product_code} onChange={this.update_state}
                                   placeholder="Buscar producto" autoFocus={true}/>
                            <button onClick={this._Modal} className="btn btn-primary">QR</button>
                        </div>
                        <div className="row box_products_directa col-12">
                            {this.state.view_products}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Venta;
