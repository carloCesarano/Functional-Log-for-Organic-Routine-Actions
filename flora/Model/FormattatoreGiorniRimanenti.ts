export const formatta = (giorni: number | undefined) : string => {
    if (giorni === undefined) return 'impossibile calcolare';
    return giorni === 0  ? 'oggi' :
           giorni === 1  ? 'tra 1 giorno' :
           giorni === -1 ? '1 giorno in ritardo' :
           giorni < -1   ? `${-giorni} giorni in ritardo` :
                           `tra ${giorni} giorni`;
}