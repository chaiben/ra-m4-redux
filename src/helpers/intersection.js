const intersection = (arr1, arr2) =>
  arr1.filter((element) => arr2.indexOf(element) !== -1)

export default intersection
