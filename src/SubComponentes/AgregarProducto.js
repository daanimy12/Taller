import React, {Component} from 'react';
import Alert from "react-s-alert";
import TablaDinamica from "../Helpers/TablaDinamica";
import Select from 'react-select';
import Inventario from '../Helpers/Inventario';
import Universal from '../Helpers/Universal';
import Preload from '../Componentes/Preload';
import PreloadC from '../Componentes/PreloadCarga';
import ModalUniversal from "../Helpers/ModalUniversal";
import Login from "../Helpers/Login";
import Barcode from "react-barcode";
import QRCode from "qrcode.react";
import './css/AgregarPro.css';
import './css/all.css';
import {firebaseStorage} from "../Conexion/fire";

class AgregarProducto extends Component {
    NoValidar = ['Key', 'Categoria', 'Estatus', 'Ganancia', 'Image', 'Precio_Compra', 'Provedor'];
    Cambiar = {'Stock': 'Limite', Precio_Venta: 'Precio', 'CantidadP': 'Cantidad x Paqute'};
    state = {
        TitleButtonDeAc: 'Desactivar',
        Input: [], TablaVacia: true,
        KeyModi: null,
        Proveedores: [],
        Proveedor: 'Pedro',
        Categorys: [],
        Image: null,
        Category: 'Pedro',
        PreVent: 0.00,
        ModalBoolean: false,
        TipoClient: true,
        PrevCantidad: 0,
        CodigoActualFire: 0,
        search: '',
        TotalProductos: '',
        PreProducto: '',
        Conexion: false,
        GananciaF: 0,
        EstadoImagen:false,
        CargaImage: 0
    };

    Tabla = (Valor) => {
        if (Valor.length !== 0) {
            this.state.TipoClient ?
                this.setState({
                    ListaEncabezado: TablaDinamica.getEncabezadoStatico(),
                    listaFinal: this.getTablaDianmica(Valor)
                })
                :
                this.setState({
                    ListaEncabezado: TablaDinamica.getEncabezadoStatico(),
                    listaFinal: this.getTablaDianmica(Valor.filter(data => data.Estatus === 'Activo'))
                });
        }
    };

    getTablaDianmica = (Array) => {
        let Valores = [];
        Object.values(Array).forEach((item) => {
            let Valor = [];
            let Index = item.Key;
            TablaDinamica.getEncabezadoStatico().forEach((frase, index) => {
                if (frase.props.children !== 'Categoria' && frase.props.children !== 'Provedor' && frase.props.children !== 'Compra' && frase.props.children !== 'Image') {
                    Valor.push(<td key={index}>{item[frase.props.children]}</td>);
                } else {
                    switch (frase.props.children) {

                        case 'Categoria': {
                            const p = this.state.Categorys.find(e => e.value === item[frase.props.children]);
                            Valor.push(<td key={index}>{p.label}</td>);
                            break;
                        }
                        case 'Provedor': {
                            const p = this.state.Proveedores.find(e => e.value === item[frase.props.children]);
                            Valor.push(<td key={index}>{p.label}</td>);
                            break;
                        }
                        case 'Compra': {

                            Valor.push(<td key={index}>
                                <div className="m-lg-3 m-1">
                                    <button type="button" onClick={() => this.ModificarVenta(item, Index)}
                                            className="btn btn-outline-secondary">Ingresar Compra
                                    </button>
                                </div>
                            </td>);
                            break;
                        }
                        case 'Image':{
                            Valor.push(<td key={index}>
                                <div className="m-lg-3 m-1">
                                    <img  src={item[frase.props.children]} width="55px" height="55px"
                                    />
                                </div>
                            </td>)
                        }
                        default: {

                        }
                    }
                }

            });

            if (this.state.TipoClient) {
                Valores.push(<tr onClick={() => this.Modificar(item, Index)} key={Index}>{Valor}</tr>);
            } else {
                Valores.push(<tr key={Index}>{Valor}</tr>);
            }
        });
        return Valores;
    };

    Modificar = (Valor, Index) => {
        const ArraTeM = [];
        ArraTeM['Nombre'] = Valor.Nombre;
        ArraTeM['Ganancia'] = Valor.Ganancia;
        ArraTeM['Cantidad'] = Valor.Cantidad;
        ArraTeM['Precio_Compra'] = Valor.Precio_Compra;
        ArraTeM['Stock'] = Valor.Stock;
        ArraTeM['CantidadP'] = Valor.CantidadP;
        ArraTeM['Codigo'] = Valor.Codigo;

        this.setState({
            Input: ArraTeM, KeyModi: Index, PreVent: Valor.Precio_Venta,
            Proveedor: this.state.Proveedores.find(e => e.value === Valor.Provedor),
            Category: this.state.Categorys.find(e => e.value === Valor.Categoria)
        });
        if (Valor.Estatus === 'Desactivado') {
            this.setState({TitleButtonDeAc: 'Activar'})
        }
    };
    ModificarVenta = (Valor, Index) => {
        this.setState({
            ModalBoolean: !this.state.ModalBoolean,
            KeyModi: Index,
            PrevCantidad: Valor.Cantidad,
            PreProducto: Valor
        })
    }
    CambioIntputG = (event) => {
        const name = event.target.id ? event.target.id : event.target.name;

        const value = event.target.value;
        if (name === 'Precio_Compra' || name === 'Ganancia') {
            if (this.state.Input['Ganancia'] !== undefined && this.state.Input['Precio_Compra'] !== 0) {
                if (name === 'Precio_Compra') {
                    const fin = Inventario.Redondeo((+value) + (+value * (this.state.Input['Ganancia']) / 100));
                    const FinGan = Inventario.Redondeo((+this.state.Input['Precio_Compra']) * (+value) / 100)
                    this.setState({PreVent: fin, GananciaF: FinGan});
                } else if (name === 'Ganancia') {
                    const fin = Inventario.Redondeo((+this.state.Input['Precio_Compra']) + (+this.state.Input['Precio_Compra'] * (+value) / 100));
                    const FinGan = Inventario.Redondeo((+this.state.Input['Precio_Compra']) * (+value) / 100)

                    this.setState({PreVent: fin, GananciaF: FinGan});
                }
            } else {

            }
        }
        const p = this.state.Input;
        p[name] = value.toString().toLocaleUpperCase();
        this.setState({Input: p});
    };
    CambiarIntupN = (event) => {
        const name = event.target.id ? event.target.id : event.target.name;
        const value = (event.target.value).toString().toLocaleUpperCase();
        if (name === 'search') {

            let data = value;
            const products = this.state.TotalProductos;
            data = data.toUpperCase();
            const text = data + ".*";
            const regex = new RegExp(text);
            //console.log(products)

            const Producto = products.filter(e => (regex.test(e.Nombre) || e.Codigo === (value).toString()));
            if (Producto.length !== 0) {
                this.setState({
                    ListaEncabezado: TablaDinamica.getEncabezadoStatico(),
                    listaFinal: this.getTablaDianmica(Producto)
                });
            } else {
                this.setState({
                    ListaEncabezado: TablaDinamica.getEncabezadoStatico(),
                    listaFinal: this.getTablaDianmica(this.state.TotalProductos)
                });
            }
        }
        this.setState({[name]: value});
    }
    Cancelar = () => {
        this.setState({
            Input: Inventario.ArrayInicail(),
            TitleButtonDeAc: 'Desactivar',
            Category: 'Pedro',
            Proveedor: 'Pedro',
            KeyModi: null,
            PreVent: 0.00,
            CodigoActualFire: 0,
            PreProducto: '',
            PrevCantidad: '',
            Image:null,
            EstadoImagen:false,
            CargaImage:0
        });

    };
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
    Aceptar = () => {
        this.setState({Conexion: true});
        if (this.state.Categorys !== 'Pedro',
            this.state.Input.Nombre !== '' &&
            this.state.Input.Stock !== '' &&
            this.state.Input.Cantidad !== '' &&
            this.state.Input.Ganancia !== 0 &&
            this.state.Input.Precio_Compra !== 0 &&
            this.state.Input.CantidadP !== '' &&
            this.state.Proveedor !== 'Pedro' && this.state.PreVent !== 0) {
            if (this.state.KeyModi === null) {
                if(this.state.EstadoImagen !== false || this.state.EstadoImagen !== 'Pendiente'){
                    if (this.state.Input.Codigo === '') {
                        let Vara = this.state.CodigoActualFire[0];
                        let AcutalB = parseInt(Vara.substr(2, this.state.CodigoActualFire.length));
                        let Nuevo = AcutalB + 1;
                        Universal.UpdateUniversal('Extras', {ActualCodigo: 'CP' + Nuevo}).then(() => {
                            let ArraT = this.state.Input;
                            ArraT.Codigo = 'CP' + Nuevo;
                            this.setState({Conexion: false});
                            this.setState({Input: ArraT}, () => {
                                Universal.PushUniversal('Product', {
                                    ...this.state.Input,
                                    "Categoria": this.state.Category.value,
                                    "Provedor": this.state.Proveedor.value,
                                    "Precio_Venta": this.state.PreVent,
                                    "Image": this.state.Image,
                                    "GananciaFinal": this.state.GananciaF,
                                    "FechaRegistro": this.hoyFecha()
                                }).then(() => {
                                    this.Alerta('Producto Agregado', true);
                                    this.Cancelar();
                                    this.Consulta();
                                    this.setState({EstadoImagen:false});
                                });
                            });

                        });
                    } else {
                        Universal.PushUniversal('Product', {
                            ...this.state.Input,
                            "Categoria": this.state.Category.value,
                            "Provedor": this.state.Proveedor.value,
                            "Precio_Venta": this.state.PreVent,
                            "Image": this.state.Image,
                            "GananciaFinal": this.state.GananciaF,"FechaRegistro": this.hoyFecha()
                        }).then(() => {
                            this.Alerta('Producto Agregado', true);
                            this.Cancelar();
                            this.Consulta();
                            this.setState({Conexion: false});
                            this.setState({EstadoImagen:false});
                        });
                    }
                }else{
                    this.Alerta('Imagen subiendo al servidor o Selecciona una imagen con formato valido');
                }

            } else {
                //console.log(this.state.GananciaF)
                let Datos = {
                    ...this.state.Input,
                    "Categoria": this.state.Category.value,
                    "Provedor": this.state.Proveedor.value,
                    "Precio_Venta": this.state.PreVent,
                    "GananciaFinal": this.state.GananciaF
                };
                console.log(this.state.EstadoImagen);
                if (this.state.EstadoImagen !== false) {
                 //   console.log(this.state.EstadoImagen);
                    if(this.state.EstadoImagen !== false && this.state.EstadoImagen !== 'Pendiente'){
                        Datos.Image = this.state.Image;
                        Universal.UpdateUniversal('Product/' + this.state.KeyModi, Datos).then(() => {
                            this.Consulta();
                            this.Alerta('Producto Modificado', true);
                            this.setState({Conexion: false});
                            this.setState({EstadoImagen:false});
                        }).catch(() =>
                            this.Alerta('Error en su conexión', false)
                        );
                        this.setState({EstadoImagen:false});
                        this.Cancelar();
                    }else{
                        this.setState({Conexion: false});
                        this.Alerta('Imagen subiendo al servidor: '+this.state.CargaImage + " %");
                    }

                }else{
                    Universal.UpdateUniversal('Product/' + this.state.KeyModi, Datos).then(() => {
                        this.Consulta();
                        this.Alerta('Producto Modificado', true);
                        this.setState({Conexion: false});
                        this.setState({EstadoImagen:false});
                    }).catch(() =>
                        this.Alerta('Error en su conexión', false)
                    );
                    this.setState({EstadoImagen:false});
                    this.Cancelar();
                }


            }
        } else {
            this.setState({Conexion: false});
            this.Alerta('Datos incompletos', false)
        }
       /* window.location.reload();
        console.log(this.state.EstadoImagen)*/
    };
    Alerta = (variable, tipo, tiempo = 1000) => {
        tipo ? Alert.success(variable, {
            position: 'top-right',
            effect: 'bouncyflip',
            timeout: tiempo
        }) : Alert.error(variable, {
            position: 'top-right',
            effect: 'bouncyflip',
            timeout: tiempo
        });
    };
    Consulta = () => {
        Universal.ConsultaUniversal('Product').then(e => {
            this.setState({TablaVacia: false, TotalProductos: e});
            this.Tabla(e);
        }).catch(e => {
            //console.log('error')
        })
        Universal.ConsultaUniversalSinKey('Extras').then((e) => {

            this.setState({CodigoActualFire: e})
        })
    };
    Eliminar = () => {
        this.setState({Conexion: true});
        let EstadoFinal = 'Desactivado';
        let MensajeConfirmacion = 'Producto Desactivada';
        if (this.state.TitleButtonDeAc === 'Activar') {
            EstadoFinal = 'Activo';
            MensajeConfirmacion = 'Producto Activo';
        }
        if (this.state.KeyModi !== null) {
            Universal.UpdateUniversal('Product/' + this.state.KeyModi, {Estatus: EstadoFinal}).then(() => {
                this.setState({Conexion: false});
                this.Alerta(MensajeConfirmacion, true);
                this.Cancelar();
                this.Consulta();
            }).catch(() => this.Alerta("Fallo con la base de datos", false));
        } else {
            this.setState({Conexion: false});
            this.Alerta('Seleccione una Área primero', false);
        }
    };

    ConsultaComboxs = () => {
        Universal.ConsultaSelect('Category').then(e => {
            this.setState({Categorys: e});
        });
        Universal.ConsultaSelect('Provider').then(e => {
            this.setState({Proveedores: e});
            this.Consulta();
        });
    }

    componentWillMount() {
        const p = Login.DesencriptarG(window.localStorage.getItem("TipoC"));
        this.setState({TipoClient: JSON.parse(JSON.parse(p).Tipo === "Vendedor") ? false : true})
        this.setState({Input: Inventario.ArrayInicail()})

        this.ConsultaComboxs();
    }

    CambioCategory = (selectedOption) => {
        this.setState({Category: selectedOption});
    };
    CambioProvee = (selectedOption) => {
        this.setState({Proveedor: selectedOption});
    };
    mensajeFinalizado=(Mensaje,Documento)=>{
        //console.log(Documento)
        this.Alerta(Mensaje,true);
        this.setState({Image: Documento, EstadoImagen: true},()=>console.log(this.state.Image));
    }
    CargarImagen=(event)=> {
        this.setState({EstadoImagen:'Pendiente'});

        if(event.target.files[0].name !== undefined){
            //console.log(event.target.files[0].name);
            //console.log(event.target.files[0])
            let subida = firebaseStorage.ref(`Productos/${event.target.files[0].name}`).put(event.target.files[0]);
            subida.on('state_changed', (snapshot)=> {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    let  progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(1);
                    this.setState({CargaImage:progress});
                },
                (error)=>{
                    console.log('Error al subir el archivo', error);
                },
                ()=>{
                    subida.snapshot.ref.getDownloadURL().then(e=> this.mensajeFinalizado('Subida completada',e)).catch(e=>{
                        this.Alerta('Error al subirlo al servidor')
                       // console.log(e)
                    });
                    //console.log('Subida completada');
                });
        }
    }


    getBoolean = (r) => {
        this.setState({ModalBoolean: r});
    }
    getRespuesta = (r) => {

        this.setState({Conexion: true});
        Universal.UpdateUniversal('Product/' + this.state.KeyModi, {Cantidad: r}).then(() => {
            this.Alerta('Inventario Actualizado', true);
            this.Consulta();
            this.setState({Conexion: false});
        });

        this.Cancelar();
    }

    CBUnico = () => {
        this.props.history.push({
            pathname: "/Principal/Codigos",
            Codigos: <><Barcode value={this.state.Input.Codigo}/>
                <QRCode value={this.state.Input.Codigo}/></>
        });
    }

    render() {
        const Tabla = this.state.TablaVacia ? <Preload/> :
            this.state.TipoClient ?
                <div className="col-12" style={{margin: "0%",height: "60rem"}}>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <h1> Agregar Productos</h1>
                            <div className='col-auto row' style={{margin: '0%'}}>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <label className="sr-only" htmlFor="inlineFormInputGroup">Nombre:</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">Nombre
                                            </div>
                                        </div>
                                        <input onChange={this.CambioIntputG}
                                               id='Nombre' value={this.state.Input.Nombre}
                                               type="text" className="form-control" placeholder="Nombre"/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <label className="sr-only" htmlFor="inlineFormInputGroup">Stock:</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">Stock</div>
                                        </div>
                                        <input onChange={this.CambioIntputG}
                                               id='Stock' value={this.state.Input.Stock}
                                               type="number" className="form-control" placeholder="Stock"/>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <label className="sr-only" htmlFor="inlineFormInputGroup">Cantidad:</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">Piezas
                                            </div>
                                        </div>
                                        <input onChange={this.CambioIntputG}
                                               id='Cantidad' value={this.state.Input.Cantidad}
                                               type="number" className="form-control" placeholder="Cantidad"/>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <label className="sr-only" htmlFor="inlineFormInputGroup">Cantidad x
                                        Paquete:</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">CxP
                                            </div>
                                        </div>
                                        <input onChange={this.CambioIntputG}
                                               id='CantidadP' value={this.state.Input.CantidadP}
                                               type="number" className="form-control"
                                               placeholder="Cantidad por Paqute"/>
                                    </div>
                                </div>


                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <label className="sr-only" htmlFor="inlineFormInputGroup">Codigo de Barras :</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"> Codigo
                                            </div>
                                        </div>
                                        <input onChange={this.CambioIntputG}
                                               id='Codigo' value={this.state.Input.Codigo}
                                               type="text" className="form-control" placeholder="Codigo de Barras"/>
                                    </div>
                                </div>


                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <label className="sr-only" htmlFor="inlineFormInputGroup">Ganancia:</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">Ganancia</div>
                                        </div>
                                        <input onChange={this.CambioIntputG}
                                               id='Ganancia' value={this.state.Input.Ganancia}
                                               type="number" className="form-control" placeholder="%"/>
                                    </div>
                                </div>


                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <label className="sr-only" htmlFor="inlineFormInputGroup">Precio:</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">P.Compra</div>
                                        </div>
                                        <input onChange={this.CambioIntputG}
                                               id='Precio_Compra' value={this.state.Input.Precio_Compra}
                                               type="number" className="form-control" placeholder="Precio Compra"/>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <label className="sr-only" htmlFor="inlineFormInputGroup">Precio Venta:</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">P. Venta</div>
                                        </div>
                                        <label className="form-control"> {this.state.PreVent} </label>
                                    </div>
                                </div>

                            </div>
                            <div className='col-auto row' style={{margin: '0%', marginTop: "1rem", padding: "0%"}}>
                                <div className="col-12">
                                    <div className='col-auto row' style={{margin: '0%'}}>
                                        <label className="sr-only" htmlFor="inlineFormInputGroup">Categoría:</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">Categoría</div>
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
                                </div>
                                <div className="col-12">
                                    <div className='col-auto row' style={{margin: '0%'}}>
                                        <label className="sr-only" htmlFor="inlineFormInputGroup">Proveedor:</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">Proveedor</div>
                                            </div>
                                            <div style={{width: '100%'}}>
                                                <Select
                                                    value={this.state.Proveedor}
                                                    onChange={this.CambioProvee}
                                                    options={this.state.Proveedores}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className='col-auto row' style={{margin: '0%'}}>
                                        <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                            <label
                                                className="text-center col-xs-6 col-sm-6 col-6 col-form-label font-weight-bold">IMAGEN</label>

                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                                    <input className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8" type="file"  style={{color: '#000'}} accept="image/png, .jpeg, .jpg, image/gif"
                                                           onChange={this.CargarImagen.bind(this)}/>

                                                <label className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3" style={{cursor:'none'}}>{this.state.CargaImage} %</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group Botones col-auto">
                            <div className="m-lg-3 m-1">
                                {  (this.state.EstadoImagen === true || this.state.KeyModi !== null) ? <button type="button" onClick={this.Aceptar}  className="btn btn-outline-success">
                                    Aceptar
                                </button>:null                 }
                            </div>

                            {(this.state.KeyModi !== null) ? <div className="m-lg-3 m-1">
                                <button type="button" onClick={this.CBUnico} className="btn btn-outline-warning">
                                    Imprimir Codigo
                                </button>
                            </div> : null}


                            <div className="m-lg-3 m-1">
                                <button type="button" onClick={this.Eliminar}
                                        className="btn btn-outline-secondary">{this.state.TitleButtonDeAc}</button>
                            </div>
                            <div className="m-lg-3 m-1">
                                <button type="button" onClick={this.Cancelar} className="btn btn-outline-danger">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>

                        <div className="col-12 row">
                            <div className="box">
                                <div className="container-2">
                                    <span className="icon"><i className="fa fa-search"></i></span>
                                    <input type="search" id="search" placeholder="Search..."
                                           onChange={this.CambiarIntupN} value={this.state.search}/>
                                </div>
                            </div>
                        </div>

                    <div className=" PrincipalTaU col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 "
                         style={{paddingLeft: '0%', paddingRight: '0%', margin: '0%'}}>
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

                </div>

                :
                <>

                    <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 "
                         style={{paddingLeft: '0%', paddingRight: '0%', margin: '0%',height: "50rem"}}>
                        <div className="col-12 row">
                            <div className="box">
                                <div className="container-2">
                                    <span className="icon"><i className="fa fa-search"></i></span>
                                    <input type="search" id="search" placeholder="Search..."
                                           onChange={this.CambiarIntupN} value={this.state.search}/>
                                </div>
                            </div>
                        </div>


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

                </>

        ;
        return (
            <div className="Contenedor row" style={{margin: "auto", height: '100%'}}>
                <Alert stack={{limit: 3}}/>
                <ModalUniversal Open={this.state.ModalBoolean} Titulo="Ingrese la cantidad de producto"
                                Contenido={<div className='col-12 row' style={{margin: '0%'}}>
                                    <div className="col-12" style={{padding: '0%'}}>
                                        <label className="sr-only" htmlFor="inlineFormInputGroup">Total:</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">Total</div>
                                            </div>
                                            <input id='ModalNombre' type="number" className="form-control"
                                                   placeholder="12"/>
                                        </div>
                                    </div>
                                    <h4> Seleccione el Tipo de Ingreso: </h4>
                                    <div className="m-lg-3 m-1">
                                        <button id='bt1' type="button" onClick={
                                            () => {
                                                document.getElementById("bt1").className =
                                                    document.getElementById("bt1").className.replace(/(?:^|\s)btn-outline-secondary(?!\S)/g, ' btn-secondary');
                                                document.getElementById("bt2").className =
                                                    document.getElementById("bt2").className.replace(/(?:^|\s)btn-secondary(?!\S)/g, ' btn-outline-secondary');
                                            }
                                        }
                                                className="btn btn-outline-secondary">Paquetes
                                        </button>
                                    </div>
                                    <div className="m-lg-3 m-1">
                                        <button id='bt2' type="button" onClick={() => {
                                            document.getElementById("bt2").className =
                                                document.getElementById("bt2").className.replace(/(?:^|\s)btn-outline-secondary(?!\S)/g, ' btn-secondary');
                                            document.getElementById("bt1").className =
                                                document.getElementById("bt1").className.replace(/(?:^|\s)btn-secondary(?!\S)/g, ' btn-outline-secondary');
                                        }}
                                                className="btn btn-outline-secondary">Cantidad
                                        </button>
                                    </div>

                                </div>} button={<div>
                    <button type="button" onClick={() => {
                        const MC = document.getElementById('bt1').className;
                        //ModalC no existe y cambia por botones
                        const MN = document.getElementById('bt2').className;
                        if (MN !== 'btn btn-outline-secondary') {
                            const a = +(document.getElementById('ModalNombre').value) + (+this.state.PrevCantidad);
                            this.getRespuesta(a);
                            this.getBoolean(false)
                        } else if (MC !== 'btn btn-outline-secondary') {
                            const CxP = +(document.getElementById('ModalNombre').value) * (+this.state.PreProducto.CantidadP)
                            const a = CxP + (+this.state.PrevCantidad);
                            this.getRespuesta(a);
                            this.getBoolean(false);
                        } else {
                            this.Alerta('Ingrese algun tipo de valor', false);
                        }

                    }} className="btn btn-outline-success">
                        Aceptar
                    </button>
                </div>} getBolean={this.getBoolean} getResponse={this.getRespuesta}
                />
                {this.state.Conexion ? <PreloadC/> : null}
                {Tabla}
            </div>
        );
    }
}

export default AgregarProducto;
