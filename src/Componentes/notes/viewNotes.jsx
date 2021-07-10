import React from "react";
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";
import {useNotesAction} from "./contextos/contNotes";

const ContainerView = styled.main`
  display: flex;
  flex-direction: column;
  gap: 10px;
  //padding: 10px;
  border: ${colorPalette.black} solid 0.5px;
  border-radius: 10px;
  height: 100%;
  overflow: auto;
  img {
    width: 50%;
    object-position: center;
    margin: 0 auto;
  }
  .dataGeneral {
    border-top: solid ${colorPalette.black} 0.5px ;
    border-bottom: solid ${colorPalette.black} 0.5px ;
    display: grid;
    grid-template-columns: 50% 50%;
    .bxTwo {
      display: grid;
      grid-template-columns: 25% 75%;
      grid-gap: 5px;
      align-content: center;
      label, h1 {
        font-family: ${colorPalette.fontMain};
        font-size: 16px;
      }
      label {
        text-align: end;
        align-self: center;
        &::after {
          content: ":";
        }
      }
      h1 {
        margin: 0;
        padding-left: 5px;
        align-self: center;
        width: calc(100% - 5px);
      }
    }
  }
  .boxInventary {
    display: grid;
    //border-top: solid ${colorPalette.black} 0.5px ;
    border-bottom: solid ${colorPalette.black} 0.5px ;
    grid-template-columns: 25% 50% 25%;
    grid-gap: 5px;
    align-content: center;
    padding: 10px;
    label, h1, h2 {
      font-family: ${colorPalette.fontMain};
      font-size: 16px;
      text-align: center;
      border-left: solid ${colorPalette.black} 0.5px ;
    }
    h1 {
      &::before {
        content: "$";
      }
    }
  }
  .boxInput {
    width: 100%;
    display: grid;
    grid-template-columns: 20% 80%;
    align-items: center;
    padding: 10px;
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

const ViewNotes = () => {
    const { stateLocal, inventary } = useNotesAction();
    return (
        <ContainerView>
            <img
                alt="logo"
                src="https://firebasestorage.googleapis.com/v0/b/tallerdaniel-7fa3d.appspot.com/o/imgGeneral%2FWhatsApp%20Image%202021-06-20%20at%2020.29.20.jpeg?alt=media&token=2fca255c-52a7-4d0c-879e-0d36549cefc7"
            />
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
            <div className="boxInventary" >
                <label>Cantidad</label>
                <label>Descripción</label>
                <label>Total</label>
            </div>
            <div className="boxInventary" >
                {
                    inventary
                        ?.filter((inv) => inv.count > 0)
                        .map(
                            (inven) => (
                                <>
                                    <h2> {inven?.count || 0} </h2>
                                    <label> {inven.names} </label>
                                    <h1> {inven?.count || 0} </h1>
                                </>
                            )
                        )
                }
            </div>
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
        </ContainerView>
    )
}

export default ViewNotes;