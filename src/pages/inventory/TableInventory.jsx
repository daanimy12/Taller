import React from "react";
import styled from "styled-components";

const TableInventory = (props) => {
    const { className, values } = props;

    return (
        <div className={className} >
            <table className="table users table-hover">
                <thead>
                    <tr className="table-primary">
                        <td> Folio </td>
                        <td> Nombre </td>
                        <td> Cantidad </td>
                        <td> Descripción </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        values.map(
                            (val, idx) => (
                                <tr key={idx}>
                                    <td>{val.folio}</td>
                                    <td>{val.names}</td>
                                    <td>{val.amount}</td>
                                    <td>{val.description}</td>
                                </tr>
                            )
                        )
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