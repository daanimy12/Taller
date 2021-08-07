import React from 'react';
import styled from "styled-components";
import Usuarios from '../user/Usuarios';
import NoteContainer from "../notes/noteContainer"
import Inventory from '../inventory/Inventory';
import Venta from '../../Componentes/Venta';
import Venta_Directa from '../../Componentes/Venta_Directa';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../../Helpers/Login';
import Cliente from '../customers';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AappBar from '../appBar/AappBar';
import Ddrawer from '../drawer/Ddrawer';
import Estatistic from '../statistics/Estatistic';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const Customers = (props) => {
    const { className } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [state,setState] = React.useState({
        TipoClient: null
    });
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const {
        CambioURL,
        Desencriptar,
        EncriptarG
    } = Login();

    React.useEffect(() => {
            const Validado = JSON.parse(Desencriptar());
            if (Validado !== false) {
                window.localStorage.setItem('TipoC', EncriptarG({'Tipo': Validado.Tipo}));
                setState(prev => ({...prev,TipoClient: Validado.Tipo}))
            } else {
                CambioURL('/');
            }
        },[]);


        const Rutas = (state.TipoClient === 'Administrador') ?
            <Switch>
                <Route path='/Customers/Usuarios' component={Usuarios} />
                <Route path='/Customers/Clientes' component={Cliente} />
                <Route path='/Customers/Notas' component={NoteContainer} />
                <Route path='/Customers/Inventario' component={Inventory} />
                <Route path='/Customers/Estadisticas' component={Estatistic} />
            </Switch>
            :
            <Switch>
                <Route path='/Customers/Venta' component={Venta}/>
                <Route path='/Customers/Venta_Directa' component={Venta_Directa}/>
            </Switch>;
        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <CssBaseline />
                    <AappBar handleDrawerOpen={handleDrawerOpen} open={open} />
                    <Ddrawer handleDrawerClose={handleDrawerClose} open={open} TipoClient={state.TipoClient} />
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="lg" className={classes.container}>
                        {Rutas}
                            <Box pt={4}>
                                <Copyright />
                            </Box>
                        </Container>
                    </main>
            </div>
            </BrowserRouter>
        );

}

export default  styled(Customers)`
  display: grid;
  grid-template-columns: 250px calc(100% - 250px);
  #Fondo {
    width: 100%;
    height: 100vh;
  }
  .containerMain {
    height: 100vh;
    overflow: auto;
  }
`;
