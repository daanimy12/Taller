import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loggin from '../loggin/Loggin';
import Principal from '../../Componentes/Principal';
import Error from "../../Componentes/Error";

function App() {
  return (
      <div className="App">
        <div className="page">
          <BrowserRouter>
            <Switch>
                <Route path='/' component={Loggin} exact />
                <Route path='/Principal' component={Principal}  />

                <Route component={Error} />
            </Switch>
          </BrowserRouter>

        </div>
      </div>
  );
}

export default App;
