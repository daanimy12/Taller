import React from 'react';
import styled from "styled-components";
import { firebaseDatabase } from '../../system/model/firebase/firebase';
import Alert from 'react-s-alert';
import { colorPalette } from "../../system/styles/styles"
import HelperLogin from '../../Helpers/Login';
import { NotificationManager } from "react-notifications";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        marginTop: theme.spacing(8),
        maxWidth: 345,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const Loggin = (props) => {
    const classes = useStyles();
    const formRef = React.useRef();
    const { className } = props;
    const [state, setState] = React.useState({
        email: '',
        password: '',
        title: ""
    });

    const HelpersLogin = HelperLogin();


    React.useEffect(
        () => {
            document.title = `Loggin`;
            const datos = HelpersLogin.Desencriptar();
            console.log(datos)
            if (datos !== false) revisador(datos);
        }, []);


    const validar = async () => {
        try {
            const { email, password } = { ...state }
            console.log(state)
            const snapshot = await firebaseDatabase.ref('Usuarios').orderByChild('Usuario').equalTo(email).once('value');
            const validarPassWord = await HelpersLogin.Validar(snapshot, password);
            console.log(validarPassWord);
            if (validarPassWord === false) error();
            if (validarPassWord.boolean === true) success(validarPassWord);
        } catch (e) {
            error_inesperado();
        }
    }

    const revisador = (data = '') => {
        const e = JSON.parse(data);
        firebaseDatabase.ref('Usuarios').orderByChild('Usuario').equalTo(e.Usuario).once('value').then(function (snapshot) {
            return snapshot;
        }).then(i => {
            return HelpersLogin.Validar_Observador(i, e)
        }).then(i => {
            if (i === true) success_observador(e.Tipo);
            if (i === false) error_observador();
        })
    }

    const updatestate = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        console.log(state)
        setState(prev => ({ ...prev, [name]: value }));
    };

    const onKeyPress = e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            validar().then();
        }
    }



    const success = (i = []) => {
        HelpersLogin.Encriptar(i);
        if (i.Tipo === 'Vendedor') {
            HelpersLogin.CambioURL('/Customers/Venta')
        } else {
            HelpersLogin.CambioURL('/Customers/Clientes')
        }
    }

    const success_observador = (date = '') => {
        // console.log(date)
        if (date === 'Vendedor') {
            HelpersLogin.CambioURL('/Customers/Venta')
        } else {
            HelpersLogin.CambioURL('/Customers/Clientes')
        }
    }

    const error_inesperado = () => {
        setState(prev => ({ ...prev, title: 'Error Inesperado' }));
        NotificationManager.error('Error Inesperado', "", 3000);
    }

    const error_observador = () => {
        HelpersLogin.Eliminar();
    }

    const error = () => {
        setState(prev => ({ title: 'Usuario o contraseña erroneas' }, () => {
            Alert.error(state.title, {
                position: 'top',
                effect: 'slide',
                timeout: 1000
            })
        }))
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Card className={classes.root} elevation={5}>
                <CardContent>
                    <div className={classes.paper} >
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sánchez Automotriz
                        </Typography>
                        <form className={classes.form} id="form" ref={formRef}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={updatestate}
                                value={state.email}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onKeyPress={onKeyPress}
                                value={state.password}
                                onChange={updatestate}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={validar}
                            >
                                Iniciar sesión
                        </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );

}

export default styled(Loggin)`
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: rgba(0,0,0,.16);
  form {
    height: 453px;
    width: 860px;
    background-color: ${colorPalette.white};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding:30px 10px 10px 10px;
    img {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      object-position: center;
      object-fit: cover;
      margin: 0px auto;
    }
    label {
      font-size: 20px;
      font-family: ${colorPalette.fontMain};
    }
    input {
      border: none;
      background: none;
      border-bottom: 1px solid ${colorPalette.black};
      &:focus {
        outline: none;
      }
    }
    
    button {
      width: 50%;
      min-height: 30px;
      margin: 0 auto;
      color: ${colorPalette.black};
      border-radius: 10px;
      background-color: ${colorPalette.colorMain};
      border: none;
      color: ${colorPalette.white}
    }
  }
`;