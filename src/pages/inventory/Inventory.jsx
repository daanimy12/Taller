import React, { useState, useEffect } from 'react';
import Form from './Form';
import TableInventory from './TableInventory';
import Universal from "../../Helpers/Universal";
import { NotificationManager } from "react-notifications";
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";


const Inventory = (props) => {
    const { className } = props;
    const [state, setState] = useState([]);

    const getInvetory = async () => {
        try {
            const items = await Universal.ConsultaUniversal('Inventario');
            const response = items;
            setState(response)
        } catch (error) {
            console.log('error: ', error);
        }

    }

    const addOrEdit = async (values, resetForm) => {
        try {
            await Universal.PushUniversal("Inventario", values);
            NotificationManager.success("Herramienta o Refacción agregado");
            resetForm();
            await getInvetory();
        } catch (error) {
            console.log('error: ', error);
            NotificationManager.error('Ocurrió un error');
        }

    }

    useEffect(async () => {
        try {
            await getInvetory();
        } catch (error) {
            console.log('error: ', error);
        }
    }, [])

    const RenderComponents = () => {
        return (
            <main>
                <header> Agregar Herramienta / Refacción </header>
                <section>
                    <article>
                        <Form addOrEdit={addOrEdit} />
                    </article>
                    <article>
                        <div className="boxMain">
                            <TableInventory values={state} />
                        </div>
                    </article>
                </section>
            </main>
        )
    }

    return (
        <div className={className}>
            {<RenderComponents />}
        </div>
    );
}

export default styled(Inventory)`
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
