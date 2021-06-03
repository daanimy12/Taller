import React, {Component} from 'react';
import {firebaseDatabase} from '../Conexion/fire';
import CryptoJS from 'crypto-js';
import Alert from 'react-s-alert';
import '../system/styles/Usuario.css';
import PreloadC from '../Componentes/PreloadCarga';
import Universal from '../Helpers/Universal';
import ModalUniversal from '../Helpers/ModalUniversal';
import Preload from './Preload';

class Usuarios extends Component {
    textInput = React.createRef();
    state = {
        TablaVacia: true,ModalBoolean:false,
        Tipo: 'Vendedor', TitleButtonDeAc: 'Desactivar', pass: '', nombre: '', AP: '', AM: '', usuario: '',KeyModi:null,PassCa: false,
        listaFinal:[],Conexion:false
    };
    getBoolean=(r)=>{
        this.setState({ModalBoolean:r});
        this.Cancelar();
    }
    CambioInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };
    Encriptar = (Json) => {
        let ciphertext = CryptoJS.SHA256(Json);
        return ciphertext.toString();
    };
    Aceptar = () => {
        this.setState({Conexion:true});
        if(this.state.nombre !== '' && this.state.AM !== '' && this.state.AP !== '' && this.state.usuario !== '' && this.state.KeyModi === null){
            firebaseDatabase.ref('Usuarios').orderByChild('Usuario').equalTo(this.state.usuario).once('value').then(sna=>{

                if(sna.val() === null){
                    let Aleatoria =    Universal.GenerarP(8);
                    let passFIn =  (this.state.pass !== '') ?  this.Encriptar(this.state.pass) : this.Encriptar( Aleatoria);
                    if(this.state.pass === '')this.setState({ModalBoolean: true,PassCa:Aleatoria});
                    firebaseDatabase.ref('Usuarios').push({
                        Nombre: this.state.nombre,
                        ApellidoPa: this.state.AP,
                        ApellidoMa: this.state.AM,
                        Usuario: this.state.usuario,
                        Pass: passFIn,
                        Tipo: this.state.Tipo,
                        Estado: true
                    });
                    this.Cancelar();
                    this.setState({Conexion:false});
                }else{
                    this.setState({Conexion:false});
                    this.Alerta('El usuario ya existe');
                }

            }).catch(sna=>{
                //console.log(sna)
            });


        }else if(this.state.nombre !== '' && this.state.AM !== '' && this.state.AP !== '' && this.state.usuario !== '' &&
            this.state.KeyModi !== null){
            let Datos;
            if(this.state.pass !== ''){
                Datos ={
                    Nombre: this.state.nombre,
                    ApellidoPa: this.state.AP,
                    ApellidoMa: this.state.AM,
                    Usuario: this.state.usuario,
                    Pass: this.Encriptar(this.state.pass),
                    Tipo: this.state.Tipo
                }
            }else{
                Datos ={
                    Nombre: this.state.nombre,
                    ApellidoPa: this.state.AP,
                    ApellidoMa: this.state.AM,
                    Usuario: this.state.usuario,
                    Tipo: this.state.Tipo
                }
            }

            firebaseDatabase.ref('Usuarios/'+this.state.KeyModi).update(Datos).then(()=> {
                this.setState({Conexion: false});
                this.Alerta('Usuario Modificado', true)
            }).catch(()=>
                this.Alerta('Error en su conexión',false)
            );

            this.Cancelar();
        }else{
            this.setState({Conexion:false});
            this.Alerta('Datos incompletos',false)
        }
    };
    CargarModificacion=(valor)=>{
        this.textInput.current.focus();
        this.setState({ Tipo: valor.Tipo, TitleButtonDeAc: valor.Estado ? 'Desactivar':'Activar',
            pass: '', nombre: valor.Nombre, AP: valor.ApellidoPa, AM: valor.ApellidoMa, usuario: valor.Usuario,KeyModi:valor.Key});
    };
    CargarLista=(valor)=>{
        let ArraTemp=[];
        valor.forEach((ele,index)=>{
            ArraTemp.push(<tr onClick={(e) => this.CargarModificacion(ele)} key={index} className="table-light border-bottom">
                <th>{ele.Nombre}</th>
                <th>{ele.Usuario}</th>
                <th>{ele.Tipo}</th>
                <th>{ele.Estado ? 'Activo':'Inactivo'}</th>
            </tr>);
        });
        this.setState({listaFinal:ArraTemp});
    };
    Consulta=()=>{
        firebaseDatabase.ref('Usuarios').on('value',(sna)=>{
            let temp2 = [];
            sna.forEach(child => {
                let tem = child.val();
                tem.Key = child.key;
                temp2 = temp2.concat(tem);
            });
            this.setState({TablaVacia:false});

            this.CargarLista(temp2);
        });
    };
    Cancelar=()=>{
        this.setState({Tipo: 'Vendedor', TitleButtonDeAc: 'Desactivar', pass: '', nombre: '', AP: '', AM: '',
            usuario: '',KeyModi:null});
    };
    Eliminar=()=>{
        this.setState({Conexion:true});

        if(this.state.KeyModi !== null){
            let ValorAE;
            (this.state.TitleButtonDeAc === "Desactivar") ? ValorAE = false : ValorAE = true;
            firebaseDatabase.ref('Usuarios/'+this.state.KeyModi).update({Estado:ValorAE}).then(()=> {


                this.setState({Conexion: false});
                this.Alerta('Usuario Modificado', true)
            }).catch(()=> {
                this.Alerta('Error en su conexión', false)
                this.setState({Conexion:false});
            });
            this.Cancelar();
        }else{
            this.setState({Conexion:false});
            this.Alerta('Seleccione un Usuario',false);
        }
    };
    componentWillMount() {
        document.title = `Usuarios`;
        this.Consulta();
    }

    Alerta=(variable,tipo,tiempo=1000)=>{
        tipo ? Alert.success(variable, {
            position: 'top-right',
            effect: 'bouncyflip',
            timeout: tiempo
        }): Alert.error(variable, {
            position: 'top-right',
            effect: 'bouncyflip',
            timeout: tiempo
        });
    };

    render() {
        const Tabla  = this.state.TablaVacia ?  <Preload/>:

            <div className="col-12 "><div className="row"> <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <ModalUniversal Open = {this.state.ModalBoolean} Titulo={'Contraseña para el usuario '+this.state.usuario+":"}
                            Contenido={<div className='col-12 row' style={{margin: '0%'}}>
                <div className="col-12" style={{padding:'0%'}}>
                    <label className="sr-only" htmlFor="inlineFormInputGroup">Password:</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Password</div>
                        </div>
                        <h1>{this.state.PassCa}</h1>
                    </div>
                </div>

            </div>} getBolean={this.getBoolean}
            />
            <h1> Agregar Usuarios</h1>
            <form>

                <div className="col-auto">
                    <label className="sr-only" htmlFor="inlineFormInputGroup">Nombre:</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Nombre</div>
                        </div>
                        <input ref={this.textInput} value={this.state.nombre} onChange={this.CambioInput}
                               name='nombre'
                               type="text" className="form-control" placeholder="Nombre"/>
                    </div>
                </div>

                <div className="col-auto">
                    <label className="sr-only" htmlFor="inlineFormInputGroup">AP:</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Apellido</div>
                        </div>
                        <input value={this.state.AP} onChange={this.CambioInput} name='AP'
                               type="text" className="form-control" placeholder="Apellido Paterno"/>
                    </div>
                </div>

                <div className="col-auto">
                    <label className="sr-only" htmlFor="inlineFormInputGroup">AM:</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Apellido</div>
                        </div>
                        <input value={this.state.AM} onChange={this.CambioInput} name='AM'
                               type="text" className="form-control" placeholder="Apellido Materno"/>
                    </div>
                </div>

                <div className="col-auto">
                    <label className="sr-only" htmlFor="inlineFormInputGroup">Usuario:</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Usuario</div>
                        </div>
                        <input value={this.state.usuario} onChange={this.CambioInput} name='usuario' type="text"
                               className="form-control" placeholder="Usuario"/>
                    </div>
                </div>

                <div className="col-auto">
                    <label className="sr-only" htmlFor="inlineFormInputGroup">Contraseña:</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Contras</div>
                        </div>
                        <input value={this.state.pass} onChange={this.CambioInput} name='pass' type="password"
                               className="form-control" placeholder="Password"/>
                    </div>
                </div>


                <fieldset className="col-auto">
                    <div className="AliniarXL col-xs-12 col-sm-10 row">

                        <div className="custom-control custom-radio ra">
                            <input type="radio" id="customRadio1"
                                   name='Tipo' checked={this.state.Tipo === 'Administrador'}
                                   onChange={this.CambioInput} value="Administrador"
                                   className="custom-control-input"/>
                            <label className="custom-control-label"
                                   htmlFor="customRadio1"> Administrador</label>
                        </div>

                        <div className="custom-control custom-radio ra">
                            <input type="radio" id="customRadio2"
                                   name='Tipo' checked={this.state.Tipo === 'Vendedor'}
                                   onChange={this.CambioInput} value="Vendedor"
                                   className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor="customRadio2"> Vendedor</label>
                        </div>


                    </div>
                </fieldset>
                <div className="form-group Botones col-auto">
                    <div>
                        <button type="button" onClick={this.Aceptar} className="btn btn-outline-success">
                            Aceptar
                        </button>
                    </div>
                    <div>
                        <button type="button" onClick={this.Eliminar}
                                className="btn btn-outline-secondary">{this.state.TitleButtonDeAc}</button>
                    </div>
                    <div>
                        <button type="button" onClick={this.Cancelar} className="btn btn-outline-danger">
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
            {/* Apartado de la tabla de usuarios */}


            <div className=" PrincipalTaU col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
                 style={{paddingLeft:'0%',paddingRight:'0%'}}>
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
                        {this.state.listaFinal}
                        </tbody>
                    </table>
                </div>
            </div></div></div>;
        return (

            <div className="Contenedor row">
                <Alert stack={{limit: 3}}/>

                {this.state.Conexion ? <PreloadC/>:null}
                {Tabla}

            </div>


        );
    }
}

export default Usuarios;
