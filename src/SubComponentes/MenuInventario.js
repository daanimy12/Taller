import React, {Component} from 'react';
import { createBrowserHistory as createHistory} from 'history';
<<<<<<< HEAD
import '../css/Inventario.css';
=======
import '../system/styles/Inventario.css';
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee
const history = new createHistory();
class MenuInventario extends Component {

    componentWillUnmount() {

    }

    Cambio = (e) => {
<<<<<<< HEAD
        history.push('/Principal/Inventario/'+[e.target.id]);
=======
        history.push('/Customers/Inventario/'+[e.target.id]);
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee
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
