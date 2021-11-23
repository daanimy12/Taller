import React from "react";
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";
import { useNotesAction } from "./contextos/contNotes";
import { NotificationManager } from "react-notifications";


const MainContainer =  styled.form`
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  section {
    grid-gap: 10px;
    grid-template-columns: 50% calc(50% - 20px);
    height: 30px !important;
    align-items: center;
  }
  button {
    width: 100%;
    border: none;
    background-color: ${colorPalette.secondColor};
    color: ${colorPalette.white};
    font-size: 16px;
    border-radius: 10px;
    letter-spacing: 1px;
    margin-top: 10px;
  }
`;

const TabVendors = () => {
    const {
        arrayVendors, setArrayVendors, onSaveData
    } = useNotesAction()
    const [state,setState] = React.useState(
        {
            folio: '',
            name: '',
            invoiceAmount: '',
        }
    );
    const onClear = () => {
        setState(
            {
                folio: '',
                name: '',
                invoiceAmount: '',
            }
        )
    }
    const onChangeState = ({ target }) => {
        const { id, value } = target;
        setState(
            prev => ({
                ...prev,
                [id]: value
            })
        )
    }
    const onSave = async (e) => {
        e.preventDefault()
        setArrayVendors([
            ...arrayVendors,
            state
        ]);
        NotificationManager.success("succees")
        onClear();
    }
    return (
            <MainContainer onSubmit={onSave} >
                <section>
                    <label htmlFor="folio">
                        Folio de Factura :
                    </label>
                <input id="folio" value={state.folio} onChange={onChangeState} required />
                </section>
                <section>
                    <label htmlFor="name" > Nombre de la marca / empresa </label>
                <input id="name" value={state.name} onChange={onChangeState} required />
                </section>
                <section>
                    <label htmlFor="name" > Monto de la factura</label>
                <input id="invoiceAmount" value={state.invoiceAmount} onChange={onChangeState} required />
                </section>
                <button type="submit" > Guardar </button>
                <button type="button" onClick={onSaveData}> Guardar Nota  </button>
            </MainContainer>
    )
}

export default TabVendors;