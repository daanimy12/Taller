import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
import App from './App';
=======
import App from './pages/main/App';
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee

import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
// mandatory
<<<<<<< HEAD
import 'react-s-alert/dist/s-alert-default.css';
=======
import 'react-notifications/lib/notifications.css';
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee

// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
