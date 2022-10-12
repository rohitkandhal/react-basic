function stringify(data) {

  // Sanity Cases
  if (data === null || data === undefined || data === Infinity) {
    return 'null';
  }

  // NaN is the only value that is not equal to itself
  if (data !== data) {
    // that's a NaN
    return 'null'
  }

  // Date
  if (data instanceof Date) {
    return `"${data.toISOString()}"`
  }

  // Array
  if (Array.isArray(data)) {
    const stringifiedElems = data.map(el => stringify(el));
    return `[${stringifiedElems.join(',')}]`
  }

  switch (typeof data) {
    case "string":
      return `"${data}"`;
    case "number":
    case "boolean":
      return `${data.toString()}`;

    case "object":
      const arr = Object.entries(data).reduce(
        (accumulator, [key, value]) => {
          if (value !== undefined) {
            accumulator.push(`"${key}":${stringify(value)}`)
          }

          return accumulator
        }
        , []);
      return `{${arr.join(',')}}`;

    case "symbol":
      return 'null'

    case "bigint":
      throw new Error("Do not know how to serialize a BigInt at JSON.stringify");

    default:
    // do nothing
  }

}