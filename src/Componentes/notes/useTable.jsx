import React from 'react';
import { Table, TableHead, TableRow, TableCell, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: 'black',
            backgroundColor: '#f4f6f9'
        },
        '& tbody td': {
            fontWeight: '300'
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffeff',
            cursor: 'pointer',
        },
    }
}))

const useTable = (records, headCells) => {
    const classes = useStyles();
    /*  const data = records.map((row, index) => {
          let rowData = [];
          let i = 0;
          for (const key in row) {
              rowData.push({
                  key: headingColumns[i],
                  val: row[key]
              })
              i++
          }
  
          return <tr>
              {rowData.map((data, index) => <td key={index}>{data.val}</td>)}
          </tr>
      })
  */

    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = props => {
        return (<TableHead>
            <TableRow>
                {headCells.map((headCell, i) => (
                    <TableCell key={i}>
                        {headCell.label}
                    </TableCell>
                ))
                }
            </TableRow>
        </TableHead>)
    }

    return {
        TblContainer,
        TblHead
    }

}
export default useTable;
