import React, {Component} from 'react';
import Alert from "react-s-alert";
import TablaDinamica from "../Helpers/TablaDinamica";
import Inventario from '../Helpers/Inventario';
import Preload from '../Componentes/Preload';
import Universal from '../Helpers/Universal';
class AgregarProvedor extends Component {

    NoValidad = ['Key'];
    state = { TitleButtonDeAc: 'Desactivar',
        Input: [],  TablaVacia: true,
        KeyModi: null
    };

    Tabla=(Valor)=>{
        if(Valor.length !== 0){
            this.setState({ListaEncabezado: TablaDinamica.getEncabezado(Valor,this.NoValidad), listaFinal:this.getTablaDianmica(Valor,this.NoValidad) });
        }
    };

    getTablaDianmica=(Array,NoVAlido)=>{
        let Valores=[];
        Object.values(Array).forEach((item) => {
            let Valor = [];
            let Index = item.Key;
            TablaDinamica.getEncabezado(Array,NoVAlido).forEach((frase, index) => {
                Valor.push(<td key={index}>{item[frase.props.children]}</td>);
            });
            //   console.log(Valor);
            Valores.push(<tr onClick={()=>this.Modificar(item,Index)}  key={Index}>{Valor}</tr>);
        });
        return Valores;
    };

    Modificar=(Valor,Index)=>{
        const ArraT = this.state.Input;
        ArraT['Nombre'] = Valor.Nombre;
        this.setState({KeyModi:Index,Input:ArraT});
    };
    CambioIntputG = (event) => {
        const name = event.target.id ? event.target.id : event.target.name;
        const value = event.target.value;
        const p = this.state.Input;
        p[name] = value;
        this.setState({Input: p});
    };
    Cancelar=()=>{
        const P = Inventario.ArrayISimple();
        this.setState({Input:P,KeyModi: null});

    };
    Aceptar = () => {
        if(this.state.Input.Nombre !== '' && this.state.KeyModi === null){
            Universal.PushUniversal('Provider',{
                ...this.state.Input
            }).then(()=>{this.Alerta('Proveedor Agregado', true);
                this.Cancelar(); this.Consulta();});
        }else if(this.state.Input.Nombre !== '' && this.state.KeyModi !== null){

            let Datos ={
                ...this.state.Input
            };

            Universal.UpdateUniversal('Provider/' + this.state.KeyModi,Datos).then(() =>{
                this.Consulta();
                this.Alerta('Proveedor Modificado',true)
            }).catch(() =>
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
        Universal.ConsultaUniversal('Provider').then(e=>{
            this.setState({TablaVacia:false});
            this.Tabla(e);
        }).catch(e=>{
            //console.log('error')
        })

    };

    componentWillMount() {
        this.setState({Input:Inventario.ArrayISimple()})
        this.Consulta();
    }

    render() {
        const Tabla  = this.state.TablaVacia ? <Preload/>:<div  className="col-12 row" style={{margin:"0%",padding:"0%"}}><div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <h1> Agregar Proveedor</h1>
            <div className="col-auto">
                <label className="sr-only" htmlFor="inlineFormInputGroup">Nombre:</label>
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Nombre</div>
                    </div>
                    <input  onChange={this.CambioIntputG} value={this.state.Input.Nombre}
                            id='Nombre'
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
            </div></div>;
        return (
            <div className="Contenedor row" style={{margin:"auto"}}>
                <Alert stack={{limit: 3}}/>
                {Tabla}
            </div>

        );
    }
}

export default AgregarProvedor;
