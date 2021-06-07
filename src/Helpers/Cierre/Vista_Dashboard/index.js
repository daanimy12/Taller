import React, {Component} from 'react';
import Helpers from '../../Cierre'
import User_Item from '../../Cierre/User'
import '../../../system/styles/Cerrar.css'
import Preload from '../../../Componentes/Preload'
import Delete from '../Images/delete.png'
import {createBrowserHistory as createHistory} from 'history';

const history = new createHistory();

class index extends Component {

    state = {
        preload: true,
        ups: true,
        usuarios: [],
        ventas: [],
        vista: <User_Item data={{'Pa': 'Pa', 'ventas': []}}/>
    }

    componentWillMount() {
        let usuarios = [];
        Helpers.Usuarios().then(DataSnapshot => {
            const data = DataSnapshot.val();
            if (data !== null) {
                let data_temp = [];
                Object.keys(data).map(e => data[e].Pass = null);
                Object.keys(data).map(e => {
                    // console.log(data[e].Usuario_ID)
                    if (usuarios.filter(i => i === data[e].Usuario_ID).length === 0) {
                        usuarios.push(data[e].Usuario_ID)
                    }
                });
                this.setState({usuarios: usuarios, ventas: data}, () => this.load_items())
            } else {
                this.setState({ups: true, preload: false})
            }
        })
    }

    componentDidMount() {

    }

    load_items = () => {
        const data = this.state;
        let vista = [];
        if (data.usuarios.length > 1) {
            data.usuarios.map(e => {
                //console.log(e)
                let datos = {};
                let total = 0;
                Object.keys(data.ventas).map(i => {
                    if (data.ventas[i].Usuario_ID === e) {
                        datos[i] = data.ventas[i];
                        total = total + (+data.ventas[i].Total);
                    }
                })
                let temp = {}
                temp['ventas'] = {...datos};
                temp['usuario'] = e;
                temp['total'] = total;
                vista.push(<User_Item data={temp}/>)
            })
        } else {
            let total = 0;
            let datos = Object.keys(data.ventas).map(i => {
                if (data.ventas[i].Usuario_ID === data.usuarios[0]) {
                    let d = [];
                    d[i] = data.ventas[i];
                    total = total + (+data.ventas[i].Total);
                    return d;
                }
            })
            vista = <User_Item data={{'usuario': data.usuarios[0], 'ventas': {...datos}, 'total': total}}/>
        }
        this.setState({vista: vista, preload: false, ups: false})
    }

    go_to_ventas = () => {
        // history.replace('Cierre_de_Caja/Dashboard')
        history.goBack()
        history.// history.push('Index/Venta_Directa');
        window.location.reload();
    }

    render() {

        let data = this.state.vista;

        let vista = (this.state.preload !== true) ?
            (this.state.ups === true) ?
                <div className="ups">
                    <div className="elevacion emply_data">
                        <div className="box_alert">
                            <img className="img_delete" src={Delete} alt="icon"/>
                            <h4 className="title_opps">Ooops.</h4>
                            <h5 className="description_opps">No se encontro ninguna venta registrada del día de hoy,
                                realice una venta al menos para poder generar un cierre de caja</h5>
                        </div>
                        <div className="box_buttom">
                            <button className="btn btn-danger btn_color_opss"><a href={'/Customers/Venta_Directa'}><h5
                                className="text_buttom">Ir a
                                Ventas</h5></a></button>
                        </div>
                    </div>
                </div>
                :
                <>
                    <div id="row" className="col-12 col-md-12 col-lg-12 col-xl-12 cerrar_fondo"
                         style={{width: '100%', height: '15%'}}>
                        <h3>Cerrar Caja</h3>
                    </div>

                    <div id="row" className="col-12 col-md-12 col-lg-12 col-xl-12 row cerrar_fondo"
                         style={{width: '100%', height: '85%'}}>
                        {data}
                    </div>
                </>
            :
            <Preload/>;

        return (
            <div id="row" className="col-12 col-md-12 col-lg-12 col-xl-12" style={{height: '100%'}}>

                {vista}

            </div>
        );
    }
}

export default index;
