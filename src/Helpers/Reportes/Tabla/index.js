import React, {Component} from 'react';
import '../../../system/styles/Reportes.css';

class index extends Component {
    state={

}
    render() {
        return (
            <div className="CajaTabla">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className=" PrincipalTaU col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 "
                         style={{paddingLeft: '0%', paddingRight: '0%', margin: '2%'}}>
                        <div className="table-responsive TablaU TamanT">
                            <table className="table users table-hover">
                                <thead>
                                <tr className="table-primary">
                                    {this.props.Encabezados}
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.Valores}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default index;
