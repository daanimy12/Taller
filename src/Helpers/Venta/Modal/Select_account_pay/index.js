import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Modal_Pay from "../Pay";
import Helper from '../../'

class index extends Component {

    state = {
        Modal: false,
        view: [],
        table: this.props.Modal.table,
        products: this.props.Modal.products,
        key: '',
        cantidad: 0,
        VistaM: false,
        botones: <div/>
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        this.setState({
            Modal: !this.state.Modal,
            table: nextProps.Modal.table,
            products: nextProps.Modal.products,
            // key: nextProps.data.key,
            // cantidad: nextProps.data.number
        }, () => {
            this.botones();
        });
    }

    componentDidMount() {
        this.setState({Modal: true})
        this.botones();
    }

    botones = () => {
        const data = this.state;
        // console.log(data)
        let Vista = [];
        Helper.number_account_by_table(data.table.Mesa).then(e => {
            // console.log(e.val())
            let Total = 0;
            let productos = 0;
            const t = e.val();
            if (t.Segunda_Cuenta === true) {
                Total = t.Total;
                //console.log(t)
                productos = productos + ((t.Productos !== undefined) ? Object.keys(t.Productos).length : 0);
                Vista.push(
                    <button className=" col-6 col-sm-4 selector_cuenta btn btn-outline-warning"
                            onClick={this.Primaria}>
                        Cuenta Principal. <br/> Total = {t.Total} <br/>
                        {(t.Productos !== undefined) ? Object.keys(t.Productos).length : 0} Productos
                    </button>
                )
                Total = Total + (+t.Cuenta.Total);
                productos = productos + ((t.Cuenta.Productos !== undefined) ? Object.keys(t.Cuenta.Productos).length : 0);
                Vista.push(
                    <button className=" col-6 col-sm-4 selector_cuenta btn btn-outline-warning"
                            onClick={this.Secundaria}>
                        Cuenta Secundaria. <br/> Total = {t.Cuenta.Total} <br/>
                        {(t.Cuenta.Productos !== undefined) ? Object.keys(t.Cuenta.Productos).length : 0} Productos
                    </button>
                )
                if (t.Cuentas > 2) {
                    for (let i = 2; i < t.Cuentas; i++) {
                        productos = productos + ((t['Cuenta' + (i + 1)].Productos !== undefined) ? Object.keys(t['Cuenta' + (i + 1)].Productos).length : 0);
                        Total = Total + (+t['Cuenta' + (i + 1)].Total)
                        Vista.push(
                            <button className=" col-6 col-sm-4 selector_cuenta btn btn-outline-warning"
                                    onClick={() => this.Extra(i + 1)}
                            >
                                Cuenta {i + 1}. <br/> Total = {t['Cuenta' + (i + 1)].Total} <br/>
                                {(t['Cuenta' + (i + 1)].Productos !== undefined) ? Object.keys(t['Cuenta' + (i + 1)].Productos).length : 0} Productos
                            </button>
                        )
                    }
                }
                Vista.push(
                    <button className=" col-6 col-sm-4 selector_cuenta btn btn-outline-warning "
                            onClick={this.Total}
                        //Falta
                    >
                        Todas. <br/> Total = {Total} <br/>
                        {productos} Productos
                    </button>
                )
            }
            this.setState({botones: Vista})
        })
    }

    Modal = () => {
        this.setState({Modal: !this.state.Modal});
    }

    Primaria = () => {
        const data = this.state;
        if (data.table.Total === 0) {
            alert('La cuenta esta en 0')
        } else {
           //console.log(data)
            this.setState({
                VistaM: true,
                Vista: <Modal_Pay
                    Modal={{
                        table: data.table,
                        products: data.products,
                        segunda: false,
                        cuenta: 1,
                        extra: false
                    }}/>,
                Modal: false
            })
        }
    }

    Secundaria = () => {
        // console.log('seg')
        const data = this.state;
        // console.log(data)
        this.setState({
            VistaM: true,
            Vista: <Modal_Pay
                Modal={{
                    table: data.table,
                    products: data.products,
                    //products: data.table.Cuenta,
                    segunda: true,
                    cuenta: 2,
                    total: false,
                    extra: false
                }}/>,
            Modal: false
        })
    }

    Extra = (number) => {
        // console.log(number)
        const data = this.state;
        this.setState({
            VistaM: true,
            Vista: <Modal_Pay
                Modal={{
                    table: data.table,
                    products: data.products,
                    segunda: true,
                    extra: true,
                    cuenta: number,
                    total: false
                }}/>,
            Modal: false
        })
    }

    Total = () => {
        // console.log('j')
        const data = this.state;
        this.setState({
            VistaM: true,
            Vista: <Modal_Pay
                Modal={{
                    table: data.table,
                    products: data.products,
                    segunda: true,
                    extra: true,
                    cuenta: 0,
                    total: true
                }}/>,
            Modal: false
        })
    }

    render() {

        let Prev = this.state.VistaM === true ? this.state.Vista : <div/>

        return (
            <div>
                {Prev}
                <Modal className="modal-xl modal-dialog modal-dialog-scrollable"
                       toggle={this.Modal}
                       isOpen={this.state.Modal}>
                    <ModalHeader>
                        Abonar a cuenta
                    </ModalHeader>
                    <ModalBody className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-5"
                               id="row2">
                        <div className="box_selector">
                            {this.state.botones}
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
