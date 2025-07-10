export const normalizza = (giorni: number | undefined, valoreCritico: number): number => {
    if (giorni === undefined) return 0;
    if (giorni <= -valoreCritico) return 0;
    if (giorni >= 0) return 1;
    return giorni/10 + 1;
}