import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NotificationManager } from "react-notifications";
import { useNotesAction } from "./contextos/contNotes";
import VwServices from './vwServices'

const MainContainer = styled.main`
  padding: 10px;
  tbody {
    tr {
      cursor: pointer;
    }
  }
`;

const TabDetails = () => {

    const [query, setQuery] = useState("")
    const {
        inventary,
        onChangeInputSelect
    } = useNotesAction();

    const search = (rows) => {
        if (query === "") return;

        const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter((row) =>
            columns.some(
                (column) =>
                    row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
            )
        );
    }
    const handleChange = ({ target }) => {
        const { value } = target;
        setQuery(value);

    }
    return (
        <MainContainer>
            <input type="search" values={query} onChange={handleChange} placeholder="Buscar" />
            <br /><br />
            <h5>Refacciones</h5>
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
                        search(inventary)?.filter(item => item.Type === 'refaccion')?.
                            map(
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
                                                onChange={(e) => onChangeInputSelect(e, val.Key)}
                                            />
                                        </td>
                                    </tr>
                                )
                            )
                    }
                </tbody>
            </table>
            <br /><br />
            {VwServices()}
        </MainContainer>
    )
}
TabDetails.propType = {
    state: PropTypes.object,
    handleChange: PropTypes.func
}
TabDetails.defaultProps = {
    state: "",
    handleChange: () => { }
}
export default TabDetails;