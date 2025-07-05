export const colora = (coeff: number) : string => {

    let r: number, g: number, b: number;
    if (coeff <= 0.5) {
        const t = coeff / 0.5;
        r = 230;
        g = Math.round(125 + (210 - 125) * t);
        b = 125;
    } else if (coeff < 0.85) {
        const t = (coeff - 0.5) / (0.85 - 0.5);
        r = Math.round(230 + (115 - 230) * t);
        g = Math.round(210 + (205 - 210) * t);
        b = Math.round(125 + (110 - 125) * t);
    } else {
        r = 115;
        g = 205;
        b = 110;
    }

    return `rgb(${r},${g},${b})`;
};