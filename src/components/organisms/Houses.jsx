import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { getHouses } from '../../store/houses.slice'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const [currentPage, setCurrentPage] = useState(1)
  const { houses, reqStatus, hasMore } = useSelector((state) => state.houses)
  const dispatch = useDispatch()

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
        {hasMore && (
          <Button
            style={{ marginTop: '2rem' }}
            onClick={() => {
              setCurrentPage(currentPage + 1)
              dispatch(getHouses({ page: currentPage, limit: 9 }))
            }}
          >
            Load more
          </Button>
        )}
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``
