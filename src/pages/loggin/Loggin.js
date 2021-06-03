import React from 'react';
import styled from "styled-components";
import {firebaseDatabase} from '../../Conexion/fire';
import { useHistory }  from "react-router-dom";
import Alert from 'react-s-alert';
import { colorPalette } from  "../../system/styles/styles"
import HelpersLogin from '../../Helpers/Login';

const Loggin = (props) => {
    const formRef = React.useRef();
    const { className } = props;
    const history =  useHistory();
    const [state,setState] = React.useState({
        email: '',
        password: ''
    });

    const HelpLogin = new HelpersLogin();

    const componentWillMount = ()=> {
        document.title = `Loggin`;
        const datos = HelpersLogin.Desencriptar();
        if (datos !== false) this.revisador(datos);
    }

    const revisador = (data = '') => {
        const e = JSON.parse(data);
        firebaseDatabase.ref('Usuarios').orderByChild('Usuario').equalTo(e.Usuario).once('value').then(function (snapshot) {
            return snapshot;
        }).then(i => {
            return HelpersLogin.Validar_Observador(i, e)
        }).then(i => {
            if (i === true) success_observador(e.Tipo);
            if (i === false) error_observador();
        })
    }

    const updatestate = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        setState(prev => ({...prev,[name]: value}));
    };

    const onKeyPress = e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            validar();
        }
    }

    const validar= () => {
        const {email, password} = {...this.state}
        firebaseDatabase.ref('Usuarios').orderByChild('Usuario').equalTo(email).once('value').then(function (snapshot) {
            return snapshot;
        }).then(e => {
            console.log(e)
            return HelpersLogin.Validar(e, password);
        }).then(i => {
            if (i === false) error();
            if (i.boolean === true) success(i);
        }).catch(e => {
            error_inesperado();
        })
    }

    const success = (i = []) => {
        HelpersLogin.Encriptar(i);
        if(i.Tipo === 'Vendedor'){
            HelpersLogin.CambioURL('/Principal/Venta')
        }else{
            HelpersLogin.CambioURL('/Principal/Clientes')
        }
    }

    const success_observador = (date='') => {
       // console.log(date)
        if(date === 'Vendedor'){
            HelpersLogin.CambioURL('/Principal/Venta')
        }else{
            HelpersLogin.CambioURL('/Principal/Clientes')
        }
    }

    const error_inesperado = () => {
        this.setState({title: 'Error Inesperado'}, () => {
            Alert.error(this.state.title, {
                position: 'top',
                effect: 'slide',
                timeout: 1000
            })
        })
    }

    const error_observador = () => {
        HelpersLogin.Eliminar();
    }

    const error = () => {
        this.setState({title: 'Usuario o contraseña erroneas'}, () => {
            Alert.error(this.state.title, {
                position: 'top',
                effect: 'slide',
                timeout: 1000
            })
        })
    }


        return (
            <div className={className}>
                <form id="form" ref={formRef}>
                    <img src="https://i.pinimg.com/originals/97/95/eb/9795ebef9b85576509c37dfce0c8aed8.jpg" alt="logo"/>
                    <label id="label" htmlFor="email">Usuario:</label>
                    <input type="email" id="email" onChange={updatestate}/>
                    <label id="label" htmlFor="password">Password:</label>
                    <input type="password" id="password" onKeyPress={onKeyPress}
                           onChange={updatestate}/>
                    <button type="submit"> Aceptar </button>
                </form>
            </div>
        );

}

export default styled(Loggin)`
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: rgba(0,0,0,.16);
  form {
    width: 50%;
    height: 50%;
    background-color: ${colorPalette.white};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding:30px 10px 10px 10px;
    img {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      object-position: center;
      object-fit: cover;
      margin: 0px auto;
    }
    label {
      font-size: 20px;
      font-family: ${colorPalette.fontMain};
    }
    input {
      border: none;
      background: none;
      border-bottom: 1px solid ${colorPalette.black};
      &:focus {
        outline: none;
      }
    }
    
    button {
      width: 50%;
      min-height: 30px;
      margin: 0 auto;
      color: ${colorPalette.black};
      border-radius: 10px;
      background-color: ${colorPalette.colorMain};
      border: none;
      color: ${colorPalette.white}
    }
  }
`;
