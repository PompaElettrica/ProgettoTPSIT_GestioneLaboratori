const f = require("./funzioni");
const prompt = require("prompt-sync")();

/**
 * Rappresenta una prenotazione di laboratorio
 * @typedef {Object} Prenotazione
 * @property {String} laboratorio Laboratorio da prenotare
 * @property {String} data Data in cui prenotare il laboratorio
 * @property {String} orario Orario in cui il laboratorio viene prenotato
 */

/**
 * Funzione principale per la gestione delle prenotazioni dei laboratori.
 * Permette di fare le seguenti operazioni:
 * - Inserire una prenotazione
 * - Cancellare una prenotazione
 * - Visualizzare le prenotazioni
 * - Effettuare ricerche temporali
 * - Ordinare cronologicamente le prenotazioni
 * @returns {void}
 */
function main() {
    /**
     * @type {Prenotazione[]}
     */
    let prenotazioni = [];
    while (true) 
    {
        console.log("--- Menù ---\n1. Inserimento Prenotazione\n2. Annullamento Prenotazione\n3. Visualizzazione Prenotazioni (Generico)\n0. Uscita dal programma");
        let scelta;
        do {
            scelta = Number(prompt("Scelta: "));
        } while (isNaN(scelta))

        switch (scelta){
            case 1: //Inserimento nuova prenotazione
                let nuovaPrenotazione = f.inserimentoDati(prenotazioni);
                prenotazioni.push(nuovaPrenotazione);
                console.log("\x1b[32mPrenotazione Aggiunta\x1b[0m");
                break;
            case 2: //Cancellamento di una prenotazione tramite inserimento dati
                let cancella = f.inserimentoDati();
                let index = f.controlloCancella(prenotazioni, cancella);
                if (index !== -1)
                {
                    prenotazioni.splice(index,1);
                    console.log("\x1b[32mPrenotazione Eliminata\x1b[0m");
                }
                else
                {
                    console.log("Prenotazione non trovata");
                }
                break;
            case 3: //Visualizzazione generica prenotazioni
                prenotazioni.forEach(x => console.log(x));
                break;
            case 0: //Uscita dal programma
                console.log("\x1b[34mUscita dal Programma\x1b[0m");
                return;
            default: //Scelta errata dell'operazione da svolgere
                console.log("Scelta Errata.");
                break;
        }
    }
}
main();