import React from 'react';
import {firebaseDatabase} from '../../system/model/firebase/firebase';
import CryptoJS from 'crypto-js';
import PreloadC from '../../Componentes/PreloadCarga';
import Universal from '../../Helpers/Universal';
import ModalUniversal from '../../Helpers/ModalUniversal';
import Preload from '../../Componentes/Preload';
import styled from "styled-components"
import {NotificationManager} from "react-notifications";
import {colorPalette} from "../../system/styles/styles";


const MainContainer = styled.main`
  width: calc(100vw - 300px);
  height: 100vh;
  display: flex;
  gap: 10px;
  flex-direction: column;
  header {
    font-family: ${colorPalette.fontMain};
    font-size: 24px;
    margin: 10px 0 0 10px;
  }
  h2 {
    font-family: ${colorPalette.fontMain};
    font-size: 20px;
    text-transform: uppercase;
  }
  section {
    display: grid;
    grid-template-columns: 40% 60%;
    width: 100%;
    height: 100%;
    article {
      width: 90%;
      height: 80vh;
      overflow: auto;
      box-shadow: ${colorPalette.boxShadowLigth};
      background-color: ${colorPalette.white};
      padding: 10px;
      border-radius: 10px;
      justify-self: center;
      align-self: center;
      .boxInput {
        display: grid;
        grid-template-columns: 20% 75%;
        justify-items: center;
        align-items: center;
        gap: 15px;
        margin-top: 15px;
        label {
          font-family: ${colorPalette.fontMain};
          font-size: 18px;
          font-weight: 400;
        }

        input {
          margin-left: 10px;
          width: calc(100% - 10px);
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: solid 1px ${colorPalette.secondColor};
          &:focus {
            outline: none;
          }
        }

      }
    }
  }
  .typeUser {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin: 15px 0;
    justify-items: center;
    input {
      margin-right: 10px;
    }
  }
  .boxAction {
    margin-top: 10px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(3,1fr);
    .save {
      border: none;
      padding: 15px;
      border-radius: 10px;
      color: ${colorPalette.white};
      background-color: ${colorPalette.blue};
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    .delete {
      border: none;
      padding: 15px;
      border-radius: 10px;
      color: ${colorPalette.white};
      background-color: ${colorPalette.accentColor};
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    .cancel {
      border: none;
      padding: 15px;
      border-radius: 10px;
      color: ${colorPalette.white};
      background-color: ${colorPalette.secondColor};
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`;

const User = () => {
    const textInput = React.createRef();
    const [state,setState] = React.useState({
        TablaVacia: true,
        ModalBoolean: false,
        Tipo: 'Vendedor',
        TitleButtonDeAc: 'Desactivar',
        pass: '',
        nombre: '',
        AP: '',
        AM: '',
        usuario: '',
        KeyModi:null,
        PassCa: false,
        listaFinal:[],
        Conexion:false
    });

    const CargarModificacion=(valor)=>{
        setState(prev=>(
            {
                ...prev,
                Tipo: valor.Tipo,
                TitleButtonDeAc: valor.Estado ? 'Desactivar':'Activar',
                pass: '',
                nombre: valor.Nombre,
                AP: valor.ApellidoPa,
                AM: valor.ApellidoMa,
                usuario: valor.Usuario,
                KeyModi:valor.Key
            }
        ));
    };

    const CargarLista=(valor)=>{
        let ArraTemp=[];
        valor.forEach((ele,index)=>{
            ArraTemp.push(<tr onClick={(e) => CargarModificacion(ele)} key={index} className="table-light border-bottom">
                <th>{ele.Nombre}</th>
                <th>{ele.Usuario}</th>
                <th>{ele.Tipo}</th>
                <th>{ele.Estado ? 'Activo':'Inactivo'}</th>
            </tr>);
        });
        setState( prev => ({ ...prev,listaFinal:ArraTemp}));
    };

    const Consulta=()=>{
        firebaseDatabase.ref('Usuarios').on('value',(sna)=>{
            let temp2 = [];
            sna.forEach(child => {
                let tem = child.val();
                tem.Key = child.key;
                temp2 = temp2.concat(tem);
            });
            setState(prev =>({ ...prev,TablaVacia:false}));
            CargarLista(temp2);
        });
    };

    React.useEffect(
        () => {
            document.title = `Usuarios`;
            Consulta();
        }, []
    );

    const cancel =()=>{
        setState(
            prev =>
                (
                    {
                        ...prev,
                        Tipo: 'Vendedor',
                        TitleButtonDeAc: 'Desactivar',
                        pass: '',
                        nombre: '',
                        AP: '',
                        AM: '',
                        usuario: '',
                        KeyModi:null
                    }
                )
        );
    };
    const getBoolean= (r) => {
        setState(prev => ({ ...prev,ModalBoolean:r}));
        cancel();
    }
    const onChangeInput = ({ target }) => {
        const { value, name } = target;
        setState(prev => ({...prev,[name]: value}));
    };
    const Encriptar = (Json) => {
        let ciphertext = CryptoJS.SHA256(Json);
        return ciphertext.toString();
    };
    const onSave = async () => {
        setState( prev => ({...prev,Conexion:true}));
        const {
            nombre,
            AM,
            AP,
            usuario,
            KeyModi,
            pass,
            Tipo
        } = state;
        if(nombre !== '' && AM !== '' && AP !== '' && usuario !== '' && KeyModi === null){
            firebaseDatabase.ref('Usuarios').orderByChild('Usuario').equalTo(usuario).once('value').then(sna=>{
                if(sna.val() === null){
                    let Aleatoria =    Universal.GenerarP(8);
                    let passFIn =  (pass !== '') ? Encriptar(pass) : Encriptar(Aleatoria);
                    if(pass === '')setState(prev =>({ ...prev, ModalBoolean: true,PassCa:Aleatoria}));
                    firebaseDatabase.ref('Usuarios').push({
                        Nombre: nombre,
                        ApellidoPa: AP,
                        ApellidoMa: AM,
                        Usuario: usuario,
                        Pass: passFIn,
                        Tipo: Tipo,
                        Estado: true
                    });
                    cancel();
                    setState( prev => ({ ...prev, Conexion:false}));
                }else{
                    setState(prev => ({ ...prev, Conexion:false}));
                    NotificationManager.error('El usuario ya existe');
                }

            });
        }else if(
            nombre !== '' &&
            AM !== '' &&
            AP !== '' &&
            usuario !== '' &&
            KeyModi !== null){
            let Datos;
            if(pass !== ''){
                Datos ={
                    Nombre: nombre,
                    ApellidoPa: AP,
                    ApellidoMa: AM,
                    Usuario: usuario,
                    Pass: Encriptar(pass),
                    Tipo: Tipo
                }
            }else{
                Datos ={
                    Nombre: nombre,
                    ApellidoPa: AP,
                    ApellidoMa: AM,
                    Usuario: usuario,
                    Tipo: Tipo
                }
            }

            try {
                await firebaseDatabase.ref('Usuarios/'+this.state.KeyModi).update(Datos);
                setState(prev=> ({...prev,Conexion: false}));
                NotificationManager.success("Usuario Modificado");
            } catch (e) {
                NotificationManager.error('Error en su conexión');
            }
            cancel();
        }else{
            setState(prev => ({ ...prev, Conexion:false}));
            NotificationManager.error('Datos incompletos');
        }
    };

    const deleteUser = async ()=>{
        setState(prev => ({ ...prev,Conexion:true}));
        if(state.KeyModi !== null){
            try {
                let ValorAE;
                (state.TitleButtonDeAc === "Desactivar") ? ValorAE = false : ValorAE = true;
                await firebaseDatabase.ref('Usuarios/'+state.KeyModi).update({Estado:ValorAE});
                setState( prev => ({ ...prev, Conexion: false }) );
                NotificationManager.success('Usuario Modificado');
            }catch (e) {
                NotificationManager.error('Error en su conexión');
                setState(prev => ({ ...prev,Conexion:false}));
            }
            cancel();
        }else{
            setState(prev => ({ ...prev,Conexion:false}));
            NotificationManager.error('Seleccione un Usuario');
        }
    };


    const Tabla  =
        state.TablaVacia
            ?  <Preload/>
            : (
                <section>
                    <article>
                        <h2> Datos Personales </h2>
                        <form>
                            <div className="boxInput" >
                                <label> Nombre: </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    ref={textInput}
                                    value={state.nombre}
                                    onChange={onChangeInput}
                                    placeholder="Nombre"
                                />
                            </div>
                            <div className="boxInput" >
                                <label> Ap. Paterno: </label>
                                <input
                                    type="text"
                                    value={state.AP}
                                    onChange={onChangeInput}
                                    name='AP'
                                    placeholder="Apellido Paterno"
                                />
                            </div>
                            <div className="boxInput" >
                                <label> Ap. Materno: </label>
                                <input
                                    type="text"
                                    value={state.AM}
                                    onChange={onChangeInput}
                                    name='AM'
                                    placeholder="Apellido Materno"
                                />
                            </div>
                            <div className="boxInput" >
                                <label> Usuario: </label>
                                <input
                                    type="text"
                                    value={state.usuario}
                                    onChange={onChangeInput}
                                    name='usuario'
                                    placeholder="Usuario"
                                />
                            </div>
                            <div className="boxInput" >
                                <label> Contraseña: </label>
                                <input
                                    value={state.pass}
                                    onChange={onChangeInput}
                                    name='pass'
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="typeUser" >
                                <div>
                                    <input
                                        type="radio"
                                        id="customRadio1"
                                        name='Tipo'
                                        checked={state.Tipo === 'Administrador'}
                                        onChange={onChangeInput}
                                        value="Administrador"
                                    />
                                    <label htmlFor="customRadio1"> Administrador</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="customRadio2"
                                        name='Tipo'
                                        checked={state.Tipo === 'Vendedor'}
                                        onChange={onChangeInput} value="Vendedor"
                                    />
                                    <label
                                        htmlFor="customRadio2"
                                    >
                                        Vendedor
                                    </label>
                                </div>
                            </div>
                            <div className="boxAction">
                                <button
                                    type="button"
                                    onClick={onSave}
                                    className="save"
                                >
                                    Aceptar
                                </button>

                                <button
                                    type="button"
                                    onClick={deleteUser}
                                    className="delete"
                                >
                                    {state.TitleButtonDeAc}
                                </button>

                                <button
                                    type="button"
                                    onClick={cancel}
                                    className="cancel">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </article>
                    <article>
                        <div className="table-responsive TablaU">
                            <table className="table users table-hover">
                                <thead>
                                <tr className="table-primary">
                                    <th>Nombre</th>
                                    <th>Usuario</th>
                                    <th>Tipo</th>
                                    <th>Estado</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {state.listaFinal}
                                </tbody>
                            </table>
                        </div>
                    </article>
                </section>
            );
    return (
        <>
            {state.Conexion ? <PreloadC/>:null}
            <ModalUniversal
                Open = {state.ModalBoolean}
                Titulo={'Contraseña para el usuario '+state.usuario+":"}
                Contenido={
                    <div className='col-12 row' style={{margin: '0%'}}>
                        <div className="col-12" style={{padding:'0%'}}>
                            <label className="sr-only" htmlFor="inlineFormInputGroup">Password:</label>
                            <div className="input-group mb-2" style={{ marginBottom: "10px" }}>
                                <h1>{state.PassCa}</h1>
                            </div>
                        </div>
                    </div>}
                getBolean={getBoolean}
            />
            <MainContainer>
                <header> Agregar Usuarios</header>
                {Tabla}
            </MainContainer>
        </>
    );

}

export default User;
