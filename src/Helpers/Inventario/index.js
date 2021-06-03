//import  modelo from '../../Model/firebaseUni';

class Inventario {
    static Redondeo(Costo) {
        const CostoA = Costo.toString();
        const IndexPunto = CostoA.indexOf('.');
        if(IndexPunto === -1){
            //console.log('No hay punto);
            return CostoA;
        }else{
            const P = CostoA.substr(IndexPunto+1,CostoA.length);
            if(P < 50){
                return CostoA.replace('.'+P,'.50');
            }else{
                const R = CostoA.substr(0,IndexPunto);
                return  CostoA.replace(P,'0').replace(R,parseInt(R)+1);
            }

        }
    }
    static ArrayInicail=()=>{
        const arratemp = [];
        arratemp['Estatus'] = 'Activo';
        arratemp['Nombre'] = '';
        arratemp['Stock'] = '';
        arratemp['Cantidad'] = '';
        arratemp['Ganancia'] =0 ;
        arratemp['Precio_Compra'] = 0;
        arratemp['CantidadP']= '';
        arratemp['Codigo']= '';
        return arratemp;
    }
    static ArrayISimple=()=>{
        const arratemp = [];
        arratemp['Nombre'] = '';
        return arratemp;
    }

}

export default Inventario;
