// Adjusted modulo: always returns a value in [1, b] instead of [0, b-1].
// Unlike the standard JS `%` operator which can return 0 or negative values,
// amod(a, b) maps 0 -> b, ensuring results are always positive.
export function amod(a: number, b: number) {
  let t = a % b;
  if (t <= 0) t += b;
  return t;
}

// Integer (floor) division. Equivalent to mathematical floor(a/b).
export function int_div(a: number, b: number) {
  return Math.floor(a / b);
}
