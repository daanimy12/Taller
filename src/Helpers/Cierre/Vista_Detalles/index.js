import React, {Component} from 'react'
import Helper from '../'

class index extends Component {

    componentDidMount() {
        const data = this.props.location.state;
        this.setState({...data}, () => this.cantidad())
        // console.log(data)
    }

    cantidad = () => {
        const data = {...this.state.ventas}
        let cantidad = 0;
        Object.values(data).map(e => {
            if (e.Cambio === undefined) {
                Object.keys(e).map(i => {
                    Object.keys(e[i].Productos).map(o => {
                        cantidad = cantidad + e[i].Productos[o].Cantidad
                    })
                })
            } else {
                Object.keys(e.Productos).map(o => {
                    cantidad = cantidad + e.Productos[o].Cantidad
                })
            }
        })
        this.setState({cantidad: cantidad}, () => this.tomados())
    }

    tomados = () => {
        const data = {...this.state.ventas}
        let cantidad = 0;
        let total = 0;
        Object.values(data).map(e => {
            if (e.Cambio === undefined) {
                Object.keys(e).map(i => {
                    if (e[i].Mesa == 99) {
                        //console.log('entro')
                        Object.keys(e[i].Productos).map(o => {
                            cantidad = cantidad + e[i].Productos[o].Cantidad;
                            total = total + (+e[i].Productos[o].Cantidad * (+e[i].Productos[o].Precio))
                        })
                    }
                })
            } else {
                if (e.Mesa === 99) {
                    Object.keys(e.Productos).map(o => {
                        cantidad = cantidad + e.Productos[o].Cantidad
                    })
                }
            }
        })
        this.setState({tomado: cantidad, total_tomado: total}, () => this.hora())
    }

    hora = () => {
        const data = {...this.state.ventas}
        let horas = [];
        let {primero, ultima, cantidad} = 0;
        Object.values(data).map(e => {
            if (e.Cambio === undefined) {
                Object.keys(e).map(function (i, index) {
                    if (primero === undefined) primero = e[i].Hora.split(':');
                    ultima = e[i].Hora.split(':');
                    let array_hora = e[i].Hora.split(':');
                    horas.push(array_hora);
                })
            } else {
                if (primero === undefined) primero = e.Hora.split(':');
                ultima = e.Hora.split(':');
                let array_hora = e.Hora.split(':');
                horas.push(array_hora);
            }
        })
        horas = horas.sort();
        let hora = {};
        horas.forEach(e => {
            if (hora[e] !== undefined) {
                hora[e] = hora[e] + 1;
            } else {
                hora[e] = 1;
            }
        })
        // console.log(horas)
        this.setState({
            primera: primero[0] + ':' + primero[1] + ':' + primero[2],
            ultima: ultima[0] + ':' + ultima[1] + ':' + ultima[2]
        })
    }

    cierre = () => {
        const data = this.state;
        if (window.confirm('Esta seguro que quiere cerrar la caja?')) Helper.cierre(data.nombre, data.total, data.cantidad);
    }

    state = {
        cantidad: 0,
        tomado: 0,
        primera: 0,
        ultima: 0,
        total_tomado: 0

    };

    render() {

        let data = this.state;

        return (
            <div className="ups row col-12 col-md-12 col-lg-12 col-xl-12">
                <div className="row box_row_details col-12 col-md-12 col-lg-12 col-xl-12">

                    <div className="col-10 col-sm-3 col-md-3 col-lg-3 col-xl-3 elevacion box_details_sell_heigth">
                        <div className="box_item_details_sell">
                            <h5>Cantidad de Productos vendidos</h5>
                        </div>
                        <h1 className="total">{data.cantidad}</h1>
                    </div>

                    <div className="col-10 col-sm-3 col-md-3 col-lg-3 col-xl-3 elevacion box_details_sell_heigth">
                        <div className="box_item_details_sell">
                            <h5>Cantidad de productos tomados</h5>
                        </div>
                        <h1 className="total">{data.tomado}</h1>
                    </div>

                    <div className="col-10 col-sm-3 col-md-3 col-lg-3 col-xl-3 elevacion box_details_sell_heigth">
                        <div className="box_item_details_sell">
                            <h5>Cantidad de efectivo</h5>
                        </div>
                        <h1 className="total">${data.total}</h1>
                    </div>

                    <div className="col-10 col-sm-3 col-md-3 col-lg-3 col-xl-3 elevacion box_details_sell_heigth">
                        <div className="box_item_details_sell">
                            <h5>Cantidad de productos tomados</h5>
                        </div>
                        <h1 className="total">${data.total_tomado}</h1>
                    </div>

                </div>

                <div className="row box_row_details col-12 col-md-12 col-lg-12 col-xl-12">

                    <div className="col-10 col-sm-3 col-md-3 col-lg-3 col-xl-3 elevacion box_details_sell_heigth">
                        <div className="box_item_details_sell">
                            <h5>Hora Primera Venta</h5>
                        </div>
                        <h1 className="total">{data.primera}</h1>
                    </div>

                    <div className="col-10 col-sm-3 col-md-3 col-lg-3 col-xl-3 elevacion box_details_sell_heigth">
                        <div className="box_item_details_sell">
                            <h5>Hora Última Venta</h5>
                        </div>
                        <h1 className="total">{data.ultima}</h1>
                    </div>

                </div>

                <div className="buttom_mar">
                    <button onClick={() => this.cierre()} className="btn btn-success btn_details_sell">Cerrar Caja
                    </button>
                </div>

            </div>
        );
    }
}

export default index;
