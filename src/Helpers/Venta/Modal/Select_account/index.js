import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Helpers from '../../'
import QrReader from "react-qr-reader";
import Alert from "react-s-alert";

class index extends Component {

    state = {
        Modal: false,
        view: [],
        table: [],
        products: [],
        key: '',
        cantidad: 0,
        cuentas: []
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps)
        this.setState({
            Modal: !this.state.Modal,
            table: nextProps.data.table,
            products: nextProps.data.item2,
            key: nextProps.data.key,
            cantidad: nextProps.data.number
        }, () => this.Generador_mesas());
    }

    Generador_mesas = () => {
        let Vista = [];
        const data = this.state;
        Vista.push(
            <button className="selector_cuenta btn btn-outline-warning col-6 col-sm-4" onClick={this.Primaria}>
                Cuenta Principal. <br/>${data.table.Total}
            </button>
        );
        Vista.push(
            <button className="selector_cuenta btn btn-outline-warning col-6 col-sm-4" onClick={this.Secundaria}>
                Cuenta Secundaria. <br/>${data.table.Cuenta.Total}
            </button>
        )
        if (data.table.Cuentas > 2) {
            for (let i = 0; i < data.table.Cuentas - 2; i++) {
                Vista.push(
                    <button className="selector_cuenta btn btn-outline-warning col-6 col-sm-4"
                            onClick={() => this.Cuenta_general(i + 3)}>
                        Cuenta {i + 3}. <br/>${data.table['Cuenta' + (i + 3)].Total}
                    </button>
                );
            }
        }
        this.setState({
                cuentas: null
            }, () => this.setState({
                cuentas: Vista
            })
        )
    }

    Modal = () => {
        this.setState({Modal: !this.state.Modal});
    }

    Primaria = () => {
        const data = this.state;
        Helpers.registrar_Producto(data.key, data.products, data.table, data.cantidad).then(e => {
            this.tooltip('Producto Agregado', true);
        });
        this.Modal();
    }

    Secundaria = () => {
        const data = this.state;
        //console.log(data)
        Helpers.Registrar_Segundo(data.key, data.products, data.table, data.cantidad).then(e => {
            this.tooltip('Producto Agregado', true);
        });
        this.Modal();
    }

    Cuenta_general = (mesa) => {
        const data = this.state;
        Helpers.Registrar_Cualquiera(data.key, data.products, data.table, data.cantidad, mesa).then(e => {
            this.tooltip('Producto Agregado', true);
        });;
        this.Modal();
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

        return (
            <div>
                <Alert stack={{limit: 3}}/>
                <Modal
                    className="modal-xl modal-dialog modal-dialog-scrollable"
                    isOpen={this.state.Modal}
                    toggle={this.Modal}
                >
                    <ModalHeader>
                        Seleccione Cuenta
                    </ModalHeader>
                    <ModalBody className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-5"
                               id="row2">
                        <div className="box_selector">
                            {this.state.cuentas}
                        </div>
                    </ModalBody>
                    <ModalFooter>
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
