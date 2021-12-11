import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { NotificationManager } from "react-notifications";
import { makeStyles } from '@material-ui/core/styles';

const inicialValuesF = {
  folio: '',
  barcode: '',
  names: '',
  amount: 0,
  price: 0,
  description: '',
  img: null,
  Type: 'herramienta',
}
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
const Form = (props) => {
  const classes = useStyles();
  const { stateEdit, addOrEdit, onRemove, progress } = props;
  const [state, setState] = useState(inicialValuesF);

  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    setState(prev => ({
      ...prev,
      [name]: value,
    }
    ));
  };

  const resetForm = () => {
    setState(prevState => ({
      ...inicialValuesF
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addOrEdit(state, resetForm)
    } catch (error) {
      console.error('error', error)
    }
  };

  const imageHandler = (e) => {
    const img = e.target.files[0];
    if (img) {
      setState(prev => ({
        ...prev,
        img,
      }));
    }
  };

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      ...stateEdit
    }));
    console.log('montando')
    return () => {
      console.log('Limpiando ')
    }
  }, [stateEdit])


  return (
    <form className="boxMain" onSubmit={handleSubmit}>
      <h2> Datos herramienta / refacción </h2>
      <div className="boxInput" >
        <label> Folio: </label>
        <input
          name="folio"
          value={state.folio}
          onChange={onChangeInput}
          required
        // readOnly
        />
      </div>
      <div className="boxInput" >
        <label> Barcode: </label>
        <input
          name="barcode"
          value={state.barcode}
          onChange={onChangeInput}
          required
        // readOnly
        />
      </div>
      <div className="boxInput" >
        <label> Nombre: </label>
        <input
          name="names"
          value={state.names}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="boxInput" >
        <label> Cantidad: </label>
        <input
          type="number"
          min="0"
          name="amount"
          value={state.amount}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="boxInput" >
        <label> Precio: </label>
        <input
          type="number"
          min="0"
          name="price"
          value={state.price}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="boxInput" >
        <label> Descripción: </label>
        <input
          name="description"
          value={state.description}
          onChange={onChangeInput}
        // required
        />
      </div>
      <div className="typeUser" >
        <div>
          <input
            type="radio"
            id="customRadio1"
            name='Type'
            checked={state.Type === 'herramienta'}
            onChange={onChangeInput}
            value="herramienta"
          />
          <label htmlFor="customRadio1"> Herramienta </label>
        </div>
        <div>
          <input
            type="radio"
            id="customRadio2"
            name='Type'
            checked={state.Type === 'refaccion'}
            onChange={onChangeInput}
            value="refaccion"
          />
          <label htmlFor="customRadio2"> Refacción </label>
        </div>
      </div>
      <div className="boxInput" >
        <label> Imagen: </label>
        <input
          name="img"
          onChange={imageHandler}
          accept="image/*"
          type="file"
        />
      </div>
      {!progress && (<div className="boxAction">
        <label>cargando</label>
        <progress style={{ width: 150, height: 18 }} placeholder="enviando datos..." value={100} />
      </div>)}
      {progress && (
        <div className="boxAction">
          <button
            type="submit"
            className="save"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => onRemove(state.Key, resetForm)}
            className="delete"
          >
            Eliminar
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="cancel">
            Cancelar
          </button>
        </div>
      )}
    </form>
  )
};


export default styled(Form)`
    main {
      
    }
`;
