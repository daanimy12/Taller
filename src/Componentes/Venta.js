import React, {Component} from 'react';
import HelpersVenta from '../Helpers/Venta';
<<<<<<< HEAD
import {firebaseDatabase} from "../Conexion/fire";
import Preload from './Preload'
import View_Table from '../Table_View'
import '../css/Ventas.css'
=======
import {firebaseDatabase} from "../system/model/firebase/firebase";
import Preload from './Preload'
import View_Table from '../Table_View'
import '../system/styles/Ventas.css'
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee

class Venta extends Component {

    state = {
        cantidadMesas: 0,
        mesas: [],
        vista: [],
        Products: [],
        ofertas: [],
    }

    componentWillMount() {
        let data = [];
        HelpersVenta.Productos().then(
            DataSnapshot => {
                this.setState({Products: DataSnapshot.val()})
                HelpersVenta.Descuentos().then(DataSnapshot => {
                    this.setState({ofertas: DataSnapshot.val()});
                    this.vistaMesas()
                })
            }
        )
        firebaseDatabase.ref('Mesas').on('child_changed', DataSnapshot => {
            this.update_vistaMesas(DataSnapshot);
        });
        firebaseDatabase.ref('Mesas').on('child_added', DataSnapshot => {
            if (typeof DataSnapshot.val() !== "number") {
                data = data.concat(DataSnapshot.val());
            }
            this.setState({mesas: data, cantidadMesas: data.length}, () => this.vistaMesas());
        });
        firebaseDatabase.ref('Product').on('child_changed', DataSnapshot => {
            this.update_producto(DataSnapshot);
        });
        firebaseDatabase.ref('Product').on('child_added', DataSnapshot => {
            this.update_producto(DataSnapshot);
        });
        firebaseDatabase.ref('Ofertas').on('child_changed', DataSnapshot => {
            this.update_ofertas(DataSnapshot);
        });
    }

    componentDidMount() {
        document.title = `Ventas`;
    }

    componentWillUnmount() {
    }

    vistaMesas() {
        let vista = [];
        const data = this.state;
        for (let i = 0; i < data.mesas.length; i++) {
            if (data.mesas[i].Estatus === true) {
                vista.push(
                    <View_Table key={(i + 1).toString()}
                                table={{mesas: data.mesas[i], products: data.Products, ofertas: data.ofertas}}/>
                );
            }
            // else {
            //     vista.push(
            //         <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 table_leftover_sell">
            //             <h5>Mesa {i + 1}</h5>
            //             <h5>No se encuentra disponible</h5>
            //         </div>
            //     )
            // }
        }
        this.view(vista);
    }

    update_ofertas(snapshot) {
        const data = this.state;
        data.ofertas[snapshot.key] = snapshot.val();
        this.vistaMesas();
    }

    update_vistaMesas(snapshot) {
        let data = snapshot.val();
        const mesas = this.state.mesas;
        mesas[data.Mesa - 1] = data;
        this.setState({mesas: mesas})
        this.vistaMesas();
    }

    update_producto(snapshot) {
        let temp = this.state.vista;
        const data = this.state;
        data.Products[snapshot.key] = snapshot.val();
        temp.forEach((e, index) =>
            (index < temp.length - 1) ? temp[index] =
                <View_Table key={(index + 1).toString()}
                            table={{mesas: data.mesas[index], products: data.Products, ofertas: data.ofertas}}/> : null
        )
        this.setState({vista: temp, Products: data.Products})
    }

    view(vista) {
        this.setState({vista: vista})
    }

    render() {
        let preload = <Preload/>;

        let mesas = (this.state.cantidadMesas > 0) ? this.state.vista : preload;
        return (
            <div key="99" id="row" className="col-12 col-md-12 col-lg-12 col-xl-12 row" style={{width: '100%', height: '100%'}}>
                {mesas}
            </div>
        );
    }
}

export default Venta;
