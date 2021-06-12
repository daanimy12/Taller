import React, {Component} from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import AgregarProducto from "../SubComponentes/AgregarProducto";
import Union from "../SubComponentes/Union"
import MenuInventario from "../SubComponentes/MenuInventario";
import Login from "../Helpers/Login";
import Error from "../Componentes/Error";
import Codigo from "../Componentes/Codigos";
class Inventario extends Component {

    state={
        TitoCliente: true
    }
    componentWillMount() {
        document.title = `Inventario`;
        const p = Login.DesencriptarG(window.localStorage.getItem("TipoC"));
        this.setState({TitoCliente: JSON.parse(JSON.parse(p).Tipo === "Vendedor") ? false:true })
    }

    render() {
        let Filtros = this.state.TitoCliente ?
            <div>
                <MenuInventario/>
                <Switch>
<<<<<<< HEAD
                    <Route path='/Principal/Inventario/AgregarProduc' component={AgregarProducto}/>
                    <Route path='/Principal/Inventario/Extras' component={Union}/>
                    <Route path='/Principal/Codigos' component={Codigo}/>
=======
                    <Route path='/Customers/Inventario/AgregarProduc' component={AgregarProducto}/>
                    <Route path='/Customers/Inventario/Extras' component={Union}/>
                    <Route path='/Customers/Codigos' component={Codigo}/>
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee
                    <Route component={Error} />
                </Switch>
            </div>   :
            <Switch>
<<<<<<< HEAD
                <Route path='/Principal/Inventario/AgregarProduc' component={AgregarProducto}/>
=======
                <Route path='/Customers/Inventario/AgregarProduc' component={AgregarProducto}/>
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee
                <Route component={Error} />
            </Switch>;
        return (
            <BrowserRouter>
                <div style={{height:"100%"}}>
                        {/*Menu*/}
                    {Filtros}

                </div>
            </BrowserRouter>

        );
    }
}

export default Inventario;
