class EmptyError extends Error {
    public readonly name : string = 'EmptyError';

    constructor(array: string) {
        super(`Array '${array}' vuoto.`);
        Object.setPrototypeOf(this, new.target.prototype);
    }

}

export function assertNonEmpty<T>(array: T[], campo: string): T[] {
    if (array.length === 0)
        throw new EmptyError(campo);
    return array;
}