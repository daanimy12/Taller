import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import RemoveButton from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Universal from "../../Helpers/Universal";
import { NotificationManager } from "react-notifications";


const useStyles = makeStyles((theme) => ({

    root: {
        '& .MuiTextField-root': {
            marginLeft: theme.spacing(1),
            marginTop: theme.spacing(1)
        }
    },
    button: {
        margin: theme.spacing(1),
    }

}))

const Dsdata = [{
    Folio: '',
    Nombre: '',
    Descripcion: '',
    Precio: ''
}];

const VwServices = () => {

    const classes = useStyles();
    const [services, setServices] = useState(Dsdata);

    const handleChange = (index, event) => {
        const values = [...services];
        values[index][event.target.name] = event.target.value;
        setServices(values)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Universal.PushUniversal("Servicios", services);
            NotificationManager.success("servicio gregado");

        } catch (error) {
            NotificationManager.error('Ocurrió un error');
            console.log('error >', error)
        }

    }

    const handleRemoveServices = (index) => {
        const values = [...services];

        if (index > 0)
            values.splice(index, 1);

        setServices(values);
    };

    const handleAddServices = () => {
        setServices([...services,
        {
            Folio: '',
            Nombre: '',
            Descripcion: '',
            Precio: ''
        }
        ])
    }

    return (
        <>
            <form className={classes.root} onSubmit={handleSubmit}>
                {services.map((service, index) => (
                    <div key={index}>
                        <TextField
                            hiddenLabel
                            name="Folio"
                            label="folio"
                            variant="filled"
                            size="small"
                            value={service.Folio}
                            onChange={event => handleChange(index, event)}
                        />
                        <TextField
                            hiddenLabel
                            name="Nombre"
                            label="nombre"
                            variant="filled"
                            size="small"
                            value={service.Nombre}
                            onChange={event => handleChange(index, event)}
                        />
                        <TextField
                            hiddenLabel
                            name="Descripcion"
                            label="Descripcion"
                            variant="filled"
                            size="small"
                            value={service.Descripcion}
                            onChange={event => handleChange(index, event)}
                        />
                        <TextField
                            hiddenLabel
                            name="Precio"
                            label="precio"
                            variant="filled"
                            size="small"
                            value={service.precio}
                            onChange={event => handleChange(index, event)}
                        />
                        <IconButton
                            onClick={() => handleRemoveServices(index)}
                        >
                            <RemoveButton />
                        </IconButton>
                        <IconButton
                            onClick={handleAddServices}
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                ))}
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                >send</Button>
            </form>
        </>)
}

export default VwServices;