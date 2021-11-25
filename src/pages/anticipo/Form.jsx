import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { NotificationManager } from "react-notifications";
import { makeStyles } from '@material-ui/core/styles';
import Universal from "../../Helpers/Universal";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const inicialValuesF = {
    payDiscount: 0,
    folio: '',
}
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
const Form = (props) => {
    const { data, getAnticipos } = props;
    const classes = useStyles();
    const [state, setState] = useState(inicialValuesF);
    const resetForm = () => {
        setState({ ...inicialValuesF });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            folio,
            Key,
            advance,
            payDiscount
        } = state;
        if (Key) {
            if (window.confirm(`Actualizar registro ${folio}?`)) {
                const payload = { advance: payDiscount };
                await Universal.UpdateUniversal(`Anticipos/${state.Key}`, payload);
                resetForm();
                getAnticipos();
                NotificationManager.success("Nota actualizado")
            };
        } else {
            NotificationManager.error("Seleccione una registro");
        }
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        })
        )

    }
    const str = () => {
        let strng = ''
        if (state.Key) {
            const { advance, total } = state;
            let result = 0;
            result = (advance - total);
            if (result > 0) {
                const positivo = Math.abs(result) === result;
                if (positivo) {
                    strng = 'Devolver $ '
                } else if (!positivo) {
                    strng = 'Acompletar $ '
                }
                return strng
            }
        }
        return strng;
    }
    useEffect(() => {
        setState(prevState => (
            {
                ...prevState,
                ...data
            }))
        str();
    }, [data])

    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.root}>
                <TextField
                    id="outlined-basic"
                    color="primary"
                    label="Folio"
                    name="folio"
                    value={state.folio}
                    onChange={e => onChangeInput(e)}
                    disabled
                />
                <TextField
                    id="outlined-basic"
                    label="Devolver / Acompletar"
                    type="number"
                    min={0}
                    value={state.payDiscount}
                    name="payDiscount"
                    onChange={e => onChangeInput(e)}
                    required
                />
            </div>
            <div className={classes.root}>
                <Button type="submit" variant="outlined" color="primary">
                    Enviar
             </Button>
                <Button variant="outlined" onClick={e => resetForm()} color="secondary">
                    Cancelar
             </Button>
            </div>
        </form>
    )
};


export default styled(Form)`
    main {
      
    }
`;
