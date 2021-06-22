import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";

const inicialValuesF = {
  folio: '',
  names: '',
  amount: 0,
  description: '',
}

const Form = (props) => {
  const { inventoryEdit, addOrEdit } = props;
  const [state, setState] = useState(inicialValuesF);

  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    setState(prev => ({
      ...prev,
      [name]: value,
    }
    ));
  };
  const resetForm = () => {
    setState({ ...inicialValuesF });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEdit(state, resetForm);
  };

  useEffect(() => {
    if (inventoryEdit != null) {
      setState({
        ...inventoryEdit,
      });
    }
  }, [inventoryEdit])

  return (
    <form className="boxMain" onSubmit={handleSubmit}>
      <h2> Datos </h2>
      <div className="boxInput" >
        <label> Folio: </label>
        <input
          name="folio"
          value={state.folio}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="boxInput" >
        <label> Nombre: </label>
        <input
          name="names"
          value={state.names}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="boxInput" >
        <label> Cantidad: </label>
        <input
          type="number"
          min="0"
          name="amount"
          value={state.amount}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="boxInput" >
        <label> Descripción: </label>
        <input
          name="description"
          value={state.description}
          onChange={onChangeInput}
          required
        />
      </div>
      <button type="submit"> Aceptar </button>
    </form>
  )
};


export default styled(Form)`
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
          }
        }
      }
    }
`;
