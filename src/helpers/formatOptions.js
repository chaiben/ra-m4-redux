import { capitalize } from "./"

const formatOptions = (valuesArray = []) => {
  const newValue = [...valuesArray]
  return newValue
    .sort()
    .map((element) => ({
      value: element,
      text: capitalize(element),
    }))
}

export default formatOptions