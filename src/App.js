import React from 'react';
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loggin from './Componentes/Loggin';
import Principal from './Componentes/Principal';
import Error from "./Componentes/Error";
import { colorPalette } from "./system/styles/styles";

const ContainerMain = styled.main`
    
    p, label, a, body, h1, h2, h3, h4,li, ol,ul, input {
      font-family: ${colorPalette.fontMain};
    }

`;

const App = () => {
  return (
      <ContainerMain>
        <div className="page">
          <BrowserRouter>
            <Switch>
                <Route path='/' component={Loggin} exact />
                <Route path='/Principal' component={Principal}  />

                <Route component={Error} />
            </Switch>
          </BrowserRouter>

        </div>
      </ContainerMain>
  );
}

export default App;
