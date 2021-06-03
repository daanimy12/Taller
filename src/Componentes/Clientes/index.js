import React, {Component} from 'react';
import Alert from 'react-s-alert';
import Select from "react-select";
import '../../css/Usuario.css';
import Preload from '../Preload';
import PreloadC from '../../Componentes/PreloadCarga';
import Universal from "../../Helpers/Universal";
import Barcode from 'react-barcode';
import ClienteH from '../../Helpers/Clientes';
import TablaDinamica from "../../Helpers/TablaDinamica";
import TablaR from "../../Helpers/Reportes/Tabla";
import QRCode from 'qrcode.react';

class index extends Component {
    NoValidad = ['Key', 'ApellidoPa', 'ApellidoMa', 'CBKEY', 'Usuario', 'Fecha'];
    CambiosJson = {"CB": 'Codigo'};
    textInput = React.createRef();
    state = {
        TablaVacia: true,
        Codigo: 'Pedro',
        Codigos: [],
        Tipo: 'Vendedor',
        TitleButtonDeAc: 'Desactivar',
        pass: '',
        nombre: '',
        AP: '',
        AM: '',
        usuario: '',
        KeyModi: null,
        Fecha: '',
        listaFinal: [],
        ListaEncabezado: [],
        ListaImprimirBarras: [],
        Conexion: false,
        Teleno:''
    };
    CambioInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    Aceptar = () => {
        this.setState({Conexion: true});
        if (this.state.nombre !== '' && this.state.AM !== '' && this.state.AP !== '' &&
            this.state.KeyModi === null && this.state.Codigo !== 'Pedro' && this.state.Teleno !== '' && this.state.Codigo !== 'Pedro') {
            this.setState({TablaVacia: true});
            //Agregar nuevo cliente
            Universal.PushUniversal('Clientes', {
                Nombre: this.state.nombre,
                ApellidoPa: this.state.AP,
                ApellidoMa: this.state.AM,
                Usuario: this.state.usuario,
                Fecha: this.state.Fecha,
                CB: this.state.Codigo.label ? this.state.Codigo.label : 'EPdro',
                CBKEY: this.state.Codigo.value ? this.state.Codigo.value : 'EPdro',
                Teleno:this.state.Teleno,
                Estado: true
            }).then(() => {
                Universal.UpdateUniversal('CodigosBarras/' + this.state.Codigo.value, {Estado: false}).then(() => {
                    this.setState({Conexion: false});
                    this.Consulta();
                    this.Alerta('Cliente Agregado', true);
                    this.Cancelar();
                })
            }).catch(() => this.Alerta('Error en Conexión'))

        } else if (this.state.nombre !== '' && this.state.AM !== '' && this.state.AP !== '' &&
            this.state.KeyModi !== null && this.state.Codigo !== 'Pedro') {
            this.setState({TablaVacia: true});
            let Datos = {
                Nombre: this.state.nombre,
                ApellidoPa: this.state.AP,
                ApellidoMa: this.state.AM,
                Usuario: this.state.usuario,
                Fecha: this.state.Fecha,
                Teleno: this.state.Teleno,
                Estado: true
            };
            Universal.UpdateUniversal('Clientes/' + this.state.KeyModi, Datos).then(() => {
                Universal.UpdateUniversal('CodigosBarras/' + this.state.Codigo.value, {Estado: false}).then(() => {
                    this.setState({Conexion: false});
                    this.Alerta('Cliente Modificado', true);
                    this.Consulta();
                    this.Cancelar();
                });
            });
            //Modifiacar Cliente
        } else {
            this.setState({Conexion: false});
            this.Alerta('Datos incompletos', false)
        }
    };
    CargarModificacion = (valor) => {
        this.textInput.current.focus();
        this.setState({
            Fecha: valor.Fecha,
            TitleButtonDeAc: valor.Estado ? 'Desactivar' : 'Activar',
            pass: '',
            nombre: valor.Nombre,
            AP: valor.ApellidoPa,
            AM: valor.ApellidoMa,
            usuario: valor.Usuario,
            KeyModi: valor.Key,
            Codigo: valor.CB,
            Teleno: valor.Teleno
        });

    };

    Consulta = () => {
        Universal.ConsultaSelectOrder('CodigosBarras', 'Estado', true).then(e => this.setState({Codigos: e}));
        Universal.ConsultaUniversal('CodigosBarras').then(e => {
            this.setState({ListaImprimirBarras: e})
        });
        Universal.ConsultaUniversal('Clientes').then(e => {
            this.setState({TablaVacia: false, OfetasTotal: e});
            this.Tabla(e);
        });

    };
    Tabla = (Valor) => {
        this.setState({
            ListaEncabezado: TablaDinamica.getEncabezado(Valor, this.NoValidad, this.CambiosJson),
            listaFinal: TablaDinamica.getTablaDianmica3(Valor, this.NoValidad, this.CambiosJson, this.CargarModificacion)
        });
    }
    Cancelar = () => {
        this.setState({
            Tipo: 'Vendedor', TitleButtonDeAc: 'Desactivar', pass: '', nombre: '', AP: '', AM: '', Fecha: '',Teleno:'',
            usuario: '', KeyModi: null, Codigo: 'Pedro'
        });
    };
    Eliminar = () => {
        this.setState({Conexion: true});
        if (this.state.KeyModi !== null) {
            this.setState({TablaVacia: true})
            let ValorAE;
            (this.state.TitleButtonDeAc === "Desactivar") ? ValorAE = false : ValorAE = true;
            Universal.UpdateUniversal('Clientes/' + this.state.KeyModi, {'Estado': ValorAE}).then(() => {
                this.setState({Conexion: false});
                this.Cancelar();
                this.Alerta('Cliente Modificado', true);
                this.Consulta();

            });
        } else {
            this.setState({Conexion: false});
            this.Cancelar();
            this.Alerta('Seleccione un Cliente', false);
        }
    };

    componentWillMount() {
        document.title = `Clientes`;
        this.Consulta();
    }

    CambioCodigo = (e) => {
        this.setState({Codigo: e});
    }
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
    CodigoB = () => {
        const p = this.state.ListaImprimirBarras[this.state.ListaImprimirBarras.length - 1];
        if (p !== undefined) {
            const UltimoCodigo = p.Codigo;
            const NumeroSinCeros = parseInt(UltimoCodigo.substr(1, UltimoCodigo.length));
            let ArrayMas = [];
            for (let i = 1; i <= 20; i++) {
                ArrayMas.push(<><Barcode key={i} value={'C' + ClienteH.ConvertirCodigoValido(NumeroSinCeros + i, 7)}/>
                    <QRCode key={i} value={'C' + ClienteH.ConvertirCodigoValido(NumeroSinCeros + i, 7)}/></>);
                Universal.PushUniversal('CodigosBarras',
                    {'Estado': true, "Codigo": 'C' + ClienteH.ConvertirCodigoValido(NumeroSinCeros + i, 7)});
            }
            this.props.history.push({
                pathname: "/Principal/Codigos",
                Codigos: ArrayMas
            });
        } else {
            let ArrayMas = [];
            for (let i = 1; i <= 20; i++) {
                ArrayMas.push(<><Barcode value={'C' + ClienteH.ConvertirCodigoValido(0 + i, 7)}/>
                    <QRCode value={'C' + ClienteH.ConvertirCodigoValido(0 + i, 7)}/></>);
                Universal.PushUniversal('CodigosBarras',
                    {'Estado': true, "Codigo": 'C' + ClienteH.ConvertirCodigoValido(0 + i, 7)});
            }
            this.props.history.push({
                pathname: "/Principal/Codigos",
                Codigos: ArrayMas
            });
        }
    }
    CBUnico = () => {
        this.props.history.push({
            pathname: "/Principal/Codigos",
            Codigos: <><Barcode value={this.state.Codigo}/>
                <QRCode value={this.state.Codigo}/></>
        });
    }

    render() {
        const Tabla = this.state.TablaVacia ? <Preload/>
            :
            <div className="col-12 ">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h1> Agregar Clientes</h1>
                        <button className="btn btn-primary m-2 col-12" onClick={this.CodigoB}> Generar Codigos de
                            Barras
                        </button>
                        <div>
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
                                <label className="sr-only" htmlFor="inlineFormInputGroup">Teléfono:</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Teléfono</div>
                                    </div>
                                    <input value={this.state.Teleno} onChange={this.CambioInput} name='Teleno'
                                           type="text" className="form-control" placeholder="2385936812"/>
                                </div>
                            </div>

                            {(this.state.KeyModi !== null) ? null : <div className="col-auto">
                                <label className="sr-only" htmlFor="inlineFormInputGroup">Codigo de Barras:</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">CB</div>
                                    </div>
                                    <Select
                                        className="col-11"
                                        value={this.state.Codigo}
                                        onChange={this.CambioCodigo}
                                        options={this.state.Codigos}
                                    />
                                </div>
                            </div>}


                            <div className="col-auto">
                                <label className="sr-only" htmlFor="inlineFormInputGroup">Fecha de Nacimiento</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Fecha:</div>
                                    </div>
                                    <input value={this.state.Fecha} onChange={this.CambioInput} name='Fecha' type="date"
                                           className="form-control" placeholder="dd/mm/yyyy"/>
                                </div>
                            </div>


                            <div className="form-group Botones col-auto">
                                <div>
                                    <button type="button" onClick={this.Aceptar} className="btn btn-outline-success">
                                        Aceptar
                                    </button>
                                </div>
                                {(this.state.KeyModi !== null) ? <div>
                                    <button type="button" onClick={this.CBUnico} className="btn btn-outline-warning">
                                        Imprimir Codigo
                                    </button>
                                </div> : null}
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
                        </div>
                    </div>
                    {/* Apartado de la tabla de usuarios */}


                    <TablaR Encabezados={this.state.ListaEncabezado} Valores={this.state.listaFinal}/>
                </div>
            </div>;
        return (

            <div className="Contenedor row">
                <Alert stack={{limit: 3}}/>
                {this.state.Conexion ? <PreloadC/> : null}
                {Tabla}

            </div>


        );
    }
}

export default index;
