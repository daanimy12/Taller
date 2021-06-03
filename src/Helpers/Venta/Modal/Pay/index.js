import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Detail_Pay from '../Item_Pay'
import Collect_Money from '../collect_money';

class index extends Component {

    state = {
        Modal: true,
        view: [],
        table: [],
        products: [],
        collect_money: false,
        collect_money2: [],
        segunda: false,
        extra: false,
        cuenta: 0,
        total: false,
        amount: 0
    }

    componentWillMount() {
        this.setState({
            table: this.props.Modal.table,
            products: this.props.Modal.products,
            segunda: this.props.Modal.segunda,
            cuenta: this.props.Modal.cuenta,
            Modal: !this.state.Modal,
            extra: this.props.Modal.extra,
            collect_money2: <Collect_Money
                checkout={{
                    table: this.props.Modal.table,
                    vista: this.state.Modal
                }}/>
        }, () => this.Productos());
    }

    componentWillReceiveProps(nextProps) {
        //  console.log(nextProps)
        this.setState({
            Modal: !this.state.Modal,
            table: nextProps.Modal.table,
            products: nextProps.Modal.products,
            segunda: nextProps.Modal.segunda,
            extra: nextProps.Modal.extra,
            cuenta: nextProps.Modal.cuenta,
            total: nextProps.Modal.total
        }, () => this.Productos());
    }

    Modal = (array = []) => {
        this.setState({Modal: !this.state.Modal});
        this.props.Modal.By = false;
    }

    Pagar = () => {
        const data = this.state;
        let tmp = 0;
        // console.log('oiui')
        if (data.segunda == true) {
            // console.log('entro')
            if (data.total) {
                if (data.table.Productos !== undefined) {
                    Object.keys(data.table.Productos).map(e => {
                        if (data.table.Productos[e].Precio == data.table.Productos[e].Precio_Original) {
                            tmp = tmp + (+data.table.Productos[e].GananciaFinal);
                        }
                    })
                }
                if (data.table.Cuenta.Productos !== undefined) {
                    Object.keys(data.table.Cuenta.Productos).map(e => {
                        if (data.table.Cuenta.Productos[e].Precio == data.table.Cuenta.Productos[e].Precio_Original) {
                            tmp = tmp + (+data.table.Cuenta.Productos[e].GananciaFinal);
                        }
                    })
                }
                for (let i = 3; i < data.table.Cuentas; i++) {
                    if (data.table['Cuenta' + i].Productos !== undefined){
                        Object.keys(data.table['Cuenta' + i].Productos).map(e => {
                            if (data.table['Cuenta' + i].Productos[e].Precio == data.table['Cuenta' + i].Productos[e].Precio_Original) {
                                tmp = tmp + (+data.table['Cuenta' + i].Productos[e].GananciaFinal);
                            }
                        })
                    }
                }
                this.setState({
                    Modal: !this.state.Modal,
                    load: false,
                    collect_money2: <Collect_Money
                        checkout={{
                            table: this.props.Modal.table,
                            segunda: true,
                            cuenta: data.cuenta,
                            total: true,
                            ganancia: tmp,
                        }}/>
                });
            } else if (data.cuenta > 2) {
                Object.keys(data.table['Cuenta' + data.cuenta].Productos).map(e => {
                    if (data.table['Cuenta' + data.cuenta].Productos[e].Precio == data.table['Cuenta' + data.cuenta].Productos[e].Precio_Original) {
                        tmp = tmp + (+data.table['Cuenta' + data.cuenta].Productos[e].GananciaFinal);
                    }
                })
                this.setState({
                    Modal: !this.state.Modal,
                    load: false,
                    collect_money2: <Collect_Money
                        checkout={{
                            table: this.props.Modal.table,
                            segunda: true,
                            cuenta: data.cuenta,
                            ganancia: tmp,
                            total: false
                        }}/>
                });
            } else {
                // console.log('segun')
                Object.keys(data.table.Cuenta.Productos).map(e => {
                    if (data.table.Cuenta.Productos[e].Precio == data.table.Cuenta.Productos[e].Precio_Original) {
                        tmp = tmp + (+data.table.Cuenta.Productos[e].GananciaFinal);
                    }
                })
                this.setState({
                    Modal: !this.state.Modal,
                    load: false,
                    collect_money2: <Collect_Money
                        checkout={{
                            table: this.props.Modal.table,
                            segunda: true,
                            cuenta: 2,
                            total: false,
                            ganancia: tmp,
                        }}/>
                });
            }
        } else {
            Object.keys(data.table.Productos).map(e => {
                if (data.table.Productos[e].Precio == data.table.Productos[e].Precio_Original) {
                    tmp = tmp + (+data.table.Productos[e].GananciaFinal);
                }
            })
            this.setState({
                Modal: !this.state.Modal,
                load: false,
                collect_money2: <Collect_Money
                    checkout={{
                        table: this.props.Modal.table,
                        segunda: false,
                        cuenta: 1,
                        ganancia: tmp,
                    }}/>
            });
        }
    }

    Productos = () => {
        const data = this.state;
        // console.log(data)
        let Vista = [];
        let total = 0;
        if (data.total === true) {

            if (typeof data.table.Productos !== 'undefined') {
                Object.keys(data.table.Productos).map(e => {
                    const product_user = data.table.Productos[e];
                    let product = data.products[product_user.Producto_ID];
                    product.Cantidad_User = product_user.Cantidad;
                    product.ID = product_user.Producto_ID;
                    product.Key = e;
                    product.Precio_Venta = product_user.Precio;
                    // console.log(product.Precio_Venta)
                    total = total + (+product_user.Precio * product_user.Cantidad)
                    Vista.push(<Detail_Pay
                        products={{
                            products: product,
                            table: data.table,
                            segunda: true,
                            modal: this.Modal,
                            total: true,
                            cuenta: 1
                        }}/>)
                });
            }

            if (typeof (data.table.Cuenta.Productos) !== 'undefined') {
                Object.keys(data.table.Cuenta.Productos).map(e => {
                    let product_user = data.table.Cuenta.Productos[e];
                    let product = data.products[product_user.Producto_ID];
                    product.Cantidad_User = product_user.Cantidad;
                    product.ID = product_user.Producto_ID;
                    product.Key = e;
                    product.Precio_Venta = product_user.Precio;
                    total = total + (+product_user.Precio * product_user.Cantidad)
                    Vista.push(<Detail_Pay
                        products={{
                            products: product,
                            table: data.table,
                            segunda: true,
                            modal: this.Modal,
                            total: true,
                            cuenta: 2
                        }}/>)
                });
            }

            if (data.table.Cuentas > 2) {
                for (let i = 2; i < data.table.Cuentas; i++) {
                    if (typeof (data.table['Cuenta' + (i + 1)].Productos) !== 'undefined') {
                        Object.keys(data.table['Cuenta' + (i + 1)].Productos).map(e => {
                            let product_user = data.table['Cuenta' + (i + 1)].Productos[e];
                            let product = data.products[product_user.Producto_ID];
                            product.Cantidad_User = product_user.Cantidad;
                            product.ID = product_user.Producto_ID;
                            product.Key = e;
                            product.Precio_Venta = product_user.Precio;
                            total = total + (+product_user.Precio * product_user.Cantidad)
                            Vista.push(<Detail_Pay
                                products={{
                                    products: product,
                                    table: data.table,
                                    segunda: true,
                                    modal: this.Modal,
                                    total: true,
                                    cuenta: (i + 1)
                                }}/>)
                        });
                    }
                }
            }

            this.setState({view: null}, () => {
                this.setState({view: Vista, amount: total});
            })

        } else if (data.segunda === true) {
            if (data.cuenta > 2) {
                // console.log(data.table['Cuenta' + data.cuenta])
                if (typeof (data.table['Cuenta' + data.cuenta].Productos) !== 'undefined') {
                    Object.keys(data.table['Cuenta' + data.cuenta].Productos).map(e => {
                        let product_user = data.table['Cuenta' + data.cuenta].Productos[e];
                        let product = data.products[product_user.Producto_ID];
                        // console.log(product)
                        product.Cantidad_User = product_user.Cantidad;
                        product.ID = product_user.Producto_ID;
                        product.Key = e;
                        product.Precio_Venta = product_user.Precio;
                        Vista.push(<Detail_Pay
                            products={{
                                products: product,
                                table: data.table,
                                segunda: true,
                                modal: this.Modal,
                                total: false,
                                cuenta: data.cuenta
                            }}/>)
                    });
                    this.setState({view: Vista})
                }
                this.setState({view: Vista})
            } else {
                // console.log('jaja')
                if (typeof data.table.Cuenta.Productos !== 'undefined') {
                    // console.log('entro a la segunda')
                    Object.keys(data.table.Cuenta.Productos).map(e => {
                        let product_user = data.table.Cuenta.Productos[e];
                        // console.log(data)
                        let product = data.products[product_user.Producto_ID];
                        // console.log(data.products[product_user.Producto_ID])
                        product.Cantidad_User = product_user.Cantidad;
                        product.ID = product_user.Producto_ID;
                        product.Key = e;
                        product.Precio_Venta = product_user.Precio;
                        Vista.push(<Detail_Pay
                            products={{
                                products: product,
                                table: data.table,
                                segunda: true,
                                modal: this.Modal,
                                total: false,
                                cuenta: 2
                            }}/>)
                    });
                }
                this.setState({view: Vista})
            }
        } else {
            // console.log('entro a la primera')
            if (typeof data.table.Productos !== 'undefined') {
                Object.keys(data.table.Productos).map(e => {
                    const product_user = data.table.Productos[e];
                    let product = data.products[product_user.Producto_ID];
                    product.Cantidad_User = product_user.Cantidad;
                    product.ID = product_user.Producto_ID;
                    product.Key = e;
                    product.Precio_Venta = product_user.Precio;
                    Vista.push(<Detail_Pay
                        products={{
                            products: product,
                            table: data.table,
                            segunda: false,
                            modal: this.Modal,
                            total: false,
                            cuenta: 1
                        }}/>)
                });
                this.setState({view: Vista})
            }
        }
    }

    render() {

        let vista = this.state.view;

        let total = (this.state.total) ? this.state.amount : (this.state.table.Segunda_Cuenta === true) ? (this.state.cuenta > 2) ? this.state.table['Cuenta' + this.state.cuenta].Total : (this.state.cuenta === 2) ? this.state.table.Cuenta.Total : this.state.table.Total : this.state.table.Total;

        let Collect = this.state.collect_money2;

        return (
            <div>
                {Collect}
                <Modal className="modal-lg modal-dialog modal-dialog-scrollable"
                       isOpen={this.state.Modal}
                       toggle={this.Modal}
                >
                    < ModalHeader>
                        Pagar Cuenta
                    </ModalHeader>
                    <ModalBody className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 "
                               id="row2">
                        <div className="pay_modal_box col-12">
                            <h5>Resumen:</h5>
                            <div className="detail_pay_modal">
                                {vista}
                            </div>
                            <div className="amount_pay col-lg-12 col-xl-12 col-md-12 col-sm-12 col-12">
                                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                    <h5>Total:</h5>
                                </div>
                                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                    <h5>{total}</h5>
                                </div>
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

index.defaultProps = {
    total: false
};

export default index;
