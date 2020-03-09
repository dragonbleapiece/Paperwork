import exactMath from 'exact-math';

export function fix(value, step) {
    const netValue = exactMath.mul(exactMath.round(exactMath.div(parseFloat(value), step)), step);
    return netValue;
}

export function clamp_left(a, b) {
    return a < b ? b : a;
}
 
export function clamp_right(a, b) {
    return a > b ? b : a;
}
 
export function clamp(a, b, c) {
   return clamp_left(clamp_right(a, c), b);
}