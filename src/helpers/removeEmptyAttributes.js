const removeEmptyAttributes = (obj) => {
  const newObj = { ...obj }
  Object.keys(obj).forEach((key) => {
    if (obj[key] === '') {
      delete newObj[key]
    }
  })
  return newObj
}

export default removeEmptyAttributes
