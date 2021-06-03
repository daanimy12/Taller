import React, {Component} from 'react';
import Helper from '../../Venta'
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import Alert from "react-s-alert";
import Fecha from "../../Configuracion/Fecha";
import Scanner from "../../Venta/Modal/Scanner";
import QrReader from "react-qr-reader";

class index extends Component {

    state = {
        table: [],
        cambio: '',
        pago: 0,
        vista: false,
        segunda: false,
        cuenta: 0,
        total: false,
        pagar: 0,
        clientes: [],
        temp_pagar: 0,
        cliente: null,
        name_cliente: '',
        pocentaje_cliente: 0,
        cumple: false,
        ganancia: 0,
        tipo: "CB",
        Modal2: false,
    }

    componentDidMount() {
        Helper.Clientes().then(e => {
            // console.log(e.val())
            this.setState({clientes: e.val()})
        }).catch(/*this.tooltip('Error al cargar Clientes', false)*/)
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        this.setState({
            pagar: nextProps.data.total,
            temp_pagar: nextProps.data.total,
            products: nextProps.data.products,
            ganancia: nextProps.data.ganancia,
            vista: !this.state.vista
        });
    }

    clientes = () => {

        Helper.Descuentos().then(e => {
            const descuentos = e.val();
            const data = this.state;
            let total = 0;
            //console.log(data.products)
            let bool = false;
            let porcentaje = 0;
            let cliente = null;
            let name = '';
            let cumple = false;
            Object.keys(data.clientes).map(e => {
                if (data.clientes[e].CB === (data.cliente).toString().toUpperCase()) {
                    bool = true;
                    porcentaje = +data.clientes[e].Descuento;
                    cliente = data.clientes[e].CB;
                    name = data.clientes[e].Nombre + ' ' + data.clientes[e].ApellidoMa + ' ' + data.clientes[e].ApellidoPa;
                    let fecha = Fecha.Get_Fecha().toString().split('-');
                    let array = data.clientes[e].Fecha.split('-');
                    if (array[1] === fecha[1] && array[2] === fecha[2]) cumple = true;
                }
            })
            //let productos_sin =
            if (bool) {

                porcentaje = (porcentaje >= 0) ? porcentaje : 0
                let temp = 0;
                let d = [];

                Object.keys(data.products).map(e => {
                    Object.keys(descuentos).map(i => {
                        if (data.products[e].Producto_ID === descuentos[i].Modo) {
                            if (descuentos[i].Tipo == 'Total') {
                                //console.log('lleguer')
                                total = (+total + ((+descuentos[i].Importe) * (+data.products[e].Cantidad))).toFixed(2);
                                data.products[e].Descuento = true;
                                data.products[e].Precio_Original = data.products[e].Precio;
                                data.products[e].Precio = ((+descuentos[i].Importe) * (+data.products[e].Cantidad)).toFixed(2);
                            } else {
                                data.products[e].Descuento = true;
                                data.products[e].Precio = (+data.products[e].Precio - (+data.products[e].Precio * (100 * (+descuentos[i].Importe)))).toFixed(2)
                                total = (+total + (+data.products[e].Precio - (+data.products[e].Precio * (100 * (+descuentos[i].Importe))))).toFixed(2)
                            }
                        } else {
                            if (porcentaje !== 0) {
                                total = (+total + ((+data.products[e].Precio) - ((+data.ganancia) - (+data.ganancia * (+porcentaje) / 100)))).toFixed(2);
                            } else {
                                //console.log(data.products[e].Precio)
                                total = (+total + (+data.products[e].Precio)).toFixed(2);
                            }
                        }
                    })
                })
                temp = total;

                //let temp = (+data.pagar) - (+data.pagar * (+porcentaje) / 100).toFixed(2);
                if (parseInt(temp.toString().substring(temp.toString().indexOf('.') + 1, temp.toString().length)) <= 9) temp = temp.toString() + '0';
                // console.log(temp.toString().substring(temp.toString().indexOf('.') + 1, temp.toString().length)+'0')
                // console.log(parseInt(temp.toString().substring(temp.toString().indexOf('.') + 1, temp.toString().length)))
                if (temp.toString().substring(temp.toString().indexOf('.') + 1, temp.toString().length) < 50 && temp.toString().substring(temp.toString().indexOf('.') + 1, temp.toString().length) > 0) {
                    temp = parseFloat(temp.toString().substring(0, temp.toString().indexOf('.')) + '.50').toFixed(2);
                } else if (temp.toString().substring(temp.toString().indexOf('.') + 1, temp.toString().length) > 50) {
                    temp = (parseInt(temp.toString().substring(0, temp.toString().indexOf('.'))) + 1).toFixed(2)
                }
                this.setState({
                    pagar: temp,
                    cliente: cliente,
                    name_cliente: name,
                    pocentaje_cliente: porcentaje,
                    cumple: cumple
                }, () => this.setState({cambio: (+this.state.pago - (+this.state.pagar))}));
            } else {
                this.setState({
                    pagar: (data.temp_pagar),
                    cliente: null,
                    name_cliente: '',
                    pocentaje_cliente: 0,
                    cumple: false
                }, () => this.setState({cambio: (+this.state.pago - (+this.state.pagar))}));
            }
        })
    }

    Modal = () => {
        this.setState({vista: !this.state.vista}, () => (this.state.vista === false) ? this.setState({
            cambio: 0,
            cliente: null,
            cumple: false
        }) : null);
    }

    Pagar = () => {
        const data = this.state;
        if (data.cambio >= 0) {
            Helper.pagar_directa(data.products, data.pago, data.cambio, data.pagar, data.cliente).then(e => {
                this.setState({cambio: 0, cumple: false, cliente: null});
                this.Modal();
                this.tooltip('Pago Realizado', true);
                this.props.data.limpieza(this.state);
            }).catch(e => {
                this.Modal();
                this.tooltip('Error en Pago', false)
            })
        } else {
            alert('La cantidad a pagar es menor a la adeudada')
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

    update_state = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                if (name === "pago") {
                    this.setState({
                        cambio: (+this.state.pago - (+this.state.pagar))
                    })
                } else if (name === "cliente") {
                    this.clientes();
                }
            }
        );
    }

    _Modal2 = () => {
        this.setState({Modal2: !this.state.Modal2});
    }

    _QR = (e) => {
        if (e === "CB") {
            this.setState({Modal2: true, tipo: "CB"})
        } else {
            this.setState({Modal2: true, tipo: "QR"})
        }
    }

    handleScan = (data) => {
        console.log(data)
        if (data) {
            this.setState({cliente: data, Modal2: false}, () => this.clientes())
        }
    }

    render() {

        let data = this.state;

        let cambio = this.state.cambio;

        return (

            <div>
                <Alert stack={{limit: 3}}/>
                <Modal className="modal-lg modal-dialog modal-dialog-scrollable"
                       isOpen={this.state.vista}>
                    < ModalHeader>
                        Pagar Cuenta
                    </ModalHeader>
                    <ModalBody className=" modal_height" id="row">
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
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 flex-column">
                            <div className="header_cash">
                                <p className="pay_word_soze">Cliente</p>
                                <div className="row">
                                    <div className="col-10">
                                        <input className="pay_word_soze" type="text" id="cliente"
                                               placeholder="Número de cliente"
                                               value={this.state.cliente}
                                               onChange={this.update_state}/>
                                    </div>
                                    <div className="col-2">
                                        <button onClick={() => this._QR('QR')} className="btn btn-info">QR</button>
                                    </div>
                                </div>
                                {(this.state.cliente !== null) ?
                                    <p className="text-center">{data.name_cliente + ' ' + data.pocentaje_cliente + '% Descuento'}</p> : null}
                                {(this.state.cumple === true) ?
                                    <p className="text-center text-warning">HOY CUMPLE AÑOS</p> : null}
                            </div>
                            <div className="header_cash">
                                <p className="pay_word_soze">Total</p>
                                <p className="pay_word_soze">
                                    {data.pagar}
                                </p>
                            </div>
                            <div className="body_cash">
                                <p className="pay_word_soze">Paga:</p>
                                <input className="pay_word_soze" type="number" id="pago" placeholder="Ingrese Pago"
                                       onChange={this.update_state}/>
                            </div>
                            <div className="footer_cash">
                                <p className="pay_word_soze">Cambio:</p>
                                <p className="pay_word_soze">{cambio}</p>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className="btn btn-primary"
                            onClick={this.Pagar}> Pagar
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={this.Modal}> Cerrar
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default index;
