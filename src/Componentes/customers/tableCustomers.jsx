import React from "react";
import styled from "styled-components";
import {PropTypes} from 'prop-types';

const TableCustomers = (props) => {
    const { className, values, funcSelect } = props;
    return (
        <div className={className} >
            <table className="table users table-hover">
                <thead>
                <tr className="table-primary">
                    {/*{this.props.Encabezados}*/}
                    <td> Folio </td>
                    <td> Nombre </td>
                    <td> Dirección </td>
                    <td> Teléfono </td>
                    <td> Modelo </td>
                    <td> Marca </td>
                    <td> Estado </td>
                </tr>
                </thead>
                <tbody>
                    {
                        values.map(
                            val => (
                                <tr onClick={() => funcSelect(val)}>
                                    <td>{ val.invoice }</td>
                                    <td>{ `${val.name} ${val.lastName}` }</td>
                                    <td>{ val.direction }</td>
                                    <td>{ val.phone }</td>
                                    <td>{ val.modelCar }</td>
                                    <td>{ val.brand }</td>
                                    <td>{ val.status === 1 ? "Activo" : "Desactivado" }</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

TableCustomers.propTypes = {
    className: PropTypes.string,
    values: PropTypes.array,
    headers: PropTypes.array,
    funcSelect: PropTypes.func
}

TableCustomers.defaultProps = {
    className: "",
    values: [],
    headers: [],
    funcSelect: () => {}
}

export default styled(TableCustomers)`
  width: 100%;
`;