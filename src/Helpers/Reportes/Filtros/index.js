import React, {Component,useState } from 'react';
import '../../../system/styles/Reportes.css';
import Reportes from "../index";
import Preload from "../../../Componentes/Preload";
import Workbook from 'react-excel-workbook'
import Tabla from "../Tabla";
import TablaDinamica from "../../TablaDinamica";
import {firebaseDatabase} from "../../../Conexion/fire";
import { Bar } from 'react-chartjs-2';
import Universal from "../../Universal";
import Alert from "react-s-alert";
import Select from "react-select";
import PreloadC from '../../../Componentes/PreloadCarga';
const ExcelFile = Workbook;
const ExcelSheet = Workbook.Sheet;
const ExcelColumn = Workbook.Column;
class index extends Component {

     NoEntrar = ['Key','Cambio','Hora','Productos'];
    state={
        ProvedorC:"Pedro",Provedores:[],
        Input:[],Producto:'Pedro', Category:'Pedro', VentasTotal:[],ProductosTotal:[],ProvedoresTotal:[],UsuarioTotal:[],ExportarButoon: '',
        Preload: true,Conexion:false

    }

    componentWillMount() {
	console.log('Desarrollado por José Miguel Carrera Pacheco y Pedro González Hernández');
        this.Cancelar();
        this.Consulta();
    }
    Consulta=()=> {
        Universal.ConsultaUniversal('Product').then(e=>{
            this.setState({ProductosTotal:e.sort()});
        });

        firebaseDatabase.ref('Ventas').on('value',sna=>{
            let temp2 = [];
            sna.forEach(child => {
                let tem = child.val();
                tem.Key = child.key;
                temp2 = temp2.concat(tem);
            });
            this.setState({VentasTotal: temp2.sort()});

        });
       /* Se Mejoro la Consulta
        firebaseDatabase.ref('Product').on('value',sna=>{
            let temp2 = [];
            sna.forEach(child => {
                let tem = child.val();
                tem.Key = child.key;
                temp2 = temp2.concat(tem);
            });
            this.setState({ProductosTotal:temp2.sort()});
        });*/
        firebaseDatabase.ref('Provider').on('value',sna=>{
            let temp2 = [];
            sna.forEach(child => {
                let tem = child.val();
                tem.Key = child.key;
                temp2 = temp2.concat(tem);
            });
            this.setState({ProvedoresTotal: temp2.sort()});
        });
        firebaseDatabase.ref('Usuarios').on('value',sna=>{
            let temp2 = [];
            sna.forEach(child => {
                let tem = child.val();
                tem.Key = child.key;
                temp2 = temp2.concat(tem);
            });
            this.setState({UsuarioTotal: temp2.sort(),Preload:false});
        });
        Universal.ConsultaSelect('Provider').then(e=>{
            this.setState({Provedores:e})
        })

    }

     hoyFecha=()=> {
        let hoy = new Date();
        let dd = hoy.getDate();
        let mm = hoy.getMonth() + 1;
        let yyyy = hoy.getFullYear();

        dd = this.addZero(dd);
        mm = this.addZero(mm);

        return yyyy+  '-' + mm + '-'+ dd  ;
    };
    addZero=(i)=>{
        if (i < 10) {
            i = '0' + i;
        }
        return i;
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
    Cancelar = () => {
        const a = [];
        a.FechaI = "";
        a.FechaF = "";
        this.setState({Input:a,ListaEncabezados: [],ListaTabla: [],
            Producto:'Pedro', Category:'Pedro',KeyModi: null});

    };


    CambioIntputG=(event)=>{
        const name = event.target.id ? event.target.id : event.target.name;
        const value = event.target.value;
        const ArraTe = this.state.Input;
        ArraTe[name] = value;
        this.setState({Input:ArraTe});
    }

    OrdenarCAntidad=(a,b)=>{
            return a.Cantidad - b.Cantidad;
    }

    Filtro=(Tipo)=>{
        if(this.state.VentasTotal.length > 0){
            switch (Tipo) {
                case 'Vendedores':{
                    const NOValidar=['Key','Cambio','Mesa'];
                    const Cabio ={'Usuario_ID':'Usuario'}
                    let Tabla = Reportes.ProductosArrayVendedores(this.state.VentasTotal,this.state.UsuarioTotal);
                    this.setState({ListaEncabezados: TablaDinamica.getEncabezado(Tabla,NOValidar,Cabio),ListaTabla: TablaDinamica.getTablaDianmica2(Tabla,NOValidar),
                        ExportarButoon: null});
                    break;
                }
                case 'Faltantes':{
                    const ProductoxProvedor = this.state.ProductosTotal.filter(e=>e.Provedor === this.state.ProvedorC.value);
                    if(this.state.ProvedorC === 'Pedro'){
                        this.Alerta('Seleccione un Proovedor');
                        this.setState({ListaEncabezados: [],ListaTabla:[],
                            ExportarButoon: null});
                    }else{
                        let ArrayTemp=[];
                        let l = [];
                        Reportes.FiltradoFechas(Reportes.sumarDias(Reportes.hoyFecha(),-20),Reportes.hoyFecha(),this.state.VentasTotal).forEach(e=>{
                            Object.values(e.Productos).forEach(item=>{
                                const VariableProTemp = this.state.ProductosTotal.find(it=>it.Key === item.Producto_ID);
                                if(VariableProTemp.Provedor === this.state.ProvedorC.value){
                                    if(ArrayTemp.length !== 0){
                                        // console.log(item)
                                        let ProTempA = ArrayTemp.find(p=>p.Key ===VariableProTemp.Key);
                                        if(ProTempA !== undefined){
                                            ProTempA.Cantidad = (+ProTempA.Cantidad) +(+item.Cantidad);
                                        }else{
                                            ArrayTemp.push({Cantidad:item.Cantidad,Nombre:VariableProTemp.Nombre,Key:VariableProTemp.Key});
                                        }
                                    }else{
                                        ArrayTemp.push({Cantidad:item.Cantidad,Nombre:VariableProTemp.Nombre,Key:VariableProTemp.Key});
                                    }
                                }
                            });
                        });
                        let Faltantes =[];
                        ProductoxProvedor.forEach(itemPP=>{
                            let diferencia =  (+itemPP.Cantidad) -(+itemPP.Stock);
                            if(diferencia < 0 ){
                                let PF = itemPP;
                                PF.faltantes = Math.abs(diferencia);
                                PF.Paquetes = Reportes.RedondeoCajas((+PF.faltantes) / (+PF.CantidadP));
                                Faltantes.push(itemPP);
                            }else{
                                let ProductKeyAT = ArrayTemp.find(o=>o.Key === itemPP.Key);
                                if(ProductKeyAT !== undefined){
                                    let CantidadPF = diferencia - ProductKeyAT.Cantidad;
                                    if(CantidadPF < 0 ){
                                        let PF = itemPP;
                                        PF.faltantes =Math.abs(CantidadPF);
                                        PF.Paquetes= Reportes.RedondeoCajas((+PF.faltantes) / (+PF.CantidadP));
                                        Faltantes.push(PF);
                                    }
                                }
                            }
                        });

                        const NoEncabezado =['FechaRegistro','Stock','Provedor','Precio_Venta','Key','Precio_Compra','Image','Ganancia','Estatus','Categoria','Cantidad'];
                        const Cambio={'CantidadP':'Cantidad x Paquete','faltantes':'FALTANTES', 'Paquetes':'PAQUETES'};
                        if(Faltantes.length <=0){
                            this.Alerta('Stock de invantario ideal',true);
                            this.setState({ListaEncabezados: [],ListaTabla:[],
                                ExportarButoon: null});
                        }else{
                            Faltantes.forEach(item=>{
                               item.Subtotal = (((+item.CantidadP) * (+item.Precio_Compra)) *(+item.Paquetes)).toFixed(2);
                            });
                            l.push(<ExcelFile key='1' filename={"F"+this.state.ProvedorC.label+this.hoyFecha()+".xlsx"} element={<button className="btn btn-danger col-12">Exportar</button>}>
                                <ExcelSheet data={Faltantes} name="Compra">
                                    <ExcelColumn label="Producto" value="Nombre"/>
                                    <ExcelColumn label="Faltantes" value="faltantes"/>
                                    <ExcelColumn label="Paquetes" value="Paquetes"/>
                                    <ExcelColumn label="Codigo" value="Codigo"/>
                                    <ExcelColumn label="Subtotal" value="Subtotal"/>
                                </ExcelSheet>
                            </ExcelFile>);
                            this.setState({ListaEncabezados: TablaDinamica.getEncabezado(Faltantes,NoEncabezado,Cambio),
                                ListaTabla: TablaDinamica.getTablaDianmica(Faltantes,NoEncabezado,Cambio),
                                ExportarButoon: l});
                        }
                    }

                    break;
                }
                case 'Sobrantes':{
                    //Menos Vendidos
                    let l = [];
                    let Tabla = Reportes.FiltradoFechas(Reportes.sumarDias(Reportes.hoyFecha(),-20),Reportes.hoyFecha(),this.state.VentasTotal);

                    let b = Reportes.ProductosArraySo(Tabla,this.state.ProductosTotal).sort(this.OrdenarCAntidad);
                    l.push(<div key="2" className="col-12 m-lg-2" ><Bar key="1212929" data={Reportes.PaserDateGradfic2(b,
                        "Productos menos vendidos en 15 dias")} /></div>)

                    this.setState({ListaEncabezados: TablaDinamica.getEncabezado(b,this.NoEntrar),ListaTabla: TablaDinamica.getTablaDianmica(b,this.NoEntrar),
                        ExportarButoon: l});
                    break;
                }
                default:{

                }
            }
        }
    }

    Aceptar=()=>{
        this.setState({Conexion:true});

        const ProductoCompletos = this.state.ProductosTotal;
        if(this.state.Input.FechaF !== "" && this.state.Input.FechaI !== ""){
            let a = Reportes.FiltradoFechas(this.state.Input.FechaI,this.state.Input.FechaF,this.state.VentasTotal);
            const ArrayExportar=[];
           // console.log(a)
            Object.values(a).forEach((item,index)=> {
            //  console.log(item);
               Object.values(item.Productos).forEach((data,index2)=>{
                  data.FechaV = item.Fecha;
                //  data.Hora = item.Hora;
                   ProductoCompletos.forEach(item=>{
                       if(item.Key === data.Producto_ID){
                           data.Nombre = item.Nombre;
                       }
                   });
                  ArrayExportar.push(data);
               });
            });
           // console.log(ArrayExportar)
            const ArrayFinal =[];
            Object.values(a).forEach((item,index)=>{
               Object.values(item.Productos).forEach(item=>{
                   //console.log(item)
                   let Compracion = undefined;
                   item.ProuductosTotales = item.Cantidad;
                   if(ArrayFinal.length >0 ){
                      Compracion = ArrayFinal.find(e=>e.Producto_ID === item.Producto_ID);
                    }else{
                      // console.log('Es nuevo')
                   }
                   if(Compracion === undefined){
                       ArrayFinal.push(item);
                   }else{
                            //console.log(Compracion)
                                Compracion.ProuductosTotales = (+Compracion.ProuductosTotales) + (+item.Cantidad);
  //                     console.log(Compracion)
                   }
               });
            });
            const validarB = ArrayExportar.slice();
            const ArrayExportarFinal= [];
            validarB.forEach(item=>{
                //console.log(item)
                let BusQuedaDia = ArrayExportarFinal.find(data=>data.FechaV === item.FechaV && data.Nombre === item.Nombre);

                if(BusQuedaDia === undefined){
                    ArrayExportarFinal.push(item);
                }else{
                    //       console.log(BusQuedaDia)
                    BusQuedaDia.Cantidad = (+BusQuedaDia.Cantidad) +(+item.Cantidad);
                }
            });
            //console.log(ArrayExportarFinal)
            let l = [];
       //     console.log(ArrayFinal)
            /* //Cambio por peticion del Cliente
        let a = Reportes.FiltradoFechas(this.state.Input.FechaI,this.state.Input.FechaF,this.state.VentasTotal);
        let i = Object.values(a).map((item, index) => {
           let p = Object.values(item.Productos).map(item=> {
               let cantidad = 0;
                cantidad = cantidad + item.Cantidad;
                return cantidad;
           });
           item.ProductosC = p.reduce(function(a, b){ return a + b; });
           return item;
        });
       */
            l.push(<ExcelFile key='1' filename={"Ventas"+this.hoyFecha()+".xlsx"} element={<button className="btn btn-danger col-12">Exportar</button>}>
                <ExcelSheet data={ArrayExportarFinal} name="Compra">
                    <ExcelColumn label="Nombre" value="Nombre"/>
                    <ExcelColumn label="Cantidad" value="Cantidad"/>
                    <ExcelColumn label="Fecha" value="FechaV"/>
                </ExcelSheet>
            </ExcelFile>);

            this.setState({ListaEncabezados: TablaDinamica.getEncabezado(ArrayFinal,['FechaV','Usuario_ID','Producto_ID','Precio_Original','Precio','GananciaFinal','Cantidad','Total','Ganancia'])
                ,ListaTabla: TablaDinamica.getTablaDianmica(ArrayFinal,['FechaV','Usuario_ID','Producto_ID','Precio_Original','Precio','GananciaFinal','Cantidad','Total','Ganancia']),
                ExportarButoon:l,Conexion:false});
        }else{
            this.setState({ListaEncabezados: [],ListaTabla:[],
                ExportarButoon: null,Conexion:false});
            this.Alerta("Se requiere que se ingresen Fecha de Inicio y Fecha Final",false,1000);
        }
    }


    CambioProvedor=(e)=>{
        this.setState({ProvedorC:e});
    }
    render() {
        const Contenido = this.state.Preload ?<Preload/> :
            <>
                <div className='Filtros col-12 row' style={{margin:"0%"}}>
                    <div className="col-12 CjaFCentrar">

                        <div className='col-12 row' style={{margin: '0%'}}>
                            <div className="col-12" style={{padding:'0%'}}>
                                <label className="sr-only" htmlFor="inlineFormInputGroup">Fecha Inicial:</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Inicial:</div>
                                    </div>
                                    <input onChange={this.CambioIntputG}
                                           id='FechaI' value={this.state.Input.FechaI}
                                           type="date" className="form-control" placeholder="12/07/2019"/>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 row' style={{margin: '0%'}}>
                            <div className="col-12" style={{padding:'0%'}}>
                                <label className="sr-only" htmlFor="inlineFormInputGroup">Fecha Final:</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"> Final:</div>
                                    </div>
                                    <input onChange={this.CambioIntputG}
                                           id='FechaF' value={this.state.Input.FechaF}
                                           type="date" className="form-control" placeholder="12/07/2019"/>
                                </div>
                            </div>
                        </div>

                        <div className="row col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 Botones " id='Buton'>
                            <div className="row justify-content-sm-end Botones col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" id='Buton'>
                                <div style={{margin:"1rem"}}>
                                    <button type="button" onClick={this.Aceptar} className="btn btn-outline-success ">
                                        Aceptar
                                    </button>
                                </div>
                                <div style={{margin:"1rem"}}>
                                    <button type="button" onClick={this.Cancelar} className="btn btn-outline-danger">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div  id="labelE" className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <label className="labelT">Filtros Extras</label>
                        </div>
                        <div className="row justify-content-sm-between Botones col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  row" id='Buton2'>

                            <div className='col-12 row' style={{margin:"0%",marginTop: '1%'}}>
                                <div className="col-12" style={{padding:'0%'}}>
                                    <label className="sr-only" htmlFor="inlineFormInputGroup">Proveedor:</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"> Provedor:</div>
                                        </div>
                                        <div className="form-control" style={{border:'0px',padding:'0%'}}>
                                            <Select
                                                value={this.state.ProvedorC}
                                                onChange={this.CambioProvedor}
                                                options={this.state.Provedores}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div style={{margin:"1rem"}}>
                                <button type="button" onClick={()=>this.Filtro('Vendedores')} className="btn btn-outline-success ">
                                    Vendedores
                                </button>
                            </div>
                            <div style={{margin:"1rem"}}>
                                <button type="button" onClick={()=>this.Filtro('Faltantes')} className="btn btn-outline-success ">
                                    Faltantes
                                </button>
                            </div>
                            <div style={{margin:"1rem"}}>
                                <button type="button" onClick={()=>this.Filtro('Sobrantes')} className="btn btn-outline-success ">
                                    Sobrantes
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <Tabla Encabezados={this.state.ListaEncabezados} Valores={this.state.ListaTabla}/>
                    {this.state.ExportarButoon}
                </div>
            </>


        ;
        return (
<div>
    {this.state.Conexion ? <PreloadC/>:null}
    {Contenido}
</div>
        );
    }
}

export default index;
