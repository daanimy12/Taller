import React, { createContext } from 'react';
import Universal from "../../../Helpers/Universal";
import moment from "moment";
import ReducerNotes from "./reducerNotes";
import {NotificationManager} from "react-notifications";
const NotesContext = createContext();

const NotesState = (props) => {
    const { children } = props;
    const [ inventary, setInventary ] = React.useState(
        []
    );
    const [stateLocal,setState] = React.useState(
        {
            folio: "",
            name: "",
            direction: "",
            modelCar: "",
            brand: "",
            licensePlate: "",
            createdAt: `${moment().format("YYYY-MM-DD")}`,
            lastName: "",
            total: 0,
            customer: ""
        }
    );
    const [state, dispatch] = React.useReducer(ReducerNotes, stateLocal);
    const [arrayCustomers,setArrayCustomers] = React.useState([]);

    const onClear = () => {
        setState(
            {
                name: "",
                direction: "",
                modelCar: "",
                brand: "",
                licensePlate: "",
                createdAt: `${moment().format("YYYY-MM-DD")}`,
                lastName: "",
                total: 0,
                customer: ""
            }
        )
    }

    const onFolio = () => {
        const data = `SAuto-${Math.floor(Math.random() * 999999)}`;
        setState( prev => ({ ...prev, folio: data }));
    }

    const loadCustomers = async () => {
        const customers = await Universal.ConsultaUniversal('Clientes');
        setArrayCustomers(customers);
    }

    const onSelectCustomer = (id) => {
        const findData = arrayCustomers?.find( (customer) => customer?.invoice === id );
        if(findData) {
            const {
                name,
                lastName,
                brand,
                modelCar,
                direction
            } =  findData;
            setState(
                (prev) => (
                    {
                        ...prev,
                        name,
                        lastName,
                        brand,
                        modelCar,
                        direction
                    }
                )
            )
        } else {
            onClear();
        }

    }

    const onChangeInput = ({ target }) => {
        const { name, value } = target;
        if(name === "customer") onSelectCustomer(value)
        setState( prev => ({ ...prev, [name]: value }));
    }
    const loadData = async  () => {
        const items = await Universal.ConsultaUniversal('Inventario');
        setInventary(items)
    }

    React.useEffect(
        () => {
            onFolio();
            loadCustomers().then();
            loadData().then();
        }, []
    );

    const onChangeInputSelect = ({ target }, id) => {
        const { value } = target;
        if(value < 0) {
            NotificationManager.error("No se aceptan datos negativos")
        }else {
            console.log(id);
            const inventaryLocal = inventary.map((inventa,idx) => ( { ...inventa, idx } ) )
            console.log(inventaryLocal)
            const findArray = inventaryLocal.find( (inve) => inve.Key === id );
            const filterArray = inventaryLocal.filter( (inve) => inve.Key !== id );
            findArray.count = value;
            setInventary(
                [
                    ...filterArray,
                    findArray
                ].sort((a,b) => a.idx - b.idx)
            )
        }
    }

    const value = {
        inventary,
        stateLocal,
        arrayCustomers,
        onClear,
        onFolio,
        loadCustomers,
        onChangeInput,
        onSelectCustomer,
        onChangeInputSelect
    }
    return (
        <NotesContext.Provider
            value={value}
        >
            {children}
        </NotesContext.Provider>
    )
}
NotesState.propTypes = {

}
NotesState.defaultProps = {

}


export const useNotesAction = () => {
    const context = React.useContext(NotesContext);
    if (!context) {
        throw new Error('El provider de las facturas ha fallado')
    }
    return context;
}

export default NotesState;