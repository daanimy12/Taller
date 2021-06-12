import React, {Component} from 'react';
import '../system/styles/Reportes.css';
import AgregarCategory from "../SubComponentes/AgregarCategory";
import AgregarProvedor from "../SubComponentes/AgregarProvedor";
class index extends Component {
    state={

    }

    static getDerivedStateFromProps (nextProps, prevState) {

        return null;
    }render() {
        return (
            <div className="col-12" id="Union">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " id="CajaDivicional" style={{borderBottom:"solid 1px #CCC"}}>
                    <AgregarCategory/>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " id="CajaDivicional">
                    <AgregarProvedor/>
                </div>

            </div>
        );
    }
}

export default index;
