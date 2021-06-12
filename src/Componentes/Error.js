<<<<<<< HEAD
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
=======
import React from 'react';
import Login from "../Helpers/Login";
const Error = () => {
    const {
        CambioURL
    } = Login()
    React.useEffect ( () =>  {
        CambioURL('/');
        // console.log("Entro aki")
    },[])

    return(
        <div></div>
    );

>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee
}

export default Error;
