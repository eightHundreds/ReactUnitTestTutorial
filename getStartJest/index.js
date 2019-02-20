export function sum(a, b) {
    if(!Number.isFinite(a)||!Number.isFinite(b)){
        throw new Error('input should be valid number');
    }
    return a + b;
}