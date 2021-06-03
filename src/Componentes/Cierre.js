import React, {Component} from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";

import Dashboard from "../Helpers/Cierre/Vista_Dashboard";
import Detalles from "../Helpers/Cierre/Vista_Detalles";

import '../system/styles/Cerrar.css'

class Cierre extends Component {

    componentWillUnmount() {

    }

    render() {
        return (
            <BrowserRouter>
                <div className="display">
                    <Switch>
                        <Route path='/Principal/Cierre_de_Caja/Dashboard' component={Dashboard}/>
                        <Route path='/Principal/Cierre_de_Caja/Detalles' component={Detalles}/>
                    </Switch>
                </div>
            </BrowserRouter>

        );
    }
}

export default Cierre;
