import React, { useState, useEffect } from 'react';
import Form from './Form';
import TableInventory from './TableInventory';
import Universal from "../../Helpers/Universal";
import { NotificationManager } from "react-notifications";
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";
import { firebaseDatabase } from '../../system/model/firebase/firebase';



const Inventory = (props) => {
  const { className } = props;
  const [state, setState] = useState([]);
  const [stateEdit, setStateEdit] = useState([]);

  const getInvetory = async () => {
    try {
      const items = await Universal.ConsultaUniversal('Inventario');
      const response = items;
      setState(response)
    } catch (error) {
      console.log('error: ', error);
    }

  }

  const onFileChange = async (resp) => {
    const url = await Universal.PushImagen("/HerramientasYRefacciones", resp);
    const response = url;
    return response;
  }
  //successfully added.. data
  const addOrEdit = async (values, resetForm) => {
    try {
      const copyArr = { ...values };
      const photo = copyArr.photo;
      const {
        amount,
        price,
        description,
        folio,
        names,
        Type,
        img,
      } = copyArr;

      const playload = {
        amount,
        price,
        description,
        folio,
        names,
        Type,
        img,
      };
      const getUrlPhoto = await onFileChange(photo);
      const url = getUrlPhoto[0];
      playload.img = url.toString();
      const newArr = { ...playload };
      await Universal.PushUniversal("Inventario", newArr)
      NotificationManager.success("Herramienta o Refacción agregado");
      resetForm();
      await getInvetory();
    } catch (error) {
      console.log('error: ', error);
      NotificationManager.error('Ocurrió un error: Faltan datos');
    }

  }

  const editInventory = (item) => {
    setStateEdit(item)
  }

  const onRemove = async (id, onCancel) => {
    try {
      let handleRemove = window.confirm("¿seguro que desea eliminar este elemento?")
      if (handleRemove) {
        const itemRef = firebaseDatabase.ref('Inventario').child(id);
        await itemRef.remove();
        await getInvetory();
        NotificationManager.success("Elemento eliminado");
        onCancel();
      }
    } catch (error) {
      onCancel();
      console.log('error: ', error);
      NotificationManager.error("ocurrio un error consulte al administrador");
    }
    onCancel();
  }

  useEffect(async () => {
    try {
      await getInvetory();
    } catch (error) {
      console.log('error: ', error);
    }
  }, [])

  const RenderComponents = () => {
    return (
      <main>
        <header> Agregar Herramienta / Refacción </header>
        <section>
          <article>
            <Form addOrEdit={addOrEdit} inventoryEdit={stateEdit} onRemove={onRemove} />
          </article>
          <article>
            <div className="boxMain">
              <TableInventory values={state} editInventory={editInventory} />
            </div>
          </article>
        </section>
      </main>
    )
  }

  return (
    <div className={className}>
      {<RenderComponents />}
    </div>
  );
}

export default styled(Inventory)`
    main {
      width: calc(100vw - 300px);
      height: 100vh;
      display: flex;
      gap: 10px;
      flex-direction: column;
      header {
        font-family: ${colorPalette.fontMain};
        font-size: 24px;
        margin: 10px 0 0 10px;
      }
      .typeUser {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        margin: 15px 0;
        justify-items: center;
        input {
          margin-right: 10px;
        }
      }
      section {
        display: grid;
        grid-template-columns: 40% 60%;
        width: 100%;
        height: 100%;
        .boxMain {
          background-color: ${colorPalette.white};
          width: 90%;
          height: 85%;
          overflow: auto;
          border-radius: 10px;
          margin: auto;
          padding: 30px;
          box-shadow: ${colorPalette.boxShadowLigth};
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        article {
          height: 100%;
          padding: 10px;
          display: flex;
          form {
            h2 {
              font-family: ${colorPalette.fontMain};
              font-size: 20px;
              text-transform: uppercase;
            }
            .boxInput {
              display: flex;
              justify-items: center;
              align-items: center;
              gap: 15px;
              label {
                font-family: ${colorPalette.fontMain};
                font-size: 18px;
                font-weight: 400;
              }
              
              input {
                margin-left: 10px;
                width: calc(100% - 10px);
                border-top: none;
                border-left: none;
                border-right: none;
                border-bottom: solid 1px ${colorPalette.secondColor};
                &:focus {
                  outline: none;
                }
              }
              
            }
            button {
              background-color: ${colorPalette.secondColor};
              border-radius: 10px;
              color: ${colorPalette.white};
              letter-spacing: 0.5px;
              padding: 5px 0;
            }
            .btn-equi label {
              font-size: 34px;

            }
          }
            .boxAction {
            margin-top: 10px;
            display: grid;
            grid-gap: 10px;
            grid-template-columns: repeat(3,1fr);
            .save {
              border: none;
              padding: 15px;
              border-radius: 10px;
              color: ${colorPalette.white};
              background-color: ${colorPalette.blue};
              opacity: 0.8;
              &:hover {
                opacity: 1;
              }
            }
            .delete {
              border: none;
              padding: 15px;
              border-radius: 10px;
              color: ${colorPalette.white};
              background-color: ${colorPalette.accentColor};
              opacity: 0.8;
              &:hover {
                opacity: 1;
              }
            }
            .cancel {
              border: none;
              padding: 15px;
              border-radius: 10px;
              color: ${colorPalette.white};
              background-color: ${colorPalette.secondColor};
              opacity: 0.8;
              &:hover {
                opacity: 1;
              }
            }
          }
        }
      }
    }
`;
