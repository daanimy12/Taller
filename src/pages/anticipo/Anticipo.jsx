import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import Universal from "../../Helpers/Universal";
import AnticipoTable from './AnticipoTable'
import Form from './Form'
import SearchAppBar from './Filtro'
const Anticipo = () => {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [stateEdit, setStateEdit] = useState([]);
    const [q, setQ] = useState("");

    const getAnticipos = async () => {
        try {
            const data = await Universal.ConsultaUniversal('Anticipos');
            setData(data)
        } catch (error) { console.log('error', error) }
    }

    //Datos para enviar a actualizar
    const updateState = (dataEdit) => {
        setStateEdit(dataEdit)
    }

    useEffect(() => {
        getAnticipos();
    }, [])

    const search = (rows) => {
        const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter((row) =>
            columns.some(
                (column) =>
                    row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
            )
        );
    }
    return (
        <Grid container spacing={3}>
            <h4>Anticipos</h4>
            <Grid item xs={12} md={4} lg={12}>
                <Paper>
                    <SearchAppBar value={q} onChange={(e) => setQ(e.target.value)} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={6}>
                <Paper>
                    <Form getAnticipos={getAnticipos} data={stateEdit} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={6}>
                <Paper>
                    <AnticipoTable data={search(data)} updateState={updateState} />
                </Paper>
            </Grid>
        </Grid >
    )

}

export default Anticipo;