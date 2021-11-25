import React from "react";
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";
import { useNotesAction } from "./contextos/contNotes";

const FormMain = styled.form`
  padding: 10px;
  h2 {
    font-size: 18px;
    text-transform: uppercase;
  }
  .boxInput {
    width: 100%;
    display: grid;
    grid-template-columns: 20% 80%;
    align-items: center;
    padding: 10px 0;
    label {
      font-size: 16px;
    }
    input, select {
      font-size: 16px;
      border-radius: 10px;
      border: 1px solid ${colorPalette.secondColor};
      padding: 5px;
      &:focus {
        outline: none;
      }
    }
    .TotalInput {
      border: none;
      text-align: end;
      &::before {
        content: "$";

      }
    }
  }
  
`;

const TabPersonalData = props => {
    const {
        stateLocal,
        onChangeInput,
        arrayCustomers
    } = useNotesAction();


    return (
        <FormMain>
            <h2> Datos Personales </h2>
            <div className="boxInput">
                <label>
                    Folio:
                </label>
                <input
                    disabled
                    type="text"
                    name="folio"
                    value={stateLocal.folio}
                />
            </div>
            <div className="boxInput">
                <label>
                    Cliente:
                </label>
                <select name="customer" onChange={onChangeInput} value={stateLocal.customer}>
                    <option key="999999999" value=""> Sin cliente elegido </option>
                    {
                        arrayCustomers.map(
                            (customer, index) => (
                                <option key={index} value={customer?.invoice}>
                                    { `${customer?.name} ${customer?.lastName} ` }
                                </option>
                            )
                        )
                    }
                </select>
            </div>
            <div className="boxInput">
                <label>
                    Nombre:
                </label>
                <input
                    disabled={stateLocal.customer}
                    type="text"
                    name="name"
                    onChange={onChangeInput}
                    value={stateLocal.name}
                />
            </div>
            <div className="boxInput">
                <label>
                    Apellido:
                </label>
                <input
                    disabled={stateLocal.customer}
                    type="text"
                    name="lastName"
                    onChange={onChangeInput}
                    value={stateLocal.lastName}
                />
            </div>
            <div className="boxInput">
                <label>
                    Dirección:
                </label>
                <input
                    disabled={stateLocal.customer}
                    type="text"
                    name="direction"
                    onChange={onChangeInput}
                    value={stateLocal.direction}
                />
            </div>
            <hr/>
            <h2> Datos Automovil </h2>
            <div className="boxInput">
                <label>
                    Modelo:
                </label>
                <input
                    disabled={stateLocal.customer}
                    type="text"
                    name="modelCar"
                    onChange={onChangeInput}
                    value={stateLocal.modelCar}
                />
            </div>
            <div className="boxInput">
                <label>
                    Marca:
                </label>
                <input
                    disabled={stateLocal.customer}
                    type="text"
                    name="brand"
                    onChange={onChangeInput}
                    value={stateLocal.brand}
                />
            </div>
            <div className="boxInput">
                <label>
                    Placa:
                </label>
                <input
                    type="text"
                    name="licensePlate"
                    onChange={onChangeInput}
                    value={stateLocal.licensePlate}
                />
            </div>
            <div className="boxInput">
                <label>
                    Anticipo:
                </label>
                <input
                    type="number"
                    name="advance"
                    min={0}
                    onChange={onChangeInput}
                    value={stateLocal?.advance}
                />
            </div>
            <div className="boxInput">
                <label>
                    Fecha:
                </label>
                <input
                    type="date"
                    name="createdAt"
                    onChange={onChangeInput}
                    value={stateLocal.createdAt}
                />
            </div>
            <hr/>
            <div className="boxInput">
                <label>
                    Total:
                </label>
                <label
                    className="TotalInput"
                >
                    {stateLocal.total}
                </label>
            </div>
        </FormMain>
    )
}

export default TabPersonalData;