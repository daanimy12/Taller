import { useHistory } from "react-router-dom";
let CryptoJS = require("crypto-js");
const HelpersLogin = () => {
    const history = useHistory();
    const CambioURL = (URL) => {
        history.push(URL);
        window.location.reload();
    };
    const Validar = async (data = [], password = '') => {
        let data2 = [];
        // console.log(data)
        data.forEach(e => {
            data2 = {...(e.val())};
        })
        const ciphertext = CryptoJS.SHA256(password);
        let datos = {...data2};
        datos.boolean = true
        if (data2.Pass === ciphertext.toString() && data2.Estado === true) return datos;
        return false;
    }

    const Encriptar = (data = []) => {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'Pedro1');
        window.sessionStorage.setItem('Usuario', ciphertext);
    }

    const EncriptarG = (data = []) => {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'Pedro1');
        return ciphertext;
    }

    const Desencriptar = () => {
        const encrypt = window.sessionStorage.getItem('Usuario');
        if (encrypt !== null){
            const bytes  = CryptoJS.AES.decrypt(encrypt, 'Pedro1');
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            return decryptedData;
        } else {
            return false;
        }
    }
    const DesencriptarG = (datos) => {
        const encrypt = datos;
        if (encrypt !== null){
            const bytes  = CryptoJS.AES.decrypt(encrypt, 'Pedro1');
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            return decryptedData;
        } else {
            return false;
        }
    }

    const Validar_Observador = (data = [], data_storage = []) => {
        let data2 = [];
        data.forEach(e => {
            data2 = {...(e.val())};
        })
        if (data2.Pass === data_storage.Pass && data2.Estado === true) return true;
        return false;
    }

    const Eliminar = () => {
        window.sessionStorage.removeItem('Usuario');
        window.localStorage.removeItem('TipoC');
    }

    return {
        Eliminar,
        Validar,
        Validar_Observador,
        Desencriptar,
        DesencriptarG,
        EncriptarG,
        Encriptar,
        CambioURL
    }
}

export default HelpersLogin;
