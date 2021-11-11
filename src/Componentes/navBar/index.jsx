import React from 'react';
import styled from "styled-components";
import Login from '../../Helpers/Login';
import { useHistory } from "react-router-dom";
import {colorPalette} from "../../system/styles/styles";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ContactsIcon from '@material-ui/icons/Contacts';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListAltIcon from '@material-ui/icons/ListAlt';

const NavBar = (props) => {

    const { Cliente } = props;
    const history = useHistory();

    const cambio = (value) => {
        history.push('/Customers/'+[value]);
    };
    const { Eliminar } = Login();
    const salir = () => {
        // Eliminacion de token //
        Eliminar();
        window.location.reload();
        history.push('/');

    };

    const Menu =  (Cliente === "Administrador") ?
        <div>
            <ListItem button onClick={() => cambio("Clientes")}>
                <ListItemIcon>
                    <ContactsIcon />
                </ListItemIcon>
                <ListItemText primary="Directorio" />
            </ListItem>
            <ListItem button onClick={() => cambio('Usuarios')}>
                <ListItemIcon>
                    <PersonAddIcon id='Usuarios' />
                </ListItemIcon>
                <ListItemText id='Usuarios' primary="Usuarios" />
            </ListItem>
            <ListItem button onClick={() => cambio('Notas')}>
                <ListItemIcon>
                    <ListAltIcon id='Notas' />
                </ListItemIcon>
                <ListItemText id='Notas' primary="Notas" />
            </ListItem>
            <ListItem button onClick={()=> cambio('Inventario')}>
                <ListItemIcon>
                    <AssignmentTurnedInIcon id='Inventario' />
                </ListItemIcon>
                <ListItemText id='Inventario' primary="Inventarios" />
            </ListItem>
            <ListItem button onClick={()=>cambio('Estadisticas')}>
                <ListItemIcon>
                    <BarChartIcon id="Estadisticas" />
                </ListItemIcon>
                <ListItemText id="Estadisticas" primary="Estadisticas" />
            </ListItem>
            <ListItem button onClick={() => salir()}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Salir" />
            </ListItem>
        </div>
        :
        null;
    return (
        <div>
            {Menu}
        </div>
    );
}

export default styled(NavBar)`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: ${colorPalette.white};
  
  nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      margin: 0 auto;
    }
    
    ul {
      margin-top: 15px;
      li {
        list-style: none;
        padding: 15px;
        font-family: ${colorPalette.fontMain};
        font-size: 18px;
        letter-spacing: 0.5px;
        color: ${colorPalette.thirdColor};
        label {
          display: flex;
          gap: 10px;
          cursor: pointer;
        }
        .iconNavBar {
          width: 20px;
        }
      }
    }
  }
`;
