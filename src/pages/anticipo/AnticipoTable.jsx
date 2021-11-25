import React, { useState } from 'react';
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from '../../Componentes/notes/useTable';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const headCells = [
    { id: '1', label: 'Folio' },
    { id: '2', label: 'Fecha' },
    { id: '3', label: 'Anticipo' },
    { id: '4', label: 'Total' },
    { id: '5', label: 'Status' },
]
const AnticipoTable = props => {
    const { data, updateState } = props;
    const { TblContainer, TblHead } = useTable(data, headCells);

    const responseColor = (a, b) => {
        let res = 0;

        const result = (a - b);
        const positivo = Math.abs(result) === result;

        return res = positivo ?
            (<Tooltip TransitionComponent={Zoom} title="Devolver">
                <Button variant="outlined" color="primary" value={result} >{`$ ${result}`}</Button></Tooltip>) :
            (<Tooltip TransitionComponent={Zoom} title="Acompletar"><Button variant="outlined" color="secondary" value={result}>{`$ ${result}`}</Button></Tooltip >);
    }

    const response = () => {
        return (<>
            {/* <h1 className="titleVendor"> Refacciones </h1> */}
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        data?.map((item, i) => (
                            <TableRow key={i} onClick={(e) => updateState(item)}>
                                <TableCell>{item?.folio} </TableCell>
                                <TableCell>{item?.createdAt} </TableCell>
                                <TableCell>{`$ ${item?.advance}`}</TableCell>
                                <TableCell>{`$ ${item?.total}`}</TableCell>
                                <TableCell>{responseColor(item?.advance, item?.total)}</TableCell>
                            </TableRow>
                        )
                        )
                    }
                </TableBody>
            </TblContainer>
        </>)
    }

    return (
        <>
            {response()}
        </>
    );
}
export default AnticipoTable;