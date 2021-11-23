import React from 'react';
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from './useTable';
import { useNotesAction } from "./contextos/contNotes";

const headCells = [
    { id: '1', label: 'Cantidad' },
    { id: '2', label: 'Descripcion' },
    { id: '3', label: 'Importe' },
]
const DataProduct = props => {
    const { inventary } = useNotesAction();
    const { TblContainer, TblHead } = useTable(inventary, headCells);
    const response = () => {
        if (inventary.length === 0) {
            return null;
        } else {
            for (let i = 0; i < inventary.length; i++) {
                if (inventary[i].count > 0) {
                    return (<>
                        <h1 className="titleVendor"> Refacciones </h1>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    inventary
                                        ?.filter((inv) => inv.count > 0)
                                        .map((inven, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{inven?.count || 0} </TableCell>
                                                <TableCell>{inven.names} </TableCell>
                                                <TableCell>{inven?.price || 0}</TableCell>
                                            </TableRow>
                                        )
                                        )
                                }
                            </TableBody>
                        </TblContainer>
                    </>)
                }
            }
        }
    }

    return (
        <>
            {response()}
        </>
    );
}
export default DataProduct;