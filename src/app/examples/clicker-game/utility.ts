export function roundToNearest(value: number, dec: 1e2){
  return Math.round((value + Number.EPSILON) * dec) / dec
}
