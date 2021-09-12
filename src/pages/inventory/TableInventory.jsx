import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Barcode from 'react-barcode';

const TableInventory = (props) => {
    const { className, values, editInventory, onChangeInput, filtro } = props;
    return (
        <div className={className} >
            <div className="typeUser" >
                <div>
                    <input
                        type="radio"
                        id="customRadio1"
                        name='Type'
                        checked={filtro.Type == 'herramienta'}
                        onChange={onChangeInput}
                        value="herramienta"
                    />
                    <label htmlFor="customRadio1"> Herramienta </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="customRadio2"
                        name='Type'
                        checked={filtro.Type == 'refaccion'}
                        onChange={onChangeInput}
                        value="refaccion"
                    />
                    <label htmlFor="customRadio2"> Refacción </label>
                </div>
            </div>
            <table className="table users table-hover">
                <thead>
                    <tr className="table-primary">
                        <td> Imagen </td>
                        <td> Folio </td>
                        <td> Nombre </td>
                        <td> Existencia </td>
                        <td> Precio </td>
                        <td> Descripción </td>
                        <td> Codigo de barras </td>
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
                                                val.img ? (<img src={val.img} alt="photo" style={{ width: 145, height: 105 }} />)
                                                    : null
                                        }
                                    </td>
                                    <td>{val.folio}</td>
                                    <td>{val.names}</td>
                                    <td>{val.amount}</td>
                                    <td>{val.price}</td>
                                    <td>{val.description}</td>
                                        <td>
                                            {
                                                val.barcode ? (<Barcode value={val.barcode}
                                                    background={'#ffffff'}
                                                    fontSize={18}
                                                    margin={15}
                                                    fontOptions={'bold'}
                                                    width={1}
                                                    height={50}
                                                />)
                                                    : null
                                            }
                                        </td>
                                </tr>
                            )
                            ) :
                            <tr key={1} >
                                <td>
                                    -Vacio-
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