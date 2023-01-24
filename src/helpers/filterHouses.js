const filterByCity = (house, city) => {
  if (city === null) return true
  return house.city === city
}

const filterByType = (house, type) => {
  if (type === null) return true
  return house.type === type
}

const filterHouses = (house, city, type) => {
  return filterByCity(house, city) && filterByType(house, type)
}

export default filterHouses