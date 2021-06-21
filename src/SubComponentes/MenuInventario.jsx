import React, {Component} from 'react';
import { createBrowserHistory as createHistory} from 'history';
import '../system/styles/Inventario.css';
const history = new createHistory();
class MenuInventario extends Component {

    componentWillUnmount() {

    }

    Cambio = (e) => {
        history.push('/Customers/Inventario/'+[e.target.id]);
        window.location.reload();
    };

    render() {
        return (

                    <nav id='MenuMas' className='row'>
                        <ul id="menuInventario" className='row ' style={{margin:"0%"}}>
                            <li className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 CajaMenu'>
                                <label id='AgregarProduc' onClick={this.Cambio}>Productos</label>
                            </li>
                            <li className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'><label id='Extras' onClick={this.Cambio}>Categoria / Proovedor</label></li>

                        </ul>
                    </nav>

        );
    }
}

export default MenuInventario;
