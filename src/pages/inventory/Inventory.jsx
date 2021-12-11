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
  const [stateEdit, setStateEdit] = useState({});
  const [filtro, setFiltro] = useState({
    Type: 'herramienta'
  });
  const [progress, setProgress] = useState(true)

  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    setFiltro(prev => ({
      ...prev,
      ...state.length === 0,
      [name]: value,
    }
    ));
  };

  const search = (rows) => rows.filter((row) => row.Type.toLowerCase().indexOf(filtro.Type) > -1);

  const getInvetory = async () => {
    try {
      const items = await Universal.ConsultaUniversal('Inventario');
      const response = items;
      setState(response)
    } catch (error) {
      console.log('error: ', error);
    }

  }

  function todoCake({ Type, amount, barcode, description, folio, img, names, price }) {
    return { Type, amount, barcode, description, folio, img, names, price }
  }


  async function updateURLWithData(values, resetForm) {
    let payload = ('object' == typeof values) && todoCake(values);
    try {
      await Universal.PushImagen("/SAImagenes", payload.img).then((url) => {
        let downloadURL = url[0].toString()
        let newPayload = {
          ...payload, img: downloadURL
        }
        // data with new downloadURL updated
        Universal.UpdateUniversal(`Inventario/${values.Key}`, newPayload)
        NotificationManager.success('success :)');
        getInvetory();
        resetForm();
        setProgress(true);
        setStateEdit({})
      });
    } catch (error) {
      console.log('error update', error)
      NotificationManager.success('error :(');
    }
  }
  //successfully updated
  const updateData = async (values, resetForm) => {
    try {
      let payload = ('object' == typeof values) && todoCake(values);
      if (payload.img.name) {
        updateURLWithData(values, resetForm);
      } else {
        await Universal.UpdateUniversal(`Inventario/${values.Key}`, payload);
        NotificationManager.success('success :)');
        getInvetory();
        resetForm();
        setProgress(true);
        setStateEdit({})
      }
    } catch (error) {
      console.log('error update', error)
      setStateEdit({});
      setProgress(true)
      NotificationManager.error('error :(');
      return error
    }
  }
  //successfully created
  const createNewData = async (values, resetForm) => {
    try {
      // upload Image
      await Universal.PushImagen("/SAImagenes", values.img).then((url) => {
        let downloadURL = url[0].toString()
        const payload = {
          ...values, img: downloadURL
        }
        // create data with downloadURL
        Universal.PushUniversal("Inventario", payload);
        getInvetory();
        setStateEdit({})
        resetForm();
        setProgress(true)
        NotificationManager.success('success');
      });
    } catch (error) {
      console.log('errror create')
      setProgress(true);
      resetForm();
      setStateEdit({})
      NotificationManager.error('error :(');
      return error
    }
  }
  const addOrEdit = (values, resetForm) => {
    setProgress(false)
    if (values.Key) {
      updateData(values, resetForm);
    } else {
      createNewData(values, resetForm);
    }
  }
  const editInventory = (item) => {
    setStateEdit(item)
  }

  const onRemove = async (id, resetForm) => {
    if (id) {
      let isRemove = window.confirm(`Eliminar ${id}`)
      if (isRemove) {
        try {
          let snapShot = firebaseDatabase.ref('Inventario/').child(id);
          snapShot.remove();
          getInvetory();
          setStateEdit({})
          NotificationManager.success("success");
          resetForm();
        } catch (error) {
          console.log('error remove', error)
          setStateEdit({})
          resetForm();
          NotificationManager.error("error :(");
          return error;
        };
      }
    } else {
      NotificationManager.error("seleccione un registro primero");
    }

  }

  useEffect(() => {
    getInvetory();
  }, [])

  const RenderComponents = () => {
    return (
      <main>
        <header> Agregar Herramienta / Refacción </header>
        <section>
          <article>
            <Form addOrEdit={addOrEdit} stateEdit={stateEdit} onRemove={onRemove} progress={progress} />
          </article>
          <article>
            <div className="boxMain">
              <TableInventory values={search(state)} editInventory={editInventory} onChangeInput={onChangeInput} filtro={filtro} />
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
