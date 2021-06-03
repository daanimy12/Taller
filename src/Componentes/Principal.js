import React, {Component} from 'react';
//import { firebaseDatabase } from '../Conexion/fire';
import Usuarios from '../Componentes/Usuarios';
import Ofertas from '../Componentes/Ofertas';
import Inventario from '../Componentes/Inventario';
import Venta from '../Componentes/Venta';
import Venta_Directa from '../Componentes/Venta_Directa';
import Limites from '../Componentes/Limites';
import Reportes from '../Componentes/Reportes';
import Index from './Header';
import Codigos from '../Componentes/Codigos';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../Helpers/Login';
import '../system/styles/Principal.css';
import '../system/styles/Menu.css';
import '../system/styles/Exportar.css';
import Error from "./Error";
import Cliente from  '../Componentes/Clientes';
import Cierre_de_Caja from '../Componentes/Cierre'

class Principal extends Component {

    state = {
        TipoClient: null
    };

    componentWillMount() {
        const Validado = JSON.parse(Login.Desencriptar());
        if (Validado !== false) {
            window.localStorage.setItem('TipoC', Login.EncriptarG({'Tipo': Validado.Tipo}));
            this.setState({TipoClient: Validado.Tipo})
        } else {
            Login.CambioURL('/');
        }
    }

    render() {
        const Rutas = (this.state.TipoClient === 'Administrador') ?
            <Switch>
                <Route path='/Principal/Usuarios' component={Usuarios} />
                <Route path='/Principal/Inventario' component={Inventario} />
                <Route path='/Principal/Ofertas' component={Ofertas} />
                <Route path='/Principal/Venta' component={Venta} />
                <Route path='/Principal/Venta_Directa' component={Venta_Directa} />
                <Route path='/Principal/Clientes' component={Cliente} />
                <Route path='/Principal/Limites' component={Limites} />
                <Route path='/Principal/Codigos' component={Codigos} />
                <Route path='/Principal/Cierre_de_Caja' component={Cierre_de_Caja} />
                <Route path='/Principal/Reportes' component={Reportes} />
                <Route component={Error} />
            </Switch>
            :
            <Switch>
                <Route path='/Principal/Inventario' component={Inventario}/>
                <Route path='/Principal/Venta' component={Venta}/>
                <Route path='/Principal/Venta_Directa' component={Venta_Directa}/>
                <Route component={Error}/>
            </Switch>;
        return (
            <BrowserRouter>
                <div className="Tamano row" id="row">
                    <div id='Fondo1' className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 ">

                    </div>

                    <div className="  col-sm-12 col-lg-12  col-md-10 col-lg-10 col-xl-10 PrincipalCon" style={{paddingLeft:'0%',paddingRight:'0%'}}>
                        {/* <Encabezado/> */}
                        {Rutas}
                    </div>

                    <div id='Fondo' className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 ">

                        <Index Cliente={this.state.TipoClient}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Principal;
