import React from 'react'
import { useSelector } from 'react-redux'
import { Body } from '../components/layout'
import { Text } from '../components/atoms'

function Data() {
  const houses = useSelector((state) => state.houses.houses)
  const { allIds, byId, filteredIds, filters } = houses
  const housesId = !Object.keys(filters).length ? allIds : filteredIds
  return (
    <Body>
      {housesId.map((id) => (
        <Text key={`dato${id}`}>
          {byId[id].title} - Type = {byId[id].type} - City = {byId[id].city}
        </Text>
      ))}
    </Body>
  )
}

export default Data
