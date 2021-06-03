import React, {Component} from 'react';
import Alert from "react-s-alert";
import Select from "react-select";
import Universal from "../Helpers/Universal";
import Inventario from "../Helpers/Inventario";
import ModalUniversal from "../Helpers/ModalUniversal";
import TablaDinamica from "../Helpers/TablaDinamica";
import Preload from '../Componentes/Preload';
import TablaR from "../Helpers/Reportes/Tabla";
import PreloadC from '../Componentes/PreloadCarga';


class Ofertas extends Component {
    NoValidad = ['Tipo','Key'];
    CambiosJson = {"BooleanCa":'Tipo Oferta',"Modo":'Productos',"Nombre":'Oferta',"Estatus": 'Estado'};
    state={
        OfertasActivas: [],
        TitleButtonDeAc: 'Desactivadas',
        Producto:'Pedro',
        Category: 'Pedro',
        BoleanCate: false,
        BoeanConsun:true,
        Productos:[],
        Categorys:[],
        Tipo:'Total',
        Input:[],
        KeyModi: null,
        TablaVacia: true,
        OfetasTotal: [],
        listaFinal:[],
        ListaEncabezado:[],
        listaFinalD:[],
        ListaEncabezadoD:[],
        ModalBoolean:false,
        Conexion: false
    }
    componentWillMount() {
        document.title = `Ofertas`;
        this.Cancelar();
        this.Consultas();
    }
    Eliminar=()=>{
        if(this.state.KeyModi === null){
            this.Alerta('Por favor seleccione una Oferta');
        }else{
            const Estado = (this.state.TitleButtonDeAc === 'Activar') ? 'Activado': 'Desactivado';
            Universal.UpdateUniversal('Ofertas/'+this.state.KeyModi,{'Estatus':Estado}).then(
                ()=>{this.Alerta('Oferta '+Estado,true); this.Consultas(); this.Cancelar()});

        }

    }
    ActivarOfertaModal=(e)=>{
        Universal.UpdateUniversal('Ofertas/'+e.Key,{'Estatus':'Activado'}).then(
            ()=>{this.Alerta('Oferta Activada ',true); this.Consultas(); this.Cancelar()});
    }
    Cancelar = () => {
        const a = Inventario.ArrayISimple();
        a.Importe ='';
        this.setState({Input:a,TitleButtonDeAc: 'Desactivadas',
            Producto:'Pedro', Category:'Pedro',KeyModi: null});

    };
    Consultas = ()=>{
        Universal.ConsultaSelect('Product').then(e=>{

            this.setState({Productos:e});
        })
        Universal.ConsultaSelect('Category').then(e=>{

            this.setState({Categorys:e});
        });
        Universal.ConsultaUniversal('Ofertas').then(e=>{
            this.setState({TablaVacia:false,OfetasTotal:e,OfertasActivas:e.filter(e=>e.Estatus === 'Activado' )},()=>{
                this.Tabla(this.state.OfertasActivas);
            });

        }).catch(e=>{
            //console.log(e)
        })
    }
    getTablaDianmica=(Array)=>{
        let Valores=[];
        Object.values(Array).forEach((item) => {
            let Valor = [];
            let Index = item.Key;
            //console.log('Comienza numeracion')
            TablaDinamica.getEncabezado(Array,this.NoValidad).forEach((frase, index) => {
                //console.log(index)
                switch (frase.props.children ) {
                    case 'BooleanCa': {
                        Valor.push(<td key={index}>{item[frase.props.children] ?  'Producto':'Categoria' }</td>);
                        break;
                    }
                    case 'Modo':{
                        const a = this.state.Categorys.find(e=>e.value === item[frase.props.children]);
                        if(a === undefined){
                            const b = this.state.Productos.find(e=>e.value === item[frase.props.children]);
                            Valor.push(<td key={index}>{b.label}</td>);
                        }else{
                            Valor.push(<td key={index}>{a.label}</td>);
                        }
                        break;
                    }
                    default: {
                        Valor.push(<td key={index}>{item[frase.props.children]}</td>);
                    }
                }
            });
            //   console.log(Valor);
            Valores.push(<tr onClick={()=>this.Modificar(item)}  key={Index}>{Valor}</tr>);
        });
        return Valores;
    };
    Tabla=(Valor)=>{
        let NoValidadD = ['Tipo','Key','Modo','Estatus'];
        let CambiosJsonD = {"BooleanCa":'Tipo Oferta',"Modo":'Productos',"Nombre":'Oferta',"Estatus": 'Estado'};
        this.setState({ListaEncabezado: TablaDinamica.getEncabezado(Valor,this.NoValidad,this.CambiosJson), listaFinal:this.getTablaDianmica(Valor),
        ListaEncabezadoD: TablaDinamica.getEncabezado(this.state.OfetasTotal.filter(e=>e.Estatus!== 'Activado'),NoValidadD,CambiosJsonD),
        listaFinalD: this.getTablaDianmica3(this.state.OfetasTotal.filter(e=>e.Estatus!== 'Activado'),NoValidadD,CambiosJsonD,this.ActivarOfertaModal)});
    };

     getTablaDianmica3=(Array,NoEntrar=[],json={},Funtion=null)=>{
        let Valores=[];
        Object.values(Array).forEach((item, index) => {
            let Valor = [];
            TablaDinamica.getEncabezado(Array,NoEntrar).forEach((frase, index) => {
                switch (frase.props.children ) {
                    case 'BooleanCa': {
                        Valor.push(<td key={index}>{item[frase.props.children] ? 'Producto' : 'Categoria'}</td>);
                        break;
                    }
                    case 'Modo': {
                        const a = this.state.Categorys.find(e => e.value === item[frase.props.children]);
                        if (a === undefined) {
                            const b = this.state.Productos.find(e => e.value === item[frase.props.children]);
                            Valor.push(<td key={index}>{b.label}</td>);
                        } else {
                            Valor.push(<td key={index}>{a.label}</td>);
                        }
                        break;
                    }
                    case 'Estado': {
                        Valor.push(<td key={index}>{item[frase.props.children] ? 'Activo' : 'Inactivo'}</td>);
                        break;
                    }
                    case 'Codigo': {
                        Valor.push(<td key={index}>{item['CB']}</td>);
                        break;
                    }
                    default: {
                        Valor.push(<td key={index}>{item[frase.props.children]}</td>);
                    }
                }

            });
            //   console.log(Valor);
            Valores.push(<tr onClick={()=>Funtion(item)} key={index}>{Valor}</tr>);
        });
        return Valores;
    };

    Modificar=(Valor)=>{
        const ArraTemp = this.state.Input;
        ArraTemp['Nombre'] = Valor.Nombre;
        ArraTemp['Importe'] = Valor.Importe;
        const  Estado =  (Valor.Estatus === 'Activado') ? 'Desactivar':'Activar';
        const Modo1= Valor.BooleanCa ?this.state.Productos.find(e=>e.value === Valor.Modo):this.state.Categorys.find(e=>e.value === Valor.Modo);
        if(Valor.BooleanCa){
            this.setState({KeyModi:Valor.Key,Inpuy:ArraTemp, Tipo: Valor.Tipo,Producto: Modo1,Category:'Pedro',BoleanCate:true,TitleButtonDeAc:Estado});
        }else{
            this.setState({KeyModi:Valor.Key,Inpuy:ArraTemp, Tipo: Valor.Tipo,Category: Modo1,Producto:'Pedro',BoleanCate:false,TitleButtonDeAc:Estado});
        }
        if(Valor.Modo){

        }

    };

    CambioProductos=(e)=>{
        let validar ='';
        if(this.state.KeyModi === null){
            validar = this.state.OfertasActivas.find(p=>p.Modo === e.value );
            if(validar !== undefined){
                this.Alerta('Este Producto ya cuenta con una oferta',false,2000);
            }else{

                this.setState({Producto: e,BoleanCate:true,Category:"Pedro"});
            }
        }else{

            this.setState({Producto: e,BoleanCate:true,Category:"Pedro"});
        }

    }
    CambioCategory=(e)=>{
        let validar ='';
        if(this.state.KeyModi === null){
            validar = this.state.OfertasActivas.find(p=>p.Modo === e.value );
            if(validar !== undefined){
                this.Alerta('Esta Categoria ya cuenta con una oferta',false,2000);
            }else{
                this.setState({Category: e,BoleanCate:false,Producto:"Pedro",Tipo: 'Porcentaje'});
            }
        }else {
            this.setState({Category: e,BoleanCate:false,Producto:"Pedro",Tipo: 'Porcentaje'});
        }
    }
    CambioR=(e)=>{
        const name =  e.target.name;
        const value = e.target.value;
        if(!this.state.BoleanCate){
            this.Alerta('Se ha seleccionado una Categoria',false,1500);
        }else{
            this.setState({[name]:value});
        }

    }
    CambioIntputG =(event)=>{
        const name = event.target.id ? event.target.id : event.target.name;
        const value = event.target.value;
        const ArraTe = this.state.Input;
        ArraTe[name] = value;
        this.setState({Input:ArraTe});
    }
    Aceptar=()=> {
        this.setState({Conexion:true});
        const json = {
            ...this.state.Input,
            "Tipo": this.state.Tipo,
            "BooleanCa": this.state.BoleanCate,
            "Estatus": "Activado"
        }
        if(!json.BooleanCa){
            json.Modo = this.state.Category.value;
        }else{
            json.Modo = this.state.Producto.value;
        }

        if(this.state.Input['Nombre'] !=='' &&this.state.Input['Importe'] !==''
            && (this.state.Category !== 'Pedro' || this.state.Producto !== 'Pedro') ){
            if(this.state.KeyModi === null){
                Universal.PushUniversal('Ofertas', json).then(() =>
                {this.Alerta('Oferta Agregada', true, 1000);this.Cancelar(); this.Consultas();   this.setState({Conexion:false});})
                    .catch(()=>this.Alerta('Datos Incompletos', false ,1000) );
            }else{
                Universal.UpdateUniversal('Ofertas/'+this.state.KeyModi, json).then( ()=>
                {this.Alerta('Oferta Modificada', true, 1000);this.Cancelar(); this.Consultas();   this.setState({Conexion:false});})
                    .catch(()=>this.Alerta('Datos Incompletos', false ,1000) );
            }
        }else{
            this.setState({Conexion:false});
            this.Alerta('Datos Incompletos',false);
        }
    }

    Alerta = (variable, tipo, tiempo = 1000) => {
        tipo ? Alert.success(variable, {
            position: 'top-right',
            effect: 'bouncyflip',
            timeout: tiempo
        }): Alert.error(variable, {
            position: 'top-right',
            effect: 'bouncyflip',
            timeout: tiempo
        });
    }
    ModalAc=()=>{
       this.setState({ModalBoolean:true});
    }
    getBoolean=(r)=>{
        this.setState({ModalBoolean:r});
    }
    render() {
        const FuncionClickBU = (this.state.TitleButtonDeAc === "Desactivadas") ? this.ModalAc : this.Eliminar;
        const Cont = this.state.TablaVacia? <Preload/> :
            <div className="Contenedor row" style={{margin:'0%',padding:'0%',paddingTop:"3rem"}}><div className='col-12 row'> <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">


                <ModalUniversal Open = {this.state.ModalBoolean} Titulo="Ofertas Desactivadas"  Contenido={

                    <TablaR Encabezados={this.state.ListaEncabezadoD} Valores={this.state.listaFinalD}/>

                }
                                getBolean={this.getBoolean}  />
            <h1> Agregar Ofertas</h1>


            <div className='col-12 row' style={{margin: '0%'}}>
                <div className="col-12" style={{padding:'0%'}}>
                    <label className="sr-only" htmlFor="inlineFormInputGroup">Nombre:</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Nombre</div>
                        </div>
                        <input onChange={this.CambioIntputG}
                               id='Nombre' value={this.state.Input.Nombre}
                               type="text" className="form-control" placeholder="Nombre"/>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <label className="sr-only" htmlFor="inlineFormInputGroup">Productos:</label>
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Productos</div>
                    </div>
                    <div style={{width: '100%'}}>
                        <Select
                            value={this.state.Producto}
                            onChange={this.CambioProductos}
                            options={this.state.Productos}
                        />
                    </div>
                </div>
            </div>
            <div className="col-12">
                <label className="sr-only" htmlFor="inlineFormInputGroup">Categorias:</label>
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Categorias</div>
                    </div>
                    <div style={{width: '100%'}}>
                        <Select

                            value={this.state.Category}
                            onChange={this.CambioCategory}
                            options={this.state.Categorys}
                        />
                    </div>
                </div>
            </div>

            <div className='col-12 row' style={{margin: '0%'}}>
                <div className="col-12" style={{padding:'0%'}}>
                    <label className="sr-only" htmlFor="inlineFormInputGroup">Importe:</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Importe</div>
                        </div>
                        <input onChange={this.CambioIntputG}
                               id='Importe' value={this.state.Input.Importe}
                               type="text" className="form-control" placeholder="12"/>
                    </div>
                </div>

            </div>



            <fieldset className="col-auto">
                <div className="AliniarXL col-xs-12 col-sm-10 row">

                    <div className="custom-control custom-radio ra">
                        <input type="radio" id="customRadio1"
                               name='Tipo' checked={this.state.Tipo === 'Porcentaje'}
                               onChange={this.CambioR} value="Porcentaje"
                               className="custom-control-input"/>
                        <label className="custom-control-label"
                               htmlFor="customRadio1"> Porcentaje</label>
                    </div>

                    <div className="custom-control custom-radio ra">
                        <input type="radio" id="customRadio2"
                               name='Tipo' checked={this.state.Tipo === 'Total'}
                               onChange={this.CambioR} value="Total"
                               className="custom-control-input"/>
                        <label className="custom-control-label" htmlFor="customRadio2"> Importe</label>
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
                    <button type="button" onClick={FuncionClickBU} className="btn btn-outline-secondary">
                        {this.state.TitleButtonDeAc}
                    </button>
                </div>
                <div>
                    <button type="button" onClick={this.Cancelar} className="btn btn-outline-danger">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">

                <div className=" PrincipalTaU col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 "
                     style={{paddingLeft: '0%', paddingRight: '0%', margin: '2%'}}>
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
            </div></div></div>;

            return (
            <div style={{margin:'0%',padding:'0%',height:"100%"}}>
                <Alert stack={{limit: 3}}/>

                {this.state.Conexion ? <PreloadC/>:null}
                {Cont}

            </div>

        );
    }
}

export default Ofertas;
