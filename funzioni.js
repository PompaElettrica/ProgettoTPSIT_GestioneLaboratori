/**@module funzioni.js - Modulo contenente le funzioni del progetto */
/**
 * Funzione prompt per permettere l'input
 */
const prompt = require("prompt-sync")();


//----------------------------------------------------------------------------------------------------------


/**
 * Funzione di normalizzazione dei nomi
 * @param {String} x Stringa da normalizzare
 * @returns {String} Stringa normalizzata
 */
const normalizza = x => x[0].toUpperCase() + x.slice(1).toLowerCase();


//----------------------------------------------------------------------------------------------------------


/**
 * Funzione generale per l'inserimento del Docente
 * @returns {String} Nome del Docente
 */
const inserisciDocente = () => prompt("Docente: ");
/**
 * Funzione generale per l'inserimento del Laboratorio
 * @returns {String} Nome del Laboratorio
 */
const inserisciLaboratorio = () => prompt("Laboratorio: ");


//----------------------------------------------------------------------------------------------------------


/**
 * Funzione per il controllo della correttezza del giorno in base al mese
 * @param {Number} mese Mese da cui si definisce la giornata massima inseribile
 * @returns {Number} Giorno massimo inseribile
 */
const giorniNelMese = function(mese){
    if(mese == 2)
    {
        return (anno % 4 === 0 && (anno % 100 !== 0 || anno % 400 === 0)) ? 29 : 28;
    }
    else if(mese == 4 || mese == 6 || mese == 9 || mese == 11)
    {
        return 30;
    }
    else
    {
        return 31;
    }
}
/**
 * Funzione per l'inserimento del giorno della prenotazione
 * @param {Number} mese Mese su cui effettuare il controllo per conoscere la giornata massima inseribile
 * @returns {Number} Giorno inserito
 */
const inserisciGiorno = function(mese){
    let gg;
    let max = giorniNelMese(mese);
    do{
        gg = Number(prompt("Giorno: "));
    }while(isNaN(gg) || gg < 1 || gg > max);
    return gg;
}
/**
 * Funzione per l'inserimento del mese della prenotazione
 * @returns {Number} Mese inserito
 */
const inserisciMese = function(){
    let mese;
    do{
        mese = Number(prompt("Mese (1 - 12): "));
    }while(isNaN(mese) || mese < 1 || mese > 12);
    return mese;
}
/**
 * Funzione per l'inserimento dell'anno della prenotazione
 * @returns {Number} Anno inserito
 */
const inserisciAnno = function(){
    let anno;
    do{
        anno = Number(prompt("Anno: "));
    }while(isNaN(anno));
    return anno;
}
const inserimentoData = function(){
    let mese = inserisciMese();
    let giorno = inserisciGiorno(mese);
    let anno = inserisciAnno();
    let data = giorno+"/"+mese+"/"+anno;
    return data;
}


//----------------------------------------------------------------------------------------------------------


/**
 * Funzione per l'inserimento dell'ora di prenotazione
 * @returns {Number} Ora di prenotazione
 */
const inserisciOra = function(){
    let ora;
    do{
        ora = Number(prompt("Ora (0 - 23): "));
    }while(isNaN(ora) || ora < 0 || ora > 23);
    return ora;
}
/**
 * Funzione per l'inserimento del minuto di prenotazione
 * @returns {Number} Minuto di prenotazione
 */
const inserisciMinuto = function(){
    let minuto;
    do{
        minuto = Number(prompt("Minuto (0 - 59): "));
    }while(isNaN(minuto) || minuto < 0 || minuto > 59);
    return minuto;
}


//----------------------------------------------------------------------------------------------------------


/**
 * Funzione per l'inserimento della prenotazione del laboratorio
 * @param {Array} prenotazioni Lista in cui inserire la prenotazione effettuata
 * @returns {Object} Ritorna gli elementi della prenotazione
 */
const inserimentoDati = function(){
    let docente = normalizza(inserisciDocente());
    let laboratorio = normalizza(inserisciLaboratorio());

    let data = inserimentoData();

    let ora = inserisciOra();
    let minuto = inserisciMinuto();
    let orario = ora+":"+minuto;

    let nuovaPrenotazione = {"Docente": docente, "Laboratorio": laboratorio, "Data": data, "Orario": orario};
    return nuovaPrenotazione;
}

/**
 * Funzione per controllare che un laboratorio non sia già stato prenotato
 * @param {Array} prenotazioni Lista delle prenotazioni
 * @param {Object} nuovaPrenotazione Nuova prenotazione da controllare per essere confermata
 * @returns {Boolean} Restituisce "true" se il laboratorio è libero, altrimenti restituisce "false"
 */
const controlloPrenotazioni = function(prenotazioni, nuovaPrenotazione){
    return prenotazioni.every(x =>
        x.Data !== nuovaPrenotazione.Data ||
        x.Orario !== nuovaPrenotazione.Orario ||
        x.Laboratorio !== nuovaPrenotazione.Laboratorio
    );
}

/**
 * Funzione per la ricerca di una determinata prenotazioni in base ai dati riportati
 * @param {Array} prenotazioni Lista delle prenotazioni
 * @param {Object} cancella Prenotazione da cancellare
 * @returns {Boolean} Ritorna "true" se la prenotazione da cancellare esiste, altrimenti ritorna "false"
 */
const controlloCancella = function(prenotazioni, cancella){
    return prenotazioni.findIndex(x =>
        x.Data === cancella.Data &&
        x.Orario === cancella.Orario &&
        x.Laboratorio === cancella.Laboratorio
    );
}

/**
 * Funzione per la ricerca temporale di una prenotazione in una giornata
 * @param {Object} prenotazioni Lista delle prenotazioni
 * @param {String} dataGiorno Data da ricercare (giornata)
 */
const ricercaTemporaleGiornaliera = function(prenotazioni, dataGiorno){
    prenotazioni.forEach(x => {
        if (x.Data === dataGiorno)
        {
            console.log(x);
        }
    }
    );
}

/**
 * Funzione per la ricerca temporale di una prenotazione in una settimana
 * @param {Array} prenotazioni Lista delle prenotazioni
 * @param {String} dataInput Data da ricercare (settimana)
 */
const ricercaTemporaleSettimanale = function(prenotazioni, dataSettimana){
    let [g, m, a] = dataSettimana.split("/").map(Number);
    let dataRiferimento = new Date(a, m - 1, g);

    prenotazioni.forEach(x => {
        let [gg, mm, aa] = x.Data.split("/").map(Number);
        let dataPrenotazione = new Date(aa, mm-1, gg);

        let diff = (dataPrenotazione-dataRiferimento)/(1000*60*60*24);

        if (diff >= 0 && diff <= 6)
        {
            console.log(x);
        }
    });
}

/**
 * Funzione per ottenere l'ordinamento in ordine cronologico della lista delle prenotazioni
 * @param {*} prenotazioni Lista delle prenotazioni
 */
const ordinamento = function(prenotazioni){
    prenotazioni.sort((a, b) => {
        let [g1, m1, a1] = a.Data.split("/").map(Number);
        let [h1, min1] = a.Orario.split(":").map(Number);
        let dataA = new Date(a1, m1 - 1, g1, h1, min1);

        let [g2, m2, a2] = b.Data.split("/").map(Number);
        let [h2, min2] = b.Orario.split(":").map(Number);
        let dataB = new Date(a2, m2 - 1, g2, h2, min2);

        return dataA - dataB;
    });
    prenotazioni.forEach(x => console.log(x));
}



module.exports = {inserimentoDati, controlloPrenotazioni, controlloCancella, inserimentoData, ricercaTemporaleSettimanale, ricercaTemporaleGiornaliera, ordinamento};