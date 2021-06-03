import React, {Component} from 'react';
import Login from "../Helpers/Login";
class Error extends Component {

    componentWillMount() {
        Login.CambioURL('/');
    }

    render() {
        return(
            <div></div>
        );
    }
}

export default Error;
