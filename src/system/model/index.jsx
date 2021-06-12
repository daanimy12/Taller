import {firebaseDatabase,firebaseStorage} from "./firebase/firebase";

class modelo {
    static ConsultaUniversal=(ref)=>{
        let promises = [];
        promises.push(firebaseDatabase.ref(ref).once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    };
    static ConsultaUniversalOrder=(ref,Orderby,Equal)=>{
        let promises = [];
        promises.push(firebaseDatabase.ref(ref).orderByChild(Orderby).equalTo(Equal).once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    };

    static UpdateUniversal=(ref,json)=>{
        let promises = [];
        promises.push(firebaseDatabase.ref(ref).update(json));
        return Promise.all(promises).then(values => {
            return true;
        })
    };

    static PushUniversal=(ref,json)=>{
        let promises = [];
        promises.push(firebaseDatabase.ref(ref).push(json));
        return Promise.all(promises).then(values => {
            return true;
        })
    }
    static PushStore=(ref,file)=>{
        let promises = [];
        promises.push(firebaseStorage.ref(`${ref}/${file.name}`).put(file).snapshot.ref.getDownloadURL().then((downloadURL) => {
            return downloadURL;
        }).catch(e=>{return e}));
        return Promise.all(promises).then(task => {
            return task;
        })
    }
}

export default modelo;

