import React from "react";
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";
import {AppBar, Tabs,Tab } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';

const MainTabNotes = styled.main`
  width: 100%;
  .formPersonal {
    padding: 10px;
    h2 {
      font-family: initial;
      font-size: 20px;
      text-transform: uppercase;
    }
    .boxInput {
      width: 100%;
      display: grid;
      grid-template-columns: 20% 80%;
      align-items: center;
      padding: 10px 0;
      label {
        font-family: initial;
        font-size: 18px;
      }
      input {
        font-family: initial;
        font-size: 18px;
      }
      .TotalInput {
        border: none;
        text-align: end;
        &::before {
          content: "$";
          
        }
      }
    }
  }
`;

const TabPanel = props => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
TabPanel.defaultProps = {
    children: {},
    index: 0,
    value: 0
}

const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
})
const TabsNotes = (props) => {
    const { countStep, handleChange } = props;
    const theme = useTheme();
    const [state,setState] = React.useState(
        {
            folio: "",
            name: "",
            direction: "",
            modelCar: "",
            brand: "",
            licensePlate: "",
            createdAt: "",
            lastName: "",
            total: 0,
        }
    );
    const onChangeInput = ({ target }) => {
        const { name, value } = target;
        setState( prev => ({ ...prev, [name]: value }));
    }

    return (
        <MainTabNotes>
            <AppBar
                style={{ margin: "0" }}
                position="static"
            >
                <Tabs
                    value={countStep}
                    onChange={handleChange}
                    centered
                    style={{ backgroundColor: colorPalette.secondColor }}
                >
                    <Tab label="Datos Personales" {...a11yProps(0)} />
                    <Tab label="Detalles de la Nota" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={countStep}
                onChangeIndex={handleChange}
            >

                <TabPanel index={0} value={countStep}>
                    <form className="formPersonal" >
                        <h2> Datos Personales </h2>
                        <div className="boxInput">
                            <label>
                                Folio:
                            </label>
                            <input
                                disabled
                                type="text"
                                name="folio"
                                value={state.folio}
                            />
                        </div>
                        <div className="boxInput">
                            <label>
                                Nombre:
                            </label>
                            <input
                                disabled
                                type="text"
                                name="name"
                                onChange={onChangeInput}
                                value={state.name}
                            />
                        </div>
                        <div className="boxInput">
                            <label>
                                Apellido:
                            </label>
                            <input
                                disabled
                                type="text"
                                name="lastName"
                                onChange={onChangeInput}
                                value={state.lastName}
                            />
                        </div>
                        <div className="boxInput">
                            <label>
                                Dirección:
                            </label>
                            <input
                                disabled
                                type="text"
                                name="direction"
                                onChange={onChangeInput}
                                value={state.direction}
                            />
                        </div>
                        <hr/>
                        <h2> Datos Automovil </h2>
                        <div className="boxInput">
                            <label>
                                Modelo:
                            </label>
                            <input
                                disabled
                                type="text"
                                name="modelCar"
                                onChange={onChangeInput}
                                value={state.modelCar}
                            />
                        </div>
                        <div className="boxInput">
                            <label>
                                Marca:
                            </label>
                            <input
                                disabled
                                type="text"
                                name="brand"
                                onChange={onChangeInput}
                                value={state.brand}
                            />
                        </div>
                        <div className="boxInput">
                            <label>
                                Placa:
                            </label>
                            <input
                                disabled
                                type="text"
                                name="licensePlate"
                                onChange={onChangeInput}
                                value={state.licensePlate}
                            />
                        </div>
                        <div className="boxInput">
                            <label>
                                Fecha:
                            </label>
                            <input
                                type="date"
                                name="createdAt"
                                onChange={onChangeInput}
                                value={state.createdAt}
                            />
                        </div>
                        <hr/>
                        <div className="boxInput">
                            <label>
                                Total:
                            </label>
                            <label
                                className="TotalInput"
                            >
                                {state.total}
                            </label>
                        </div>
                    </form>
                </TabPanel>
                <TabPanel index={1} value={countStep}>
                    hola mundo
                </TabPanel>
            </SwipeableViews>
        </MainTabNotes>
    )
}
TabsNotes.propType = {
    countStep: PropTypes.string,
    handleChange: PropTypes.func
}
TabsNotes.defaultProps = {
    countStep: "",
    handleChange: () => {}
}

export default TabsNotes;