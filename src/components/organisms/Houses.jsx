import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { filteredIds, getHouses } from '../../store/houses.slice'
import { useEffect } from 'react'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const [currentPage, setCurrentPage] = useState(1)
  const { houses, reqStatus, hasMore } = useSelector((state) => state.houses)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHouses({ page: currentPage, limit: 9 }))
  }, [dispatch, currentPage])

  return (
    <HousesStyled>
      {reqStatus === 'loading' && <div>Loading...</div>}
      {reqStatus === 'failed' && <div>Error</div>}
      {reqStatus === 'success' && (
        <Grid gridGap="32px">
          {/* FilteredIds no debería de estar aquí */}
          {/* Usa algo parecido a lo siguiente:
                allIds
                    .filter((id) => filterHouse(byIds[id]), type, city, ...) --> filtra aquí y que venga de helpers, no del slice
                    .map(...) */}
          {filteredIds(houses).map((id) => (
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
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Load more
          </Button>
        )}
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``
