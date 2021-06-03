import React from "react";

class TablaDinamica {
    static getEncabezado=(valor,NoEntrar=[],json={})=>{
        let Encabezado = [];
        if(valor.length !== 0){
            Object.keys(valor[0]).forEach((Frase, index) => {
                if(Object.values(json).length){
                    const CambiCom = this.Cambio(Frase,json);
                    if(CambiCom === undefined){
                        if(this.EncabezadoValido(Frase,NoEntrar)=== undefined){
                            Encabezado.push(<td key={index}>{Frase}</td>);
                        }
                    }else{
                        if (this.EncabezadoValido(Frase, NoEntrar) === undefined) {
                            Encabezado.push(<td key={index}>{json[CambiCom]}</td>);
                        }
                    }
                }else{
                    if(this.EncabezadoValido(Frase,NoEntrar)=== undefined){
                        Encabezado.push(<td key={index}>{Frase}</td>);
                    }
                }
            });
            return Encabezado.reverse();
        }else{
            return [];
        }
    };
    static  Cambio =(Valor,Cambio)=>{
        return Object.keys(Cambio).find(e=>e === Valor);
    }
    static EncabezadoValido=(Valor,Evitar=[])=>{
       return  Evitar.find(Value=>Value===Valor);
    }
    static getTablaDianmica=(Array,NoEntrar=[],json={})=>{
        let Valores=[];
        Object.values(Array).forEach((item, index) => {
            let Valor = [];
            this.getEncabezado(Array,NoEntrar).forEach((frase, index) => {
                Valor.push(<td key={index}>{item[frase.props.children]}</td>);
            });
            //   console.log(Valor);
            Valores.push(<tr key={index}>{Valor}</tr>);
        });
        return Valores;
    };
    static getTablaDianmica4=(Array,NoEntrar=[],json={},Funtion=null)=>{
        let Valores=[];
        Object.values(Array).forEach((item, index) => {
            let Valor = [];
            this.getEncabezado(Array,NoEntrar).forEach((frase, index) => {
                if(frase.props.children === 'Estado'){
                    Valor.push(<td key={index}>{item[frase.props.children]  ? 'Activo':'Inactivo'}</td>);
                }else{
                    Valor.push(<td key={index}>{item[frase.props.children]}</td>);
                }
            });
            //   console.log(Valor);
            Valores.push(<tr onClick={()=>Funtion(item)} key={index}>{Valor}</tr>);
        });
        return Valores;
    };



    static getTablaDianmica3=(Array,NoEntrar=[],json={},Funtion=null)=>{
        let Valores=[];
        Object.values(Array).forEach((item, index) => {
            let Valor = [];
            this.getEncabezado(Array,NoEntrar).forEach((frase, index) => {
                if(frase.props.children === 'Estado'){
                    Valor.push(<td key={index}>{item[frase.props.children]  ? 'Activo':'Inactivo'}</td>);
                }else if(frase.props.children === 'Codigo'){
                    Valor.push(<td key={index}>{item['CB']}</td>);
                }else{
                    Valor.push(<td key={index}>{item[frase.props.children]}</td>);
                }
            });
            //   console.log(Valor);
            Valores.push(<tr onClick={()=>Funtion(item)} key={index}>{Valor}</tr>);
        });
        return Valores;
    };
    static getTablaDianmica2=(Array,NoEntrar=[],json={})=>{
        let Valores=[];
        Object.values(Array).forEach((item, index) => {
            let Valor = [];
            this.getEncabezado(Array,NoEntrar,json).forEach((frase, index) => {
               if(frase.props.children !== 'Productos'){
                   Valor.push(<td key={index}>{item[frase.props.children]}</td>);
               }else{
                   Valor.push(<td key={index}>{Object.keys(item[frase.props.children]).length}</td>);
               }
            });
            //   console.log(Valor);
            Valores.push(<tr key={index}>{Valor}</tr>);
        });
        return Valores;
    };

    static getEncabezadoStatico=()=>{
        let Encabezado = [];
        Encabezado.push(<td key='1'>Nombre</td>);
        Encabezado.push(<td key='2'>Categoria</td>);
        Encabezado.push(<td key='3'>Cantidad</td> );
        Encabezado.push(<td key='4'>Precio_Venta</td> );
        Encabezado.push(<td key='5'>Stock</td>);
        Encabezado.push(<td key='6'>Provedor</td>);
        Encabezado.push(<td key='7'>CantidadP</td>);
        Encabezado.push(<td key='8'>Compra</td>);
        Encabezado.push(<td key='9'>Image</td>);


        return Encabezado;
    };
}
export default TablaDinamica;
