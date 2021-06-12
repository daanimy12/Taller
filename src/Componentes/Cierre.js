import React, {Component} from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";

import Dashboard from "../Helpers/Cierre/Vista_Dashboard";
import Detalles from "../Helpers/Cierre/Vista_Detalles";

<<<<<<< HEAD
import '../css/Cerrar.css'
=======
import '../system/styles/Cerrar.css'
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee

class Cierre extends Component {

    componentWillUnmount() {

    }

    render() {
        return (
            <BrowserRouter>
                <div className="display">
                    <Switch>
<<<<<<< HEAD
                        <Route path='/Principal/Cierre_de_Caja/Dashboard' component={Dashboard}/>
                        <Route path='/Principal/Cierre_de_Caja/Detalles' component={Detalles}/>
=======
                        <Route path='/Customers/Cierre_de_Caja/Dashboard' component={Dashboard}/>
                        <Route path='/Customers/Cierre_de_Caja/Detalles' component={Detalles}/>
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee
                    </Switch>
                </div>
            </BrowserRouter>

        );
    }
}

export default Cierre;
