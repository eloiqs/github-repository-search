export function capitalize(_string: string) {
  return _string.charAt(0).toUpperCase() + _string.slice(1);
}

export function flatZip<T extends any>(arrs: T[][]): T[] {
  const [arr, ...rest] = arrs;
  return arr.reduce<T[]>(
    (flatArr, val, i) => [
      ...flatArr,
      ...rest.reduce((a, arr) => (arr[i] ? [...a, arr[i]] : a), [val])
    ],
    []
  );
}
