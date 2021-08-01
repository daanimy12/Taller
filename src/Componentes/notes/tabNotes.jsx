import React from "react";
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";
import {AppBar, Tabs,Tab } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import TabPersonalData from "./tabPersonalData";
import TabDetails from "./tabDetails";
import moment from "moment";
import Universal from "../../Helpers/Universal";
import {useNotesAction} from "./contextos/contNotes";

const MainTabNotes = styled.main`
  width: 100%;
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
    const {
        stateLocal,
        onChangeInput,
        onSelectCustomer,
        arrayCustomers
    } = useNotesAction();

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
                    <Tab label="Datos de Provedores" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={countStep}
                onChangeIndex={handleChange}
            >

                <TabPanel index={0} value={countStep}>
                    <TabPersonalData
                        onChangeInput={onChangeInput}
                        onSelectCustomer={onSelectCustomer}
                        state={stateLocal}
                        arrayCustomers={arrayCustomers}
                    />
                </TabPanel>
                <TabPanel index={1} value={countStep}>
                    <TabDetails  data={stateLocal} />
                </TabPanel>
                <TabPanel index={2} value={countStep}>
                    <h1>aqui va lo demas</h1>
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