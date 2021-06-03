import React, {Component} from 'react';
import Helper from '../../'
import Selector from '../Select_account'
import Alert from "react-s-alert";

let productos = [];

class index extends Component {

    state = {};

    componentWillMount() {
        this.setState({
            item: this.props.data.products,
            number: 1,
            table: this.props.data.table,
            key: this.props.data.key,
            ofertas: this.props.data.ofertas,
            selector_vista: <Selector data={this.state}/>,
            selector: true,
            item2: []
        }, () => this.actualizar())
    }

    actualizar = () => {
        // this.setState({
        //     item: this.props.data.products,
        //     number: 0,
        //     table: this.props.data.table,
        //     key: this.props.data.key,
        //     ofertas: this.props.data.ofertas,
        // }, this.check_descuentos());
        this.check_descuentos()
    }

    componentDidUpdate(props, state) {
        // console.log(props);
        if (props.data.products !== state.item || props.data.table !== state.table || props.data.key !== state.key || props.data.ofertas !== state.ofertas) {
            if (props.data.ofertas !== state.ofertas) {
                this.tooltip('Nuevas Ofertas, Recarga la página', false)
            }
            // console.log(props)
            this.setState({
                item: props.data.products,
                table: props.data.table,
                key: props.data.key,
                ofertas: this.props.data.ofertas,
            }, () => this.check_descuentos());
        }
    }

    check_descuentos() {
        const data_state = JSON.parse(JSON.stringify(this.state));
        let descuento_producto = Object.keys(data_state.ofertas).map(i => {
            return data_state.ofertas[i]
        }).filter(e => e.Modo === data_state.key || e.Modo === data_state.item.Categoria);

        if (descuento_producto.length > 0) descuento_producto = (descuento_producto.filter(e => e.BooleanCa === false) === []) ? descuento_producto : descuento_producto.filter(e => e.BooleanCa !== false);

        let Importe = 0;
        if (descuento_producto.length > 0) Importe = parseInt(descuento_producto[0].Importe);

        data_state.item.Precio_Original = data_state.item.Precio_Venta;

        data_state.item.Precio_Venta = (descuento_producto.length > 0) ? (descuento_producto[0].Tipo !== 'Total') ? Math.round((+data_state.item.Precio_Venta) - (+data_state.item.Precio_Venta * Importe / 100)) : descuento_producto[0].Importe : data_state.item.Precio_Venta;
        this.setState({item2: data_state.item})
    }

    sumar = () => {
        const data = {...this.state};
        if ((+data.number) < (+data.item2.Cantidad)) {
            this.setState({number: +data.number + 1})
        } else {
            alert('Sin Producto');
        }
    }

    restar = () => {
        // console.log('entro');
        let number = this.state.number;
        this.setState({number: (+number - 1 > 0) ? +number - 1 : 0})
    }

    edit = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    registrar_producto = () => {
        const data = this.state;
        //console.log(data)
        if (data.number > 0) {
            if (data.table.Segunda_Cuenta === true) {
                this.setState({selector_vista: <Selector data={data}/>, selector: true})
            } else {
                Helper.registrar_Producto(data.key, data.item2, data.table, data.number);
                this.tooltip('Producto Agregado', true)
            }
        } else {
            alert('No se puede agregar 0 piezas');
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

    render() {
        let item = this.state.item2;
        let selector = (this.state.selector === true) ? this.state.selector_vista : <div/>
        return (
            <div className="col-9 col-sm-6 col-md-5 col-lg-3 col-xl-3">
                {selector}
                <div>
                    <Alert stack={{limit: 3}}/>
                    {
                        (typeof item.Image !== 'undefined') ?
                            <div className="item_border">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="item_inp">
                                            <h5 className="name_product">{item.Nombre}</h5>
                                            <div className="item">
                                                <img className="item_img" alt="item"
                                                     src={item.Image}/>
                                            </div>
                                            <h5 className="price_product">${item.Precio_Venta}</h5>
                                            <h5 className="price_product">Restantes: {item.Cantidad}</h5>
                                        </div>
                                    </div>
                                    <div className="flip-card-back">
                                        <div className="item_inp">
                                            <h3>Cantidad</h3>
                                            <div className="item_back">
                                                <img className="item_img_back" alt="item"
                                                     src={item.Image}/>
                                            </div>
                                            <div className="justify-content-center align-items-center row">
                                                <button onClick={this.restar} className="btn col-2 btn-dark">-</button>
                                                <input id="number" className="col-5 text-dark text-center border-bottom"
                                                       value={this.state.number} onChange={this.edit}/>
                                                <button onClick={this.sumar} className="btn col-2 btn-dark">+</button>
                                            </div>
                                            <br/>
                                            <h4>Total: {+this.state.number * this.state.item.Precio_Venta}</h4>
                                            <button className="btn col-6 btn-success"
                                                    onClick={this.registrar_producto}>Agregar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="item_border">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="item_inp">
                                            <h5 className="name_product">{item.Nombre}</h5>
                                            <div className="item">
                                                <img alt="item"
                                                     src="https://cdn1.iconfinder.com/data/icons/e-commerce-set-2-1/256/Box-128.png"/>
                                            </div>
                                            <h5 className="price_product">${item.Precio_Venta}</h5>
                                            <h5 className="price_product">Restantes: {item.Cantidad}</h5>
                                        </div>
                                    </div>
                                    <div className="flip-card-back">
                                        <div className="item_inp">
                                            <h3>Cantidad</h3>
                                            <div className="item_back">
                                                <img alt="item"
                                                     src="https://cdn1.iconfinder.com/data/icons/e-commerce-set-2-1/256/Box-128.png"/>
                                            </div>
                                            <div className="justify-content-center align-items-center flex-fill row">
                                                <button onClick={this.restar} className="btn col-2 btn-dark">-</button>
                                                <input id="number" className="col-5 text-dark text-center border-bottom"
                                                       value={this.state.number} onChange={this.edit}/>
                                                <button onClick={this.sumar} className="btn col-2 btn-dark">+</button>
                                            </div>
                                            <br/>
                                            <h4>Total: {+this.state.number * this.state.item.Precio_Venta}</h4>
                                            <button className="btn col-6 btn-success"
                                                    onClick={this.registrar_producto}>Agregar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    }
                </div>
            </div>
        );
    }
}

export default index;
