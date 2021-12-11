import { firebaseDatabase, firebaseStorage } from "./firebase/firebase";
class modelo {
    static ConsultaUniversal = (ref) => {
        let promises = [];
        promises.push(firebaseDatabase.ref(ref).once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    };
    static ConsultaUniversalOrder = (ref, Orderby, Equal) => {
        let promises = [];
        promises.push(firebaseDatabase.ref(ref).orderByChild(Orderby).equalTo(Equal).once('value'));
        return Promise.all(promises).then(values => {
            return values[0];
        })
    };

    static UpdateUniversal = (ref, json) => {
        let promises = [];
        promises.push(firebaseDatabase.ref(ref).update(json));
        return Promise.all(promises).then(values => {
            return true;
        })
    };

    static PushUniversal = (ref, json) => {
        let promises = [];
        promises.push(firebaseDatabase.ref(ref).push(json));
        return Promise.all(promises).then(values => {
            return true;
        })
    }
    static PushStore = async (ref, file) => {
        let promises = [];
        var next = function (snapshot) {
            var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            console.log(percent + "% done");
        };
        var error = function (error) {
            console.log('error', error.code)
        };
        var complete = function () {
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            console.log('complete upload...');
        };
        const uploadTask = firebaseStorage.ref(`${ref}/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            next,
            error,
            complete
        )
        promises.push(uploadTask);
        try {
            const callback = async (values) => {
                let downloadURL = await values[0].ref.getDownloadURL();
            return downloadURL;
            }
            const values = await Promise.all(promises);
            let url = await callback(values);
            return url;
        } catch (error) {
            return error;
        }
    }
}

export default modelo;

