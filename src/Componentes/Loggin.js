import React, {Component} from 'react';
import {firebaseDatabase} from '../Conexion/fire';
import {createBrowserHistory as createHistory} from 'history';
import Alert from 'react-s-alert';
import '../system/styles/css/Loggin.css';
import HelpersLogin from '../Helpers/Login';

const history = new createHistory();

class Loggin extends Component {

    state = {
        email: '',
        password: ''
    };

    HelpLogin = new HelpersLogin();

    componentWillMount() {
        document.title = `Loggin`;
        const datos = HelpersLogin.Desencriptar();
        if (datos !== false) this.revisador(datos);
    }

    revisador(data = '') {
        const e = JSON.parse(data);
        firebaseDatabase.ref('Usuarios').orderByChild('Usuario').equalTo(e.Usuario).once('value').then(function (snapshot) {
            return snapshot;
        }).then(i => {
            return HelpersLogin.Validar_Observador(i, e)
        }).then(i => {
            if (i === true) this.success_observador(e.Tipo);
            if (i === false) this.error_observador();
        })
    }

    updatestate = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    onKeyPress = e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            this.validar();
        }
    }

    validar= () => {
        const {email, password} = {...this.state}
        firebaseDatabase.ref('Usuarios').orderByChild('Usuario').equalTo(email).once('value').then(function (snapshot) {
            return snapshot;
        }).then(e => {
            console.log(e)
            return HelpersLogin.Validar(e, password);
        }).then(i => {
            if (i === false) this.error();
            if (i.boolean === true) this.success(i);
        }).catch(e => {
            this.error_inesperado();
        })
    }

    success(i = []) {
        HelpersLogin.Encriptar(i);
        if(i.Tipo === 'Vendedor'){
            HelpersLogin.CambioURL('/Principal/Venta')
        }else{
            HelpersLogin.CambioURL('/Principal/Clientes')
        }
    }

    success_observador(date='') {
       // console.log(date)
        if(date === 'Vendedor'){
            HelpersLogin.CambioURL('/Principal/Venta')
        }else{
            HelpersLogin.CambioURL('/Principal/Clientes')
        }
    }

    error_inesperado() {
        this.setState({title: 'Error Inesperado'}, () => {
            Alert.error(this.state.title, {
                position: 'top',
                effect: 'slide',
                timeout: 1000
            })
        })
    }

    error_observador() {
        HelpersLogin.Eliminar();
    }

    error() {
        this.setState({title: 'Usuario o contraseña erroneas'}, () => {
            Alert.error(this.state.title, {
                position: 'top',
                effect: 'slide',
                timeout: 1000
            })
        })
    }

    render() {
        return (
            <div id="backgroud-page">
                <div className="container">
                    <div>
                        <Alert stack={{limit: 3}}/>
                    </div>
                    <div className="left">
                        <div className="login">Login</div>
                        <div className="eula">Bienvenidos a tu espacio de trabajo
                        </div>
                    </div>
                    <div className="right">
                        <div id="form">
                            <label id="label" htmlFor="email">Usuario:</label>
                            <input type="email" id="email" onChange={this.updatestate}/>
                            <label id="label" htmlFor="password">Password:</label>
                            <input type="password" id="password" onKeyPress={this.onKeyPress}
                                   onChange={this.updatestate}/>
                            <input type="submit" id="submit" value="Entrar" onClick={()=>this.validar()}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loggin;
