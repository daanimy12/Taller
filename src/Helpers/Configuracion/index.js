import {firebaseDatabase} from '../../Conexion/fire'
import Helper_Usuario from '../Login'
import Helper from './Fecha'

class index {
    static cantidad(porcentaje = 0, number = 0, nivel) {
        let promises = [];
        promises.push(firebaseDatabase.ref('Niveles/Nivel' + nivel).update({
            'Procentaje': porcentaje,
            'Cantidad': number
        }));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static get_cantidad() {
        let promises = [];
        promises.push(firebaseDatabase.ref('Niveles').once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static cumple() {
        let promises = [];
        promises.push(firebaseDatabase.ref('Clientes').orderByChild('Estado').equalTo(true).once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static Mesas_Create(number) {
        let promises = [];
        promises.push(firebaseDatabase.ref('Mesas').set({
            'Cantidad': 0
        }));
        promises.push(firebaseDatabase.ref('Mesas').set({
            'Cantidad': number
        }));
        for (let i = 0; i < number; i++) {
            promises.push(firebaseDatabase.ref('Mesas/Mesa' + (i + 1)).update({
                'Productos': null,
                'Segunda_Cuenta': false,
                'Total': 0,
                'Cuentas': 1,
                'Mesa': (i + 1),
                'Estatus': true,
                'Cuenta': {
                    'Total': 0
                }
            }));
        }
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static Cantidad_Mesas() {
        let promises = [];
        promises.push(firebaseDatabase.ref('Mesas/Cantidad').once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

}

export default index;
