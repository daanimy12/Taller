import React from 'react';
import { useNotesAction } from "./contextos/contNotes";

const DataCustumer = props => {

    const { stateLocal } = useNotesAction();

    return (
        <div className="dataGeneral">
            <div className="bxTwo" >
                <label> Nombre </label>
                <h1> {stateLocal.name} {stateLocal.lastName} </h1>
                <label> Dirección </label>
                <h1> {stateLocal.direction} </h1>
                <label> Fecha </label>
                <h1> {stateLocal.createdAt} </h1>
            </div>
            <div className="bxTwo" >
                <label> Modelo </label>
                <h1> {stateLocal.modelCar} </h1>
                <label> Marca </label>
                <h1> {stateLocal.brand} </h1>
                <label> Placa </label>
                <h1> {stateLocal.licensePlate} </h1>
            </div>
        </div>
    )
}

export default DataCustumer;