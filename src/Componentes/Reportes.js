import React, {Component} from 'react';
import Filtros from '../Helpers/Reportes/Filtros';
import Alert from "react-s-alert";
import '../css/Reportes.css';
class Reportes extends Component {

    componentWillMount() {
        document.title = `Reportes`;
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='Reportes1' style={{padding: '2%'}}>
                <Alert stack={{limit: 3}}/>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <h1>Reportes</h1>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  CajaFiltro">
                    <Filtros/>
                </div>

            </div>


        );
    }
}

export default Reportes;
