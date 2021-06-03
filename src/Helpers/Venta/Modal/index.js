import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Helpers from '../'
import Search from '../icons/search.png';
import Item from './Item';
import Fail from './Fail';
import '../../../css/Ventas.css';
import QrReader from "react-qr-reader";

//Prueba
import Scanner from './Scanner'
import Alert from "react-s-alert";

class index extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Modal: false,
            Modal2: false,
            products: this.props.Modal.products,
            view: [],
            search: '',
            table: [],
            ofertas: [],
            escaner: false,
            tipo: "CB",
            result: ''
        }
        this.qrReader1 = React.createRef();
        // this.input = React.createRef();
    }

    componentWillMount() {
        this.lista_productos();
    }

    componentDidMount() {
        // document.getElementById("search").focus();
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        this.setState({
            products: nextProps.Modal.products,
            Modal: !this.state.Modal,
            table: nextProps.Modal.table,
            ofertas: nextProps.Modal.ofertas
        }, () => this.lista_productos());
    }

    lista_productos = () => {
        let Vista = [];
        const products = this.props.Modal.products;
        Object.keys(this.props.Modal.products).forEach(e => Vista.push(<Item
            data={{products: products[e], table: this.state.table, key: e, ofertas: this.state.ofertas}}/>));
        this.setState({view: Vista})
    }

    search_product = () => {
        let Vista = [];
        let data = this.state.search;
        const products = this.state.products;
        if (data !== '') {
            data = data.toUpperCase();
            const text = data + ".*";
            const regex = new RegExp(text);
            Object.keys(this.props.Modal.products).forEach(e => (regex.test(products[e].Nombre) || products[e].Codigo === (data).toString()) ? Vista.push(
                <Item
                    data={{
                        products: products[e],
                        table: this.state.table,
                        key: e,
                        ofertas: this.state.ofertas
                    }}/>) : null);
            // Object.keys(this.props.Modal.products).forEach(e => (regex.test(products[e].Nombre) || products[e].Codigo === (data).toString()) ? console.log(products[e]) : null)
            this.setState({view: null}, () => {
                if (Vista.length > 0) {
                    this.setState({view: Vista})
                } else {
                    Vista.push(<Fail/>)
                    this.setState({view: Vista})
                }
            })
        } else {
            this.lista_productos();
        }
    }

    search_product_by_code = () => {
        let Vista = [];
        let data = this.state.search
        const products = this.state.products
        if (data !== '' && data !== null) {
            Object.keys(this.props.Modal.products).forEach(e => (products[e].Codigo === (data).toString()) ? Vista.push(
                <Item
                    data={{
                        products: products[e],
                        table: this.state.table,
                        key: e,
                        ofertas: this.state.ofertas
                    }}/>) : null);
            this.setState({view: null}, () => {
                if (Vista.length > 0) {
                    this.setState({view: Vista})
                } else {
                    Vista.push(<Fail/>)
                    this.setState({view: Vista})
                }
            })
        } else {
            this.lista_productos();
        }
    }

    _Modal = () => {
        this.setState({Modal: !this.state.Modal});
        this.props.Modal.By = false;
    }

    _Modal2 = () => {
        this.setState({Modal2: !this.state.Modal2});
        this.props.Modal.By = false;
    }

    Cuenta = () => {
        this.setState({Modal: !this.state.Modal});
        Helpers.alta_cuenta(this.state.table)
        this.tooltip('Mesa Agregada', true)
    }

    Limpiar = (id) => {
        Helpers.liberar(id).then(e => {
            if (e === true) {
                this.tooltip('Éxito', true);
                this._Modal();
            } else {
                this.tooltip('Error', false)
                this._Modal();
            }
        })
    }

    extra_cuenta = () => {
        this.setState({Modal: !this.state.Modal});
        Helpers.extra_cuenta(this.state.table)
        this.tooltip('Mesa Agregada', true)
    }

    update_state = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        // this.setState({[name]: value}, () => (name === 'search') ? this.search_product() : null);
        this.setState({[name]: value}, () => {
            if (name === 'search') {
                this.search_product();
            }
        });
    }

    _QR = (e) => {
        if (e.target.id === "CB") {
            this.setState({Modal2: true, tipo: "CB"})
        } else {
            this.setState({Modal2: true, tipo: "QR"})
        }
    }

    handleError = err => {
        alert(err)
    }

    handleScan = (data) => {
        if (data) {
            this.setState({
                result: data,
                search: data,
                Modal2: false
            }, () => {
                this.search_product_by_code();
            })
        }
    }

    openImageDialog = () => {
        this.qrReader1.current.openImageDialog()
    }

    _onDetected = (result) => {
        if (result.codeResult.code !== this.state.result.codeResult.code && this.state.result !== '') this.setState({result: result});
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

    render() {

        let mesa = this.state.table;

        return (
            <Modal className="modal-xl modal-dialog modal-dialog-scrollable"
                   toggle={this._Modal}
                   isOpen={this.state.Modal}>
                <Alert stack={{limit: 3}}/>
                <div className="modal-content">
                    <ModalHeader toggle={this._Modal} className="modal-header">
                        Lista de Productos en inventario
                        <div className="row">
                            <img className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2" src={Search}/>
                            <input id="search" className="search col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8"
                                   placeholder="Buscar Producto"
                                   type="text"
                                // onmouseup="document.getElementById('search').select();"
                                   value={this.state.search}
                                   onChange={this.update_state}
                                   autoFocus={!this.state.Modal}
                                   ref={() => this.input}
                            />
                        </div>
                    </ModalHeader>
                    <ModalBody className="justify-content-center modal-body"
                               id="row2">
                        {this.state.view}

                        <Modal className="modal-xl modal-lg modal-dialog modal-dialog-scrollable"
                               toggle={this._Modal2}
                               isOpen={this.state.Modal2}>
                            <ModalHeader toggle={this._Modal2}>
                                Escaner QR
                            </ModalHeader>
                            <ModalBody>
                                {
                                    (this.state.tipo === "CB") ?
                                        <Scanner onDetected={this._onDetected}/>
                                        :
                                        <div>
                                            <QrReader
                                                ref={this.qrReader1}
                                                delay={300}
                                                onError={this.handleError}
                                                onScan={this.handleScan}
                                                style={{width: '100%', height: '100%'}}
                                                facingMode={'environment'}
                                            />
                                            < div className="btn btn-link align-self-center"><h6
                                                onClick={this.openImageDialog}>Escanear
                                                de Imagen</h6></div>
                                        </div>
                                }
                                <p>{this.state.result}</p>
                                {/*<p>{this.state.result !== '' ? this.state.result.codeResult.code : ''}</p>*/}
                            </ModalBody>
                            <ModalFooter>
                                <button
                                    className="btn btn-secondary"
                                    onClick={this._Modal2}> Cerrar
                                </button>
                            </ModalFooter>
                        </Modal>

                    </ModalBody>
                    <ModalFooter className="modal-footer">
                        {mesa.Segunda_Cuenta !== true ? <button
                            className="btn btn-toolbar"
                            onClick={this.Cuenta}> Otra Cuenta?
                        </button> : <button
                            className="btn btn-toolbar"
                            onClick={this.extra_cuenta}> Otra Cuenta Más?
                        </button>}
                        {mesa.Segunda_Cuenta === true ? <button
                            className="btn btn-danger"
                            onClick={() => this.Limpiar(mesa.Mesa)}> Limpiar Cuentas
                        </button> : null}
                        <button
                            id="QR"
                            className="btn btn-secondary"
                            onClick={this._QR}> Escanear QR
                        </button>
                        {/*   <button
                            id="CB"
                            className="btn btn-secondary"
                            onClick={this._QR}> Escanear CB
                        </button>
                        */}
                    </ModalFooter>
                </div>
            </Modal>
        );
    }
}

export default index;
