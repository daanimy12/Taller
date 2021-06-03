class Helpers {

    //Devuelve la fecha
    static Get_Fecha() {
        var date = new Date();
        return (date.getFullYear() + '-' + ((parseInt(date.getMonth()) <= 8) ? '0' + (parseInt(date.getMonth()+1)) : parseInt(date.getMonth() + 1)) + '-' + ((parseInt(date.getDate()) <= 9) ? '0' + (parseInt(date.getDate())) : date.getDate()))
    }

    //Devuelve Hora
    static Get_Hora() {
        var date, minutes, seconds;
        date = new Date();
        if (date.getMinutes() < 10) {
            minutes = '0' + date.getMinutes();
        } else {
            minutes = date.getMinutes();
        }
        if (date.getSeconds() < 10) {
            seconds = '0' + date.getSeconds()
        } else {
            seconds = date.getSeconds()
        }
        return (date.getHours() + ':' + minutes + ':' + seconds)
    }

}

export default Helpers;
