import React from 'react';
import styled from "styled-components";
import Preload from '../../Componentes/Preload';
import PreloadC from '../../Componentes/PreloadCarga';
import Universal from "../../Helpers/Universal";
import Barcode from 'react-barcode';
import ClienteH from '../../Helpers/Clientes';
import TablaDinamica from "../../Helpers/TablaDinamica";
import TablaR from "../../Componentes/customers/tableCustomers";
import QRCode from 'qrcode.react';
import {NotificationManager} from "react-notifications";
import {useHistory} from "react-router-dom";
import {colorPalette} from "../../system/styles/styles";
import { v4 as uuid }  from "uuid";

const Customers = (props) => {
    const { className } = props;
    const NoValidad = [
        'Key',
        'ApellidoPa',
        'ApellidoMa',
        'CBKEY',
        'Usuario',
        'Fecha'
    ];
    const history = useHistory();
    const CambiosJson = {"CB": 'Codigo'};
    const textInput = React.createRef();
    const [state, setState] = React.useState({
        // Nuevos datos
        name: '',
        lastName: '',
        direction: '',
        modelCar: '',
        phone: '',
        description: '',
        brand: '',
<<<<<<< HEAD

=======
        edit: false,
>>>>>>> 40106371216e0edda3abacd9df8859033e7221e6

        // Antiguos datos
        TablaVacia: true,
        Codigo: 'Pedro',
        Codigos: [],
        TitleButtonDeAc: 'Desactivar',
        KeyModi: null,
        listaFinal: [],
        ListaEncabezado: [],
        ListaImprimirBarras: [],
        Conexion: false,
        Teleno:''
    });

    const onChangeInput = ({ target }) => {
        const name = target.name;
        const value = target.value;
        setState(prev => ({ ...prev, [name]: value}));
    };

<<<<<<< HEAD
    const loadUpdate = (valor) => {
        textInput.current.focus();
        setState(prev => ( {
            ...prev,
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
        } ));

    };
=======

>>>>>>> 40106371216e0edda3abacd9df8859033e7221e6


    const tableCustomers = (value) => {
        setState(prev => (
            {
                ...prev,
                ListaEncabezado: TablaDinamica.getEncabezado(value, NoValidad, CambiosJson),
                listaFinal: value
            }
        ) )
    }

    const consulta = async () => {
        try {
            const data = await Universal.ConsultaSelectOrder('CodigosBarras', 'Estado', true);
            setState( prev=> ({...prev, Codigos: data}));
            const codeBars = await Universal.ConsultaUniversal('CodigosBarras');
            setState(prev => ({...prev,ListaImprimirBarras: codeBars }))
            const customers = await Universal.ConsultaUniversal('Clientes');
            setState( prev => ({ ...prev, TablaVacia: false, OfetasTotal: customers}) );
            tableCustomers(customers)
        }catch (e) {
            NotificationManager.error("Error en el servidor");
        }
    };

    const cancel = () => {
        setState( prev => ({
            ...prev,
            name: '',
            lastName: '',
            direction: '',
            modelCar: '',
            phone: '',
            description: '',
            brand: '',
            TitleButtonDeAc: 'Desactivar',
<<<<<<< HEAD
        }));
    };
    const deleteFunct =  async () => {
        setState(prev => ({ ...prev, Conexion: true}));
        if (state.KeyModi !== null) {
            setState(prev => ({ ...prev,TablaVacia: true}));
            let ValorAE;
            (state.TitleButtonDeAc === "Desactivar") ? ValorAE = false : ValorAE = true;
            try {
                await Universal.UpdateUniversal('Clientes/' + state.KeyModi, {'Estado': ValorAE});
                setState(prev => ({ ...prev,Conexion: false}));
                cancel();
                NotificationManager.success('Cliente Modificado');
                await consulta();
            }catch (e) {
                NotificationManager.error("Error en el servidor")
            }
        } else {
            setState(prev=>({...prev,Conexion: false}));
            cancel();
            NotificationManager.error('Seleccione un Cliente');
        }
    };
=======
            edit: false
        }));
    };
>>>>>>> 40106371216e0edda3abacd9df8859033e7221e6

    React.useEffect(
        async () =>{
            document.title = `Clientes`;
            await consulta();
        }, []
    );

<<<<<<< HEAD
    const onChangeCode = (code) => {
        setState(prev=>({...prev,Codigo: code}));
    }

    const codeBar = () => {
        const p = state.ListaImprimirBarras[state.ListaImprimirBarras.length - 1];
        if (p !== undefined) {
            const UltimoCodigo = p.Codigo;
            const NumeroSinCeros = parseInt(UltimoCodigo.substr(1, UltimoCodigo.length));
            let ArrayMas = [];
            for (let i = 1; i <= 20; i++) {
                ArrayMas.push(
                    <>
                        <Barcode key={i} value={'C' + ClienteH.ConvertirCodigoValido(NumeroSinCeros + i, 7)}/>
                        <QRCode key={i} value={'C' + ClienteH.ConvertirCodigoValido(NumeroSinCeros + i, 7)}/>
                    </>
                );
                Universal.PushUniversal('CodigosBarras',
                    {'Estado': true, "Codigo": 'C' + ClienteH.ConvertirCodigoValido(NumeroSinCeros + i, 7)});
            }
            history.push({
                pathname: "/Customers/Codigos",
                Codigos: ArrayMas
            });
        } else {
            let ArrayMas = [];
            for (let i = 1; i <= 20; i++) {
                ArrayMas.push(
                    <>
                        <Barcode value={'C' + ClienteH.ConvertirCodigoValido(0 + i, 7)}/>
                        <QRCode value={'C' + ClienteH.ConvertirCodigoValido(0 + i, 7)}/>
                    </>
                );
                Universal.PushUniversal('CodigosBarras',
                    {'Estado': true, "Codigo": 'C' + ClienteH.ConvertirCodigoValido(0 + i, 7)});
            }
            history.push({
                pathname: "/Customers/Codigos",
                Codigos: ArrayMas
            });
        }
    }
    const codeBarPersonal = () => {
        history.push({
            pathname: "/Customers/Codigos",
            Codigos: <>
                <Barcode value={state.Codigo}/>
                <QRCode value={state.Codigo}/>
            </>
        });
    }

=======
>>>>>>> 40106371216e0edda3abacd9df8859033e7221e6
    const validateVarEmpty = (value) => {
        return value !== "";
    }
    const onSubmitForm = async () => {
        const {
            name,
            lastName,
            direction,
            phone,
            description,
            modelCar,
<<<<<<< HEAD
            brand
=======
            brand,
            edit
>>>>>>> 40106371216e0edda3abacd9df8859033e7221e6
        } = state;
        if (
           validateVarEmpty(name) &&
           validateVarEmpty(lastName) &&
           validateVarEmpty(direction) &&
           validateVarEmpty(phone) &&
           validateVarEmpty(description) &&
           validateVarEmpty(modelCar) &&
           validateVarEmpty(brand)
        ) {
            const payload = {
                name,
                lastName,
                direction,
                phone,
                description,
                modelCar,
                brand,
<<<<<<< HEAD
                createdAt: new Date(),
                invoice: uuid(),
                status: 1
            };
            await Universal.PushUniversal("Clientes", payload );
            setState(prev=> ({...prev,Conexion: false}));
            await consulta();
            NotificationManager.success("Cliente agregado");
            await cancel();
=======
                status: edit ? state.status : 1
            };

            if(edit) {
                await Universal.UpdateUniversal(`Clientes/${state.Key}`,payload);
                setState(prev=> ({...prev,Conexion: false}));
                await consulta();
                NotificationManager.success("Cliente actualizado");
                await cancel();
            } else {
                payload.invoice =uuid();
                payload.createdAt = new Date();
                await Universal.PushUniversal("Clientes", payload );
                setState(prev=> ({...prev,Conexion: false}));
                await consulta();
                NotificationManager.success("Cliente agregado");
                await cancel();
            }
>>>>>>> 40106371216e0edda3abacd9df8859033e7221e6
        } else {
            NotificationManager.error("Datos Vacíos")
        }

    }

    const onSelectData = async (obj) => {
<<<<<<< HEAD
        console.log(obj)
=======
        setState( prev => ( {
            ...prev,
            ...obj,
            edit: true
        }))
>>>>>>> 40106371216e0edda3abacd9df8859033e7221e6
    }

    const Tabla = state.TablaVacia ? <Preload/>
        :
        (
            <main>
                <header> Agregar Clientes </header>
                <section>
                    <article>
                        <form className="boxMain">
                            <h2> Datos Personales </h2>
                            <div className="boxInput" >
                                <label> Nombre: </label>
                                <input
                                    name="name"
                                    value={state.name}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <div className="boxInput" >
                                <label> Apellido(s): </label>
                                <input
                                    name="lastName"
                                    value={state.lastName}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <div className="boxInput" >
                                <label> Dirección: </label>
                                <input
                                    name="direction"
                                    value={state.direction}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <div className="boxInput" >
                                <label> Teléfono: </label>
                                <input
                                    name="phone"
                                    value={state.phone}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <div className="boxInput" >
                                <label> Descripción: </label>
                                <input
                                    name="description"
                                    value={state.description}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <hr/>
                            <h2> Datos Automovil </h2>

                            <div className="boxInput" >
                                <label> Modelo: </label>
                                <input
                                    name="modelCar"
                                    value={state.modelCar}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <div className="boxInput" >
                                <label> Marca: </label>
                                <input
                                    name="brand"
                                    value={state.brand}
                                    onChange={onChangeInput}
                                />
                            </div>

                            <hr/>
<<<<<<< HEAD
                            <button type="button" onClick={onSubmitForm}> Aceptar </button>
=======
                            <button type="button" onClick={onSubmitForm}> { state.edit ? "Actualizar" : "Aceptar" }  </button>
>>>>>>> 40106371216e0edda3abacd9df8859033e7221e6
                        </form>
                    </article>
                    <article>
                        <div className="boxMain">
                            <TablaR values={state.listaFinal} headers={state.ListaEncabezado} funcSelect={onSelectData} />
                        </div>
                    </article>
                </section>
            </main>
        );
    return (
        <div className={className}>
            {state.Conexion ? <PreloadC/> : null}
            {Tabla}
        </div>
    );

}

export default styled(Customers)`
    main {
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
      section {
        display: grid;
        grid-template-columns: 40% 60%;
        width: 100%;
        height: 100%;
        .boxMain {
          background-color: ${colorPalette.white};
          width: 90%;
          height: 85%;
          overflow: auto;
          border-radius: 10px;
          margin: auto;
          padding: 30px;
          box-shadow: ${colorPalette.boxShadowLigth};
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        article {
          height: 100%;
          padding: 10px;
          display: flex;
          form {
            h2 {
              font-family: ${colorPalette.fontMain};
              font-size: 20px;
              text-transform: uppercase;
            }
            .boxInput {
              display: flex;
              justify-items: center;
              align-items: center;
              gap: 15px;
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
            button {
              background-color: ${colorPalette.secondColor};
              border-radius: 10px;
              color: ${colorPalette.white};
              letter-spacing: 0.5px;
              padding: 5px 0;
            }
          }
        }
      }
    }
`;
