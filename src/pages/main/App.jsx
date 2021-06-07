import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loggin from '../loggin/Loggin';
import Customers from './containerTwo';
import Error from "../../Componentes/Error";
import { NotificationContainer } from 'react-notifications';
function App() {
  return (
      <div className="App">
        <div className="page">
          <BrowserRouter>
            <Switch>
                <Route path='/' component={Loggin} exact />
                <Route path='/Customers' component={Customers}  />
                <Route component={Error} />
            </Switch>
          </BrowserRouter>
          <NotificationContainer/>
        </div>
      </div>
  );
}

export default App;
