import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const { houses, reqStatus } = useSelector((state) => state.houses)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <HousesStyled>
      {reqStatus === 'loading' && <div>Loading...</div>}
      {reqStatus === 'failed' && <div>Error</div>}
      {reqStatus === 'success' && (
        <Grid gridGap="32px">
          {houses.filteredIds.map((id) => (
            <HouseCard
              key={id}
              title={houses.byId[id].title}
              price={`${houses.byId[id].price}€`}
              img={houses.byId[id].image}
              link=""
            />
          ))}
        </Grid>
      )}
      <FlexBox align="center">
        <Button
          style={{ marginTop: '2rem' }}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Load more
        </Button>
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``
