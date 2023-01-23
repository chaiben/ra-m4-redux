import React from 'react'
import { useSelector } from 'react-redux'
import { filteredIds } from '../store/houses.slice'
import { Body } from '../components/layout'
import { Text } from '../components/atoms'

function Data() {
  const houses = useSelector((state) => state.houses.houses)
  const { byId } = houses
  return (
    <Body>
      {filteredIds(houses).map((id) => (
        <Text key={`dato${id}`}>
          {byId[id].title} - Type = {byId[id].type} - City = {byId[id].city}
        </Text>
      ))}
    </Body>
  )
}

export default Data
