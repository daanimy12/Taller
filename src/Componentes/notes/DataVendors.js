import React, { useEffect, useState } from 'react';
import { useNotesAction } from "./contextos/contNotes"
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from './useTable';



const headCells = [
    { id: '1', label: 'Folio' },
    { id: '2', label: 'Marca' },
    { id: '3', label: 'Importe' },
]
const DataVendors = () => {
    const { arrayVendors } = useNotesAction();
    const { TblContainer, TblHead } = useTable(arrayVendors, headCells);


    const handleVendor = () => {
        if (arrayVendors.length === 0) {
            return null;
        } else {
            return (<>
                <h1 className="titleVendor"> Provedores </h1>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            arrayVendors.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell> {item?.folio || 0}  </TableCell>
                                    <TableCell>{item.name}  </TableCell>
                                    <TableCell>{item?.invoiceAmount || 0}</TableCell>
                                </TableRow>
                            )
                            )
                        }
                    </TableBody>
                </TblContainer>
            </>)
        }
    }
    return (
        <>
            {handleVendor()}
        </>
    )
}

export default DataVendors;
