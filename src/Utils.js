import exactMath from 'exact-math';

export function fix(value, step) {
    const netValue = exactMath.mul(exactMath.round(exactMath.div(parseFloat(value), step)), step);
    return netValue;
}