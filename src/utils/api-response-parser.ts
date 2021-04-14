export const parseResponseBody = (dataObjects: any, keys: string[], index: number) => {
  let result;

  const key = keys[index];

  if (key) {
    const childArray = dataObjects.map((data) => {
      if (!data[key]) {
        throw new Error(`The given ${key} key is not exist in the ${JSON.stringify(data)} object !`);
      }

      if (!data[key].length) {
        throw new Error(`The given ${key} key is not an array!`);
      }

      return data[key];
    });

    result = parseResponseBody(childArray.flat(), keys, index + 1);
  } else if (!result) {
    result = dataObjects;
  }

  return result;
};
