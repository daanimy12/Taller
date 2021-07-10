import React from "react";
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";
import PropTypes from "prop-types";
import Universal from "../../Helpers/Universal";
import {NotificationManager} from "react-notifications";
import {useNotesAction} from "./contextos/contNotes";

const MainContainer = styled.main`
  padding: 10px;
  tbody {
    tr {
      cursor: pointer;
    }
  }
`;

const TabDetails = () => {
    const {
        inventary,
        onChangeInputSelect
    } = useNotesAction();



    return (
        <MainContainer>
            <table className="table users table-hover">
                <thead>
                    <tr>
                        <td> Folio </td>
                        <td> Nombre </td>
                        <td> Existencia </td>
                        <td> Descripción </td>
                        <td> Cantidad </td>
                    </tr>
                </thead>
                <tbody>
                {
                    inventary?.map(
                        (val, idx) => (
                            <tr key={idx}>
                                <td>{val.folio}</td>
                                <td>{val.names}</td>
                                <td>{val.amount}</td>
                                <td>{val.description}</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        min={0}
                                        value={val.count || 0}
                                        onChange={(e) => onChangeInputSelect(e,val.Key)}
                                    />
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </MainContainer>
    )
}
TabDetails.propType = {
    state: PropTypes.object,
    handleChange: PropTypes.func
}
TabDetails.defaultProps = {
    state: "",
    handleChange: () => {}
}
export default TabDetails;