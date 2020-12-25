export function shuffleArray<T>(array:T[]):T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export function getStringArray(s:string|string[]):string[] {
    if(s === undefined || s === null)
        return []
    else if(Array.isArray(s))
        return s
    else
        return [s]
}

export function getArrayIndex(base:number, i:number, length:number):number {
    let idx = (base + i) % length;
    return idx<0 ? idx+length:idx;
}