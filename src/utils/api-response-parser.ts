export const parseResponseBody = (dataObjects: any, keys: string[]) => {
  let result = dataObjects;

  keys.forEach((key) => {
    if (key) {
      const childArray = result.map((data) => {
        if (!data[key]) {
          throw new Error(`The given ${key} key does not exist in the ${JSON.stringify(data)} object!`);
        }

        if (!data[key].length) {
          throw new Error(`The given ${key} key is not an array!`);
        }

        return data[key];
      });

      result = childArray.flat();
    }
  });

  return result;
};
