import React from "react";
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";
import {useNotesAction} from "./contextos/contNotes";
import { DownloadForOffline } from 'styled-icons/material';
import { jsPDF } from "jspdf";
import LogoMain from "./imgPDF/logoSA.jpeg";

const ContainerView = styled.main`
  display: flex;
  flex-direction: column;
  gap: 10px;
  //padding: 10px;
  border: ${colorPalette.black} solid 0.5px;
  border-radius: 10px;
  height: 100%;
  overflow: auto;
  position: relative;
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
    max-height: 300px;
    overflow: auto;
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
  .titleVendor {
    font-size: 18px;
  }
  .icon {
    width: 30px;
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
  }
`;
const imgLogo = `https://firebasestorage.googleapis.com/v0/b/tallerdaniel-7fa3d.appspot.com/o/imgGeneral%2FWhatsApp%20Image%202021-06-20%20at%2020.29.20.jpeg?alt=media&token=2fca255c-52a7-4d0c-879e-0d36549cefc7`;

const ViewNotes = () => {
    const {
        saveClic,
        stateLocal,
        inventary,
        arrayVendors,
        validGeneralLocal,
    } = useNotesAction();

    const createHeaders = (keys) => {
        const result = [];
        for (let i = 0; i < keys.length; i += 1) {
            result.push({
                id: keys[i],
                name: keys[i],
                prompt: keys[i],
                width: 65,
                align: "center",
                padding: 0
            });
        }
        return result;
    }

    const getData = (arrayInventary) => {
        const resultArray = [];
        arrayInventary?.filter((inv) => inv.count > 0)?.map(
            invent => {
                resultArray.push(
                    {
                        Cantidad: invent?.count ,
                        Nombre: invent?.names ,
                        Total: invent?.price ,

                    }
                )
                return null;
            }
        );
        return resultArray;
    }
    const onDownload = () => {
        if(validGeneralLocal()) {
            // Default export is a4 paper, portrait, using millimeters for units
            const doc = new jsPDF();
            // Margen del doc
            doc.line(10,10,200,10);
            doc.line(10,10,10,287);
            doc.line(10,287,200,287);
            doc.line(200,10,200,287);
            // Fin del margen doc
            // Control de Img
            doc.addImage(LogoMain, "JPEG", 40, 15, 120, 20);
            doc.setFontSize(12);
            doc.text(`Folio: ${stateLocal?.folio}`,150,40, {
                maxWidth: 195
            });
            // Fin Img
            // Control de datos del cliente
            doc.line(10,43,200,43);
            doc.setFontSize(14);
            doc.text(`Nombre: ${stateLocal?.name} ${stateLocal?.lastName}`,15,50, {
                maxWidth: 95
            });
            doc.text(`Dirección: ${stateLocal?.direction}`,15,60, {
                maxWidth: 95
            });
            doc.text(`Fecha: ${stateLocal?.createdAt}`,15,70, {
                maxWidth: 95
            });
            doc.text(`Modelo: ${stateLocal?.modelCar}`,115,50, {
                maxWidth: 195
            });
            doc.text(`Marca: ${stateLocal?.brand}`,115,60, {
                maxWidth: 195
            });
            doc.text(`Placa: ${stateLocal?.licensePlate}`,115,70, {
                maxWidth: 195
            });
            doc.line(10,80,200,80);
            doc.setFontSize(16);
            doc.setFont("Arial","italic","bold")
            doc.text(`Total: $${stateLocal.total.toFixed(2)}`,145,79, {
                maxWidth: 195
            });
            // Fin de control de datos de clientes
            doc.table(15,90,getData(inventary),createHeaders(["Cantidad","Nombre","Total"]),{ padding: "5px",autoSize: false, fontSize: 14 })
            doc.save("a4.pdf");
        }
    }
    return (
        <ContainerView>
            {saveClic ? <DownloadForOffline className='icon' onClick={onDownload} /> : null}
            <img
                alt="logo"
                src={imgLogo}
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
                                    <h1> {inven?.price || 0} </h1>
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
                    {stateLocal.total.toFixed(2)}
                </label>
            </div>
            <hr/>
            <h1 className="titleVendor"> Provedores </h1>
            <div className="boxInventary" >
                <label> Folio </label>
                <label> Marca </label>
                <label> Monto </label>
            </div>
            <div className="boxInventary" >
                {
                    arrayVendors
                        .map(
                            (inven) => (
                                <>
                                    <h2> {inven?.folio || 0} </h2>
                                    <label> {inven.name} </label>
                                    <h1> {inven?.invoiceAmount || 0} </h1>
                                </>
                            )
                        )
                }
            </div>
        </ContainerView>
    )
}

export default ViewNotes;