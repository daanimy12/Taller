import React from "react";
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";
import { useNotesAction } from "./contextos/contNotes";
import { DownloadForOffline } from 'styled-icons/material';
import { jsPDF } from "jspdf";
import LogoMain from "./imgPDF/logoSA.jpeg";
import TbvwServices from './tbvwServices';
import DataCustumer from './DataCustumer';
import DataProduct from './DataProduct';
import DataVendors from './DataVendors';
import Button from '@material-ui/core/Button';

const ContainerView = styled.main`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

  .boxInput {
    width: 100%;
    display: grid;
    grid-template-columns: 82% 18%;
    align-items: center;
    padding: 10px;
    label {
      font-size: 20px;
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
    arrayServices,
    onSaveData,
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

  const merge = (array1, array2) => {
    let combinedArray = [];
    combinedArray = combinedArray.concat(array1).concat(array2);
    return combinedArray;
  }
  const getData = (arrayInventary) => {
    const resultArray = [];
    arrayInventary?.filter((inv) => inv.count > 0)?.map(
      invent => {
        resultArray.push(
          {
            Cantidad: invent?.count,
            Nombre: invent?.names,
            Descripcion: invent?.description,
            Importe: invent?.price,

          }
        )
        return null;
      }
    );
    const array = getData2(arrayServices);
    let result = merge(array, resultArray)
    return result;
  }
  const getData2 = (array) => {
    const x = [];
    array?.map(
      item => {
        x.push(
          {
            Cantidad: '1',
            Nombre: item?.Nombre,
            Descripcion: item?.Descripcion,
            Importe: item?.Precio || '',

          }
        )
        return null;
      }
    );
    return x;
  }
  const onDownload = () => {
    if (validGeneralLocal()) {
      // Default export is a4 paper, portrait, using millimeters for units
      const doc = new jsPDF();
      // Margen del doc
      // doc.line(10, 10, 200, 10);
      // doc.line(10, 10, 10, 287);
      // doc.line(10, 287, 200, 287);
      // doc.line(200, 10, 200, 287);
      // Fin del margen doc
      // Control de Img
      doc.addImage(LogoMain, "JPEG", 40, 15, 120, 20);
      doc.setFontSize(12);
      doc.text(`Folio: ${stateLocal?.folio}`, 150, 40, {
        maxWidth: 195
      });
      // Fin Img
      // Control de datos del cliente
      doc.line(5, 43, 200, 43);
      doc.setFontSize(10);
      doc.text(`Nombre: ${stateLocal?.name} ${stateLocal?.lastName}`, 15, 50, {
        maxWidth: 95
      });
      doc.text(`Dirección: ${stateLocal?.direction}`, 15, 55, {
        maxWidth: 95
      });
      doc.text(`Fecha: ${stateLocal?.createdAt}`, 15, 60, {
        maxWidth: 95
      });
      doc.text(`Modelo: ${stateLocal?.modelCar}`, 150, 50, {
        maxWidth: 195
      });
      doc.text(`Marca: ${stateLocal?.brand}`, 150, 55, {
        maxWidth: 195
      });
      doc.text(`Placa: ${stateLocal?.licensePlate}`, 150, 60, {
        maxWidth: 195
      });
      // doc.line(10, 80, 200, 80);
      doc.setFontSize(18);
      doc.setFont("Arial", "italic", "bold")
      doc.text(`Total: $${stateLocal.total.toFixed(2)}`, 145, 79, {
        maxWidth: 195
      });
      // Fin de control de datos de clientes
      doc.table(7, 85, getData(inventary), createHeaders(["Cantidad", "Nombre", "Descripcion", "Importe"]), { autoSize: false, fontSize: 12, margins: 3, padding: 1 })
      doc.save("SAutomotriz.pdf");
    }
  }
  return (
    <ContainerView>
      {saveClic ? <DownloadForOffline className='icon' onClick={onDownload} /> : null}
      <img
        alt="logo"
        src={imgLogo}
      />
      {/*datos del usuario*/}
      <DataCustumer />
      <div className="boxInput">
        <label className="TotalInput">
          Total:
                </label>
        <label
          className="TotalInput"
        >
          {"$" + stateLocal.total.toFixed(2)}
        </label>
      </div>

      {/*datos de refacciones*/}
      <DataProduct />
      {/*datos del servcio*/}
      <TbvwServices />
      {/*datos del provedor*/}
      <DataVendors />
      {
        (stateLocal.name) && (<Button variant="contained" color="primary" onClick={onSaveData}>
          Guardar Nota
        </Button>)
      }

    </ContainerView>
  )
}

export default ViewNotes;