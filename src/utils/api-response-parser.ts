export const parseResponseBody = (dataObjects: any, keysToParse: string[], keysToRemove: string[]) => {
  let result = dataObjects;

  keysToParse.forEach((key) => {
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
  });

  result = result.map((event) => {
    keysToRemove.forEach((removableKey) => delete event[removableKey]);

    return event;
  });

  return result;
};
