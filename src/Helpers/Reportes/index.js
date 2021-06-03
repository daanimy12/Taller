import {firebaseDatabase} from "../../Conexion/fire";

class index {

    static Set_Productos() {
        let promises = [];
        promises.push(firebaseDatabase.ref('Product').orderByChild('Estatus').equalTo('Activo').once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }
    static FiltradoFechas(Fecha1, Fecha2, Datos) {
        return Datos.filter(element => element.Fecha >= Fecha1 && element.Fecha <= Fecha2);
    }

   static addZero=(i)=>{
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    };

    static hoyFecha=()=> {
        let hoy = new Date();
        let dd = hoy.getDate();
        let mm = hoy.getMonth() + 1;
        let yyyy = hoy.getFullYear();

        dd = this.addZero(dd);
        mm = this.addZero(mm);

        return yyyy+  '-' + mm + '-'+ dd  ;
    };
    static ConvertirFecha=(fecha)=>{
        let dd = fecha.getDate();
        let mm = fecha.getMonth() + 1;
        let yyyy = fecha.getFullYear();

        dd = this.addZero(dd);
        mm = this.addZero(mm);

        return yyyy+  '-' + mm + '-'+ dd  ;;
    }
    static  sumarDias=(fechaI, dias)=>{
        let fecha = new Date(fechaI)
        fecha.setDate(fecha.getDate() + dias);
        return this.ConvertirFecha(fecha);
    }

    static ProductosStock=(Array,Productos,Provedores)=>{
        let ArratFinal = [];
        Array.forEach(valor=>{
            Object.values(valor.Productos).forEach(value=>{
                let aa =ArratFinal.find(p=>p.Producto === value.Producto_ID);
                let json;
                if(aa=== undefined ) {
                    let ab = Productos.find(p => p.Key === value.Producto_ID);
                    json = {"Cantidad": ab['Cantidad'], "Producto": ab.Key,"Venta":value['Cantidad'] };
                    json.Stock = ab.Stock;
                    json.Faltantes=  ((ab.Cantidad)-(ab.Stock) < 0) ?  -((ab.Cantidad)-(ab.Stock)): 0;
                    json.Provedor =  Provedores.find(q=>q.Key===ab.Provedor).Nombre;
                    ArratFinal.push(json)
                }else{
                    aa.Venta = (+aa.Venta) + (+value.Cantidad);
                }
            })
        });
        ArratFinal.forEach(valo=>{
            valo.Producto = Productos.find(p=>p.Key === valo.Producto).Nombre;
        });


        return ArratFinal.sort((a, b)=>{
            return ( a.Provedor).localeCompare(b.Provedor);
        }).sort((a,b)=>{
            return b-a;
        });
    }
    static ProductosArrayVendedores=(Array,Usuarios)=>{
       return  Array.map(valor=>{
            return valor
        });
    }
    static ProductosArraySo=(Array,Productos)=>{
        let ArratFinal = [];
        Array.forEach(valor=>{
            Object.values(valor.Productos).forEach(value=>{
                let aa =ArratFinal.find(p=>p.Producto === value.Producto_ID);
                if(aa=== undefined ){
                    let json= {"Cantidad":value['Cantidad'], "Producto": value['Producto_ID'] }
                    ArratFinal.push(json)
                }else{
                    aa.Cantidad = (+aa.Cantidad) + (+value.Cantidad);
                }
            })
        });


        ArratFinal.forEach(valo=>{
            valo.Producto = Productos.find(p=>p.Key === valo.Producto).Nombre;
        });


        return ArratFinal;
    }


    //Graficas
    static PaserDateGradfic=(Arrra,TituloGrafica)=>{
        let ArrayT = Arrra.map(o=>{
            return  o.Provedor;
        });
        let labels = ArrayT.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
        let ArrayFinSuma =[];
        let JsonFinal={
            labels: labels
        };
        Arrra.forEach(value=>{
            let jsonFinal={}
            let busquedaProvedor = ArrayFinSuma.find(p=>p.Provedor === value.Provedor);
            if(busquedaProvedor === undefined){
                jsonFinal.Provedor = value.Provedor
                jsonFinal.CantidadV = value.Venta;
                ArrayFinSuma.push(jsonFinal)
            }else{
                busquedaProvedor.CantidadV = (+busquedaProvedor.CantidadV)+(+value.Venta)
            }
        });
        let ArraValores= ArrayFinSuma.map(p=>p.CantidadV);
        ArraValores.push(0)
        let jsonPreFinal={
            label: TituloGrafica,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: ArraValores
        };
        JsonFinal.datasets= [jsonPreFinal]
        return JsonFinal;
    }

    static PaserDateGradfic2=(Arrra,TituloGrafica)=>{

        let ArrayT = Arrra.map(o=>{
            return  o.Producto;
        });
        let labels = ArrayT.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);

        let JsonFinal={
            labels: labels
        };
        let ArraValores= Arrra.map(p=>p.Cantidad);
        ArraValores.push(0)
        let jsonPreFinal={
            label: TituloGrafica,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: ArraValores
        };
        JsonFinal.datasets= [jsonPreFinal]
        return JsonFinal;
    }




    static  RedondeoCajas=(valor)=>{

            const CostoA = valor.toString();
            const IndexPunto = CostoA.indexOf('.');
            if(IndexPunto === -1){
                //console.log('No hay punto);
                return CostoA;
            }else{
                const P = CostoA.substr(IndexPunto+1,CostoA.length);
                const R = CostoA.substr(0,IndexPunto);
                return  CostoA.replace('.'+P,'').replace(R,parseInt(R)+1);
            }

    }
}
export default index;
