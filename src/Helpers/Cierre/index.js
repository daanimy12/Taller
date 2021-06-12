<<<<<<< HEAD
import {firebaseDatabase} from '../../Conexion/fire';
=======
import {firebaseDatabase} from '../../system/model/firebase/firebase';
>>>>>>> f2cd55581963bcbc124e2ee1622cc5a0fec16fee
import Helper from '../Venta/Fecha'

class HelpersVenta {

    static Usuarios() {
        let promises = [];
        promises.push(firebaseDatabase.ref('Ventas').orderByChild('Fecha').equalTo(Helper.Get_Fecha()).once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

    static cierre(user, total, ventas) {
        let promises = [];
        promises.push(firebaseDatabase.ref('Ventas_Cierre').push({
            'User': user,
            'Total': total,
            'Ventas': ventas
        }));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }

}

export default HelpersVenta;
