class UndefinedError extends Error {
    public readonly name : string = 'UndefinedError';

    constructor(campo: string) {
        super(`Campo '${campo}' non definito.`);
        Object.setPrototypeOf(this, new.target.prototype);
    }

}

export function assertDefined<T>(valore: T | undefined, campo: string): T {
    if (valore === undefined)
        throw new UndefinedError(campo);
    return valore;
}