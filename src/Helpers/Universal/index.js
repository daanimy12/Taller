import  modelo from '../../Model/firebaseUni';

class Universal {
    static ConsultaUniversalSinKey=(ref)=>{
        let promises = [];
        promises.push(modelo.ConsultaUniversal(ref).then(e=>{
            let temp2 = [];
            e.forEach(child => {
                let tem = child.val();
                temp2 = temp2.concat(tem);
            });
            return temp2.sort();
        }));
        return Promise.all(promises).then(values => {
            return values[0];
        });
    }
    static ConsultaUniversal=(ref,tipo='once',snap=null)=>{
        switch (tipo) {
            case 'once':{
                let promises = [];
                promises.push(modelo.ConsultaUniversal(ref).then(e=>{
                    let temp2 = [];
                    e.forEach(child => {
                        let tem = child.val();
                        tem.Key = child.key;
                        temp2 = temp2.concat(tem);
                    });
                    return temp2.sort();
                }));
                return Promise.all(promises).then(values => {
                    return values[0];
                });
            }
            case 'on':{
                if(snap === null){
                    return null;
                }else{
                    let temp2 = [];
                    snap.forEach(child => {
                        let tem = child.val();
                        tem.Key = child.key;
                        temp2 = temp2.concat(tem);
                    });
                    //console.log(temp2)
                    return temp2.sort();
                }
            }
            default:{

            }
        }
    };

    static  Reacomodo=(snam)=>{


    }
    static ConsultaSelect=(ref)=>{
        let promises = [];
        promises.push(modelo.ConsultaUniversal(ref).then(e=>{
            let temp2 = ['Pedro'];
            e.forEach(child => {
                let tem = {};
                tem.value = child.key;
                tem.label = child.val().Nombre;
                temp2 = temp2.concat(tem);
            });
            return temp2.sort();
        }));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    };
    static ConsultaSelectOrder=(ref,Order,Equ)=>{
        let promises = [];
        promises.push(modelo.ConsultaUniversalOrder(ref,Order,Equ).then(e=>{
            let temp2 = ['Pedro'];
            e.forEach(child => {
                let tem = {};
                tem.value = child.key;
                tem.label = child.val().Codigo;
                temp2 = temp2.concat(tem);
            });
            return temp2.sort();
        }));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    };
    static UpdateUniversal=(ref,json)=>{
        let promises = [];
        promises.push(modelo.UpdateUniversal(ref,json));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }
    static PushUniversal=(ref,json)=>{
        let promises = [];
        promises.push(modelo.PushUniversal(ref,json));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    }
    static PushImagen=(ref,file)=>{
        let promises = [];
        promises.push(modelo.PushStore(ref,file));
        return Promise.all(promises).then(values => {
            return values;
        })
    }



    //Generar contraseña Aleatoria

    static GenerarP=(longitud)=>{
        let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
        let contraseña = "";
        for (let i=0; i<longitud; i++) contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
        return contraseña;
    }
}

export default Universal;
