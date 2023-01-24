function filterArray(value, searchArray = null) {
  if (!searchArray) {
    return value;
  } else {
    return searchArray.includes(value);
  }
}

const filterHouses = (houses, city, type) => {
  return houses
    .filter((house) => filterArray(house, city))
    .filter((house) => filterArray(house, type))
}

export default filterHouses