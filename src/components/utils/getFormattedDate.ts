
const getFormattedDate = (date: string) => {
    //
    const depositDate = new Date(date);

    //depositDate.toLocalString();

    const day = depositDate.getDate();

    // const stringDay= day<10: '0'+day? day;        

    const monthNames = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const month = monthNames[depositDate.getMonth()];

    // Obtener el año
    const year = depositDate.getFullYear();

    // Obtener la hora en formato de 24 horas
    let hours = depositDate.getHours();
    let minutes = depositDate.getMinutes();

    // Agregar un 0 inicial si los minutos son menores a 10
    const stringMinutes = minutes < 10 ? '0' + minutes : minutes;
    const stringHours = hours < 10 ? '0' + hours : hours;
    // Establecer la cadena "am" o "pm" según sea necesario

    // Formatear la fecha y hora en el formato deseado
    const formattedDate = `${day} de ${month} ${year} a las ${stringHours}:${stringMinutes} hs.`;

    return formattedDate;
}
export default getFormattedDate;