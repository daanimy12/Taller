import React, {Component} from 'react';
import Helper from '../../'

class index extends Component {

    state = {
        item: this.props.products.products,
        table: this.props.products.table,
        segunda: this.props.products.segunda,
        total: this.props.products.total,
        cuenta: this.props.products.cuenta
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            item: nextProps.products.products,
            table: nextProps.products.table,
            segunda: nextProps.products.segunda,
            total: nextProps.products.total,
            cuenta: nextProps.products.cuenta
        });
    }

    handleClick = () => {
        const data = this.state;
        // console.log(data)
        Helper.delete_product_from_table(data.item.Key, data.table.Mesa, data.segunda, 0, data.item.ID, data.item.Cantidad_User, data.item.Precio_Venta, data.cuenta);
        // console.log(this.props.products)
        this.props.products.modal(data);
    }

    render() {
        let products = this.state.item;

        return (
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                {
                    (typeof products.Image !== 'undefined') ?
                        <div className="item_pay">
                            <div className="box_img_pay col-3">
                                <img className="image_pay" alt="item"
                                     src={products.Image}/>
                            </div>
                            <div className="col-5 detail_product_pay">
                                <div className="name_product_pay">
                                    <h5 className="letter_word">{products.Nombre}</h5>
                                </div>
                                <div className="name_product_pay">
                                    <h5>Cantidad: {products.Cantidad_User}</h5>
                                </div>
                            </div>
                            <div className="col-3 pay_product">
                                <h5 className="text-dark">${products.Precio_Venta * products.Cantidad_User}</h5>
                            </div>
                            {(this.state.total === false) ? <button onClick={this.handleClick} className=" btn btn-danger col-1 pay_product mt-4 mb-4 flex-column justify-content-center align-items-center">
                                <h5>X</h5>
                            </button> : null}
                        </div>
                        :
                        <div className="item_pay">
                            <div className="box_img_pay col-3">
                                <img className="image_pay" alt="item"
                                     src={products.Image}/>
                            </div>
                            <div className="col-5 detail_product_pay">
                                <div className="name_product_pay">
                                    <h5 className="letter_word">{products.Nombre}</h5>
                                </div>
                                <div className="name_product_pay">
                                    <h5>Cantidad: {products.Cantidad_User}</h5>
                                </div>
                            </div>
                            <div className="col-3 pay_product">
                                <h5 className="text-dark">${products.Precio_Venta * products.Cantidad_User}</h5>
                            </div>
                            {(this.state.total === false) ? <button onClick={this.handleClick} className=" btn btn-danger col-1 pay_product mt-4 mb-4 flex-column justify-content-center align-items-center">
                                <h5>X</h5>
                            </button> : null}
                        </div>
                }
            </div>
        );
    }
}

export default index;
