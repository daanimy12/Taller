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

}

export default Error;
