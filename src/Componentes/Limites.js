import React, {Component} from 'react';
import Preload from './Preload'
<<<<<<< HEAD
import '../css/Limites.css';
=======
import '../system/styles/Limites.css';
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee
import Helpers from '../Helpers/Configuracion';
import Fecha from '../Helpers/Configuracion/Fecha'

class Venta extends Component {

    state = {
        nivel_1_cantidad: 0,
        nivel_2_cantidad: 0,
        nivel_3_cantidad: 0,
        nivel_1_procentaje: 0,
        nivel_2_procentaje: 0,
        nivel_3_procentaje: 0,
        fechas: [],
        mesas_cantidad: 0
    }

    componentDidMount() {
        Helpers.get_cantidad().then(e => {
            const data = e.val();
            // console.log(data)
            this.setState({
                nivel_1_cantidad: data.Nivel1.Cantidad,
                nivel_2_cantidad: data.Nivel2.Cantidad,
                nivel_3_cantidad: data.Nivel3.Cantidad,
                nivel_1_procentaje: data.Nivel1.Procentaje,
                nivel_2_procentaje: data.Nivel2.Procentaje,
                nivel_3_procentaje: data.Nivel3.Procentaje
            })
        })
        Helpers.Cantidad_Mesas().then(e => {
            const data = e.val();
            this.setState({mesas_cantidad: data})
        })
        Helpers.cumple().then(e => {
            let fecha = Fecha.Get_Fecha().toString().split('-');
            const i = e.val();
            let temp = [];
            Object.keys(i).map(b => {
                let array = i[b].Fecha.split('-');
                if (array[1] === fecha[1] && array[2] === fecha[2]) {
                    i[b].key = b;
                    temp.push(<h4>{i[b].Nombre + ' ' + i[b].ApellidoMa + ' ' + i[b].ApellidoPa}</h4>);
                }
            })
            this.setState({fechas: temp});
        })
        document.title = `Configuración`;
    }

    update_state = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        // this.setState({[name]: value}, () => (name === 'search') ? this.search_product() : null);
        this.setState({[name]: value}, () => {
            // if (name === 'search') {
            //     this.search_product();
            // }
        });
    }

    submit = (int) => {
        const data = this.state;
        Helpers.cantidad(data['nivel_' + int + '_procentaje'], data['nivel_' + int + '_cantidad'], int).then(e => {
            window.location.reload();
        })
    }

    mesas = () => {
        const data = this.state;
        if (data.mesas_cantidad > 0) {
            let bool = window.confirm('Asegurese de no tener ventas activas en las mesas. Al dar clic en aceptar se eliminaran todas las cuentas y se volverán a iniciar de 0')
            if (bool) {
                Helpers.Mesas_Create(data.mesas_cantidad).then(e => {
                    window.location.reload();
                })
            }
        } else {
            window.alert('La cantidad debe ser mayor a 0')
        }
    }

    render() {
        let preload = <Preload/>;

        let mesas = (this.state.carga) ? this.state.vista : preload;
        return (
            <div key="Venta_Directa" className="col-12 col-md-12 col-lg-12 col-xl-12"
                 style={{width: '100%', height: '100%'}}>
                <h2 className="title_configuracion">Configuración</h2>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <h4>Nivel 1</h4>
                        <h5 className="title_configuraciones">Cantidad mínima</h5>
                        <input id="nivel_1_cantidad" placeholder={'Ingrese Cantidad'} className="input_configuraciones"
                               type="number" min={0} onChange={this.update_state} value={this.state.nivel_1_cantidad}/>
                        <h5 className="title_configuraciones">Porcentaje de descuento</h5>
                        <input id="nivel_1_procentaje" placeholder={'Ingrese Porcentaje'}
                               className="input_configuraciones"
                               type="number" onChange={this.update_state} value={this.state.nivel_1_procentaje}/>
                        <button onClick={() => this.submit(1)} className="btn btn-success col-6">Guardar</button>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <h4>Nivel 2</h4>
                        <h5 className="title_configuraciones">Cantidad mínima</h5>
                        <input id="nivel_2_cantidad" placeholder={'Ingrese Cantidad'} className="input_configuraciones"
                               type="number" onChange={this.update_state} value={this.state.nivel_2_cantidad}/>
                        <h5 className="title_configuraciones">Porcentaje de descuento</h5>
                        <input id="nivel_2_procentaje" placeholder={'Ingrese Porcentaje'}
                               className="input_configuraciones"
                               type="number" onChange={this.update_state} value={this.state.nivel_2_procentaje}/>
                        <button onClick={() => this.submit(2)} className="btn btn-success col-6">Guardar</button>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <h4>Nivel 3</h4>
                        <h5 className="title_configuraciones">Cantidad mínima</h5>
                        <input id="nivel_3_cantidad" placeholder={'Ingrese Cantidad'} className="input_configuraciones"
                               type="number" onChange={this.update_state} value={this.state.nivel_3_cantidad}/>
                        <h5 className="title_configuraciones">Porcentaje de descuento</h5>
                        <input id="nivel_3_procentaje" placeholder={'Ingrese Porcentaje'}
                               className="input_configuraciones"
                               type="number" onChange={this.update_state} value={this.state.nivel_3_procentaje}/>
                        <button onClick={() => this.submit(3)} className="btn btn-success col-6">Guardar</button>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        <h3>Cantidad de Mesas</h3>
                        <input id="mesas_cantidad" placeholder={'Ingrese Cantidad'} className="input_configuraciones"
                               type="number" onChange={this.update_state} value={this.state.mesas_cantidad}/>
                        <button onClick={() => this.mesas()} className="btn btn-success col-6">Guardar</button>
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                        <h2 className="title_configuracion">Cumpleaños</h2>
                        {(Object.keys(this.state.fechas).length !== 0) ? this.state.fechas :
                            <h4>Sin cumpleañeros</h4>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Venta;
