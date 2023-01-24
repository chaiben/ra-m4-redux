import { capitalize } from "./"

const formatOptions = (valuesArray) => {
  return valuesArray
    .sort()
    .map((element) => ({
      value: element,
      text: capitalize(element),
    }))
}

export default formatOptions