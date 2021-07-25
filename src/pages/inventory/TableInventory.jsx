import React from "react";
import styled from "styled-components";

const TableInventory = (props) => {
    const { className, values, editInventory } = props;
    
    return (
        <div className={className} >
            <table className="table users table-hover">
                <thead>
                    <tr className="table-primary">
                        <td> Imagen </td>
                        <td> Folio </td>
                        <td> Nombre </td>
                        <td> Existencia </td>
                        <td> Precio </td>
                        <td> Descripción </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        values.length != 0 ?
                        values.map(
                            (val, idx) => (
                                <tr onClick={(e) => editInventory(val)} key={idx}>
                                    <td>
                                        {
                                            val.img != null ? <img src={val.img} alt="photo" style={{ width: 145, height: 105 }} /> : null
                                        }
                                    </td>
                                    <td>{val.folio}</td>
                                    <td>{val.names}</td>
                                    <td>{val.amount}</td>
                                    <td>{val.price}</td>
                                    <td>{val.description}</td>
                                </tr>
                            )
                            ) :
                            <tr key={1} >
                                <td>
                                    tabla vacia...
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

// TableCustomers.propTypes = {
//     className: PropTypes.string,
//     values: PropTypes.array,
//     headers: PropTypes.array,
//     funcSelect: PropTypes.func
// }

// TableCustomers.defaultProps = {
//     className: "",
//     values: [],
//     headers: [],
//     funcSelect: () => { }
// }

export default styled(TableInventory)`
  width: 100%;
`;