import React from 'react';
import styled from "styled-components";
import Usuarios from '../user/Usuarios';
import NoteContainer from "../notes/noteContainer"
import Venta from '../../Componentes/Venta';
import Venta_Directa from '../../Componentes/Venta_Directa';
import Index from '../../Componentes/navBar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../../Helpers/Login';
import Cliente from '../customers';

const Customers = (props) => {

    const [state,setState] = React.useState({
        TipoClient: null
    });

    const { className } = props;

    const {
        CambioURL,
        Desencriptar,
        EncriptarG
    } = Login();

    React.useEffect(() => {
            const Validado = JSON.parse(Desencriptar());
            if (Validado !== false) {
                window.localStorage.setItem('TipoC', EncriptarG({'Tipo': Validado.Tipo}));
                setState(prev => ({...prev,TipoClient: Validado.Tipo}))
            } else {
                CambioURL('/');
            }
        },[]);


        const Rutas = (state.TipoClient === 'Administrador') ?
            <Switch>
                <Route path='/Customers/Usuarios' component={Usuarios} />
                <Route path='/Customers/Clientes' component={Cliente} />
                <Route path='/Customers/Notas' component={NoteContainer} />
            </Switch>
            :
            <Switch>
                <Route path='/Customers/Venta' component={Venta}/>
                <Route path='/Customers/Venta_Directa' component={Venta_Directa}/>
            </Switch>;
        return (
            <BrowserRouter>
                <div className={className}>
                    <div id='Fondo'>
                        <Index Cliente={state.TipoClient}/>
                    </div>
                    <div className="containerMain"
                         style={{paddingLeft:'0%',paddingRight:'0%'}}
                    >
                        {Rutas}
                    </div>
                </div>
            </BrowserRouter>
        );

}

export default  styled(Customers)`
  display: grid;
  grid-template-columns: 250px calc(100% - 250px);
  #Fondo {
    width: 100%;
    height: 100vh;
  }
  .containerMain {
    height: 100vh;
    overflow: auto;
  }
`;
