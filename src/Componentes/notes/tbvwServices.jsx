import React, { useEffect, useState } from 'react';
import Universal from "../../Helpers/Universal";

const TbvwServices = () => {
    const [services, setServices] = useState([]);

    const getServices = async () => {
        try {
            const temp = [];
            const httpRequest = await Universal.ConsultaUniversal('Servicios');
            temp.push(httpRequest)
            console.log(temp)
        } catch (error) {
            console.log('error')
        }

    }

    useEffect(() => {
        getServices();
    }, [])

    return (
        <>
            <p>Hello friend</p>
        </>
    )
}

export default TbvwServices;
