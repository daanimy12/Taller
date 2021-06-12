import React, {Component} from 'react';
import Alert from "react-s-alert";
import Helper from '../../Cierre'
import {createBrowserHistory as createHistory} from 'history';

const history = createHistory();

class index extends Component {

    state = {
        nombre: this.props.data.usuario,
        ventas: this.props.data.ventas,
        total: this.props.data.total
    };

    componentDidMount() {
        this.setState({
            nombre: this.props.data.usuario,
            ventas: this.props.data.ventas,
            total: this.props.data.total
        })
    }

    componentWillReceiveProps(nextProps) {
        let total = 0;
        nextProps.data.ventas.map(e => total = total + e.Total);
      //  nextProps.data.ventas.map(e => console.log(e.Total));
        this.setState({
            nombre: nextProps.data.usuario,
            total: total,
            ventas: nextProps.data.ventas
        })
    }

    detalles = () => {
        const data = this.state;
        history.push({
<<<<<<< HEAD
            pathname: "/Principal/Cierre_de_Caja/Detalles",
=======
            pathname: "/Index/Cierre_de_Caja/Detalles",
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee
            state: data
        });
        // console.log(data)
        window.location.reload();
    }

    render() {

        let data = this.state;

        return (
            <div
                className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 m-3 alto_box_user justify-content-center align-items-center"
                onClick={this.detalles}>
                <div className="caja_img_user">
                    <h5>${data.total}</h5>
                </div>
                <div className="caja_name_user">
                    <h6>{data.nombre}</h6>
                </div>
            </div>
        );
    }
}

export default index;
