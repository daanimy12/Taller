import React from "react";
import styled from "styled-components";
import { colorPalette } from "../../system/styles/styles";
import Universal from "../../Helpers/Universal";
import moment from "moment";

const FormMain = styled.form`
  padding: 10px;
  h2 {
    font-size: 18px;
    text-transform: uppercase;
  }
  .boxInput {
    width: 100%;
    display: grid;
    grid-template-columns: 20% 80%;
    align-items: center;
    padding: 10px 0;
    label {
      font-size: 16px;
    }
    input, select {
      font-size: 16px;
      border-radius: 10px;
      border: 1px solid ${colorPalette.secondColor};
      padding: 5px;
      &:focus {
        outline: none;
      }
    }
    .TotalInput {
      border: none;
      text-align: end;
      &::before {
        content: "$";

      }
    }
  }
  
`;

const TabPersonalData = () => {

    const [arrayCustomers,setArrayCustomers] = React.useState([]);
    const [state,setState] = React.useState(
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

    const onFolio = () => {
        const data = `SAuto-${Math.floor(Math.random() * 999999)}`;
        setState( prev => ({ ...prev, folio: data }));
    }

    const loadCustomers = async () => {
        const customers = await Universal.ConsultaUniversal('Clientes');
        setArrayCustomers(customers);
    }

    React.useEffect(
        () => {
            onFolio();
            loadCustomers().then();
        }, []
    )

    const onSelectCustomer = (id) => {
        const findData = arrayCustomers.find( (customer) => customer?.invoice === id );
        console.log(findData)
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
    }

    const onChangeInput = ({ target }) => {
        const { name, value } = target;
        if(name === "customer") onSelectCustomer(value)
        setState( prev => ({ ...prev, [name]: value }));
    }


    return (
        <FormMain>
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
                    Cliente:
                </label>
                <select name="customer" onChange={onChangeInput} value={state.customer} >
                    <option value=""> Sin cliente elegido </option>
                    {
                        arrayCustomers.map(
                            customer => (
                                <option value={customer?.invoice}>
                                    { `${customer?.name} ${customer?.lastName} ` }
                                </option>
                            )
                        )
                    }
                </select>
            </div>
            <div className="boxInput">
                <label>
                    Nombre:
                </label>
                <input
                    disabled={state.customer}
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
                    disabled={state.customer}
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
                    disabled={state.customer}
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
                    disabled={state.customer}
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
                    disabled={state.customer}
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
        </FormMain>
    )
}

export default TabPersonalData;