import React, {Component} from 'react';
import Modal_View from '../Helpers/Venta/Modal';
import Modal_Pay from '../Helpers/Venta/Modal/Pay';
import Products from '../Helpers/Venta/icons/products.png';
import Pay from '../Helpers/Venta/icons/pay_icon.png';
<<<<<<< HEAD
import '../css/Ventas.css';
=======
import '../system/styles/Ventas.css';
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee
import Selector from '../Helpers/Venta/Modal/Select_account_pay'

class index extends Component {

    state = {
        i: 0,
        products: [],
        Modal: false,
        Modal_pagar: false,
        ofertas: this.props.table.ofertas,
        selector: <Selector/>
    }

    componentWillMount() {
        this.setState({
            ofertas: this.props.table.ofertas,
            i: this.props.table.mesas,
            products: this.props.table.products,
            Modal2: <Modal_View
                Modal={{
                    vista: this.state.Modal,
                    products: this.props.table.products,
                    ofertas: this.props.table.ofertas
                }}/>,
            Modal_pagar2: <Modal_Pay
                Modal={{
                    table: this.state.i,
                    products: this.props.table.products
                }}/>
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            i: nextProps.table.mesas,
            products: nextProps.table.products,
            ofertas: nextProps.table.ofertas
        });
    }

    // componentDidUpdate(props, state) {
    //     if (props.table.mesas !== state.i || props.table.products !== state.products || props.table.ofertas !== state.ofertas) {
    //         this.setState({
    //             i: props.table.mesas,
    //             products: props.table.products,
    //             ofertas: props.table.ofertas
    //         });
    //     }
    // }

    Modal = () => {
        this.setState({
            Modal: !this.state.Modal, load: false, Modal2: <Modal_View
                Modal={{
                    table: this.state.i,
                    vista: !this.state.Modal,
                    products: this.state.products,
                    ofertas: this.state.ofertas
                }}/>
        })
    }

    Modal_pagar = () => {
        const data = this.state;
        // console.log(data.i)
        if (data.i.Productos === undefined && data.i.Cuenta.Productos === undefined && data.i.Cuentas === 1) {
            alert('La cuenta esta en ceros');
        } else {
            if (data.i.Segunda_Cuenta === true) {
                // console.log(this.state)
                this.setState({
                    Modal_pagar2: <Selector
                        Modal={{
                            table: data.i,
                            products: this.state.products
                        }}/>
                })
            } else {
                this.setState({
                    Modal_pagar: !this.state.Modal_pagar, load_pagar: false, Modal_pagar2: <Modal_Pay
                        Modal={{
                            table: data.i,
                            products: this.state.products
                        }}/>
                })
            }
        }
    }

    render() {
        let Modal_V = this.state.Modal2;
        let Modal_Pay = this.state.Modal_pagar2;
        let i = this.state.i;
        let clase = this.state.i.Mesa === 1 || this.state.i.Mesa === 2 || this.state.i.Mesa === 5 || this.state.i.Mesa === 6 ? "col-6 start view_small" : "col-6 end view_small";
        return (
            <div id="row" className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 table_sell row justify_conten fondo ">
                {Modal_V}
                {Modal_Pay}
                <div className="row justify_conten box_out m-0">
                    <div className="space">
                        <h4 className="text-white mesaname">Mesa {i.Mesa}</h4>
                        <h1 className="text-white price">${i.Total}{(i.Segunda_Cuenta === true) ? (i.Cuentas > 2) ? ' + ' + (+i.Cuentas - 1) + 'C' : ' + ' + i.Cuenta.Total : ''}</h1>
                        <div className="row justify-content-center">
                            <div className="pr-4 clic" onClick={this.Modal}>
                                <img src={Products} alt="products" className="products_size"/>
                            </div>
                            <div className="pl-4 clic" onClick={this.Modal_pagar}>
                                <img src={Pay} alt="products" className="products_size"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default index;
