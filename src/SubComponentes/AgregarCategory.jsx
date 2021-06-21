import React, {Component} from 'react';
import Alert from "react-s-alert";
import Inventario from '../Helpers/Inventario';
import TablaDinamica from '../Helpers/TablaDinamica';
import {firebaseDatabase} from "../system/model/firebase/firebase";
import Preload from '../Componentes/Preload';
class AgregarCategory extends Component {
    NoValidad = ['Key'];
    state = { TitleButtonDeAc: 'Desactivar',  TablaVacia: true,
        Input: [],
        KeyModi: null
    };

    Tabla=(Valor)=>{
        if(Valor.length !== 0){
            this.setState({ListaEncabezado: TablaDinamica.getEncabezado(Valor,this.NoValidad), listaFinal:this.getTablaDianmica(Valor,this.NoValidad) });
        }
    };

     getTablaDianmica=(Array,NoValido)=>{
        let Valores=[];
        Object.values(Array).forEach((item) => {
            let Valor = [];
            let Index = item.Key;
            TablaDinamica.getEncabezado(Array,NoValido).forEach((frase, index) => {
                Valor.push(<td key={index}>{item[frase.props.children]}</td>);
            });
            //   console.log(Valor);
            Valores.push(<tr onClick={()=>this.Modificar(item,Index)}  key={Index}>{Valor}</tr>);
        });
        return Valores;
    };

    Modificar=(Valor,Index)=>{
        const ArraTemp = this.state.Input;
        ArraTemp['Nombre'] = Valor.Nombre;
        this.setState({KeyModi:Index,Inpuy:ArraTemp});
    };
    CambioIntputG = (event) => {
        const name = event.target.id ? event.target.id : event.target.name;
        const value = event.target.value;
        const ArraTe = this.state.Input;
        ArraTe[name] = value;
        this.setState({Input:ArraTe});
    };
    Cancelar=()=>{
        this.setState({Input:Inventario.ArrayISimple(),KeyModi: null});

    };
    Aceptar = () => {
       if(this.state.Input['Nombre'] !== '' && this.state.KeyModi === null){


           firebaseDatabase.ref('Category').push({
                ...this.state.Input
            },()=>this.Alerta('Categoría Agregado',true));
            this.Cancelar();
        }else if(this.state.Input['Nombre'] !== '' && this.state.KeyModi !== null){
            let Datos ={
                    ...this.state.Input
                };


            firebaseDatabase.ref('Category/'+this.state.KeyModi).update(Datos).then(()=>
                this.Alerta('Categoría Modificado',true)
            ).catch(()=>
                this.Alerta('Error en su conexión',false)
            );
            this.Cancelar();
        }else{
            this.Alerta('Datos incompletos',false)
        }
    };
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
    Consulta=()=>{
        firebaseDatabase.ref('Category').on('value',(sna)=>{
            let temp2 = [];
            sna.forEach(child => {
                let tem = child.val();
                tem.Key = child.key;
                temp2 = temp2.concat(tem);
            });
            this.setState({TablaVacia:false});
            this.Tabla(temp2);
        });
    };

    componentWillMount() {
        this.Cancelar();
        this.Consulta();
    }

    render() {
    const Tabla  = this.state.TablaVacia ? <Preload/>:<div className="col-12 row CajaPrincipal" style={{margin:"0%"}}>
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <h1> Agregar Categoría</h1>


            <div className="col-auto">
                <label className="sr-only" htmlFor="inlineFormInputGroup">Nombre:</label>
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Nombre</div>
                    </div>
                    <input  onChange={this.CambioIntputG}
                            id='Nombre' value={this.state.Input.Nombre}
                            type="text" className="form-control" placeholder="Nombre"/>
                </div>
            </div>

            <div className="form-group Botones col-auto">
                <div>
                    <button type="button" onClick={this.Aceptar} className="btn btn-outline-success">
                        Aceptar
                    </button>
                </div>

                <div>
                    <button type="button" onClick={this.Cancelar} className="btn btn-outline-danger">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
        {/* Apartado de la tabla de usuarios */}


        <div className=" PrincipalTaU col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 "
             style={{paddingLeft: '0%', paddingRight: '0%'}}>
            <div className="table-responsive TablaU">
                <table className="table users table-hover">
                    <thead>
                    <tr className="table-primary">
                        {this.state.ListaEncabezado}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.listaFinal}
                    </tbody>
                </table>
            </div>
        </div>
    </div>;
        return (
            <div className="Contenedor row"  style={{margin:"auto"}}>
                <Alert stack={{limit: 3}}/>
                {Tabla}
            </div>

        );
    }
}

export default AgregarCategory;
