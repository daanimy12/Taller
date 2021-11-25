import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NotificationManager } from "react-notifications";
import { useNotesAction } from "./contextos/contNotes"


const useStyles = makeStyles((theme) => ({

    root: {
        '& .MuiTextField-root': {
            marginLeft: theme.spacing(1),
            marginTop: theme.spacing(2)
        }
    },
    button: {
        margin: theme.spacing(2),
    }

}))

const inicialValues = {
    Cantidad: 1,
    Nombre: '',
    Descripcion: '',
    Precio: 0
};

const VwServices = () => {

    const classes = useStyles();
    const [services, setServices] = useState(inicialValues);
    const { arrayServices, setArrayServices } = useNotesAction();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setServices(prevState => ({
            ...services,
            [name]: value                                                                                     
        }
        ))
    }
    const onCleanFields = () => {
        setServices({
            Cantidad: 1,
            Nombre: '',
            Descripcion: '',
            Precio: 0
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setArrayServices(
            prevState => ([
                ...arrayServices,
                services,
            ]))
        onCleanFields();
        NotificationManager.success("servicio agregado")
    };

    const tooggle = () => {
        if (services.Nombre !== '' && services.Precio > 0) {
            return (
                <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                >send</Button>
            )
        }
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <h5> Servicio </h5>
            <TextField
                hiddenLabel
                name="Nombre"
                label="nombre"
                variant="outlined"
                size="small"
                value={services.Nombre}
                onChange={e => handleChange(e)}
                required
            />
            <TextField
                hiddenLabel
                name="Descripcion"
                label="Descripcion"
                variant="outlined"
                size="small"
                value={services.Descripcion}
                onChange={e => handleChange(e)}
                required
            />
            <TextField
                name="Precio"
                label="precio"
                variant="outlined"
                size="small"
                type="number"
                value={services.Precio}
                onChange={e => handleChange(e)}
                required
            />

            <div className={classes.button}>
                {
                    tooggle()
                }
            </div >
        </form>
    )
}

export default VwServices;