import { useState, useEffect } from 'react'
import PageTitle from 'components/PageTitle'
import { usePanelContext } from 'contexts/panelContext'
import { Page } from 'routes'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import marker from 'assets/marker.svg'
import { Place } from 'contexts/types'

export default () => {
  const { fetchPlaces, places } = usePanelContext()
  const { id } = useParams()
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  useEffect(() => {
    fetchPlaces()
  }, [])
  useEffect(() => {
    const place = places.filter(elem => elem.id === id)[0]
    if (place) setSelectedPlace(place)
  }, [places, selectedPlace])

  return (
    <Container>
      {selectedPlace !== null && (
        <PlaceDetails>
          <PageTitle backPage={Page.HOME}>{selectedPlace?.name}</PageTitle>
          <PlaceDetailsWrapper>
            {selectedPlace?.comment && (
              <PlaceDescription>{selectedPlace?.comment}</PlaceDescription>
            )}
            <DetailsRow>
              <PlaceAddressWrapper>
                <Marker src={marker} alt="marker" />
                <PlaceAddress>
                  <span>
                    {selectedPlace?.street} {selectedPlace?.apartment}
                  </span>
                  <span>{selectedPlace?.city}</span>
                </PlaceAddress>
              </PlaceAddressWrapper>
              <LastUpdate>
                <span>Ostatnia aktualizacja:</span>
                <h3>---</h3>
              </LastUpdate>
            </DetailsRow>
          </PlaceDetailsWrapper>
        </PlaceDetails>
      )}
      {selectedPlace !== null && selectedPlace.demands && (
        <DemansWrapper>
          <DemandsListTitle>Lista potrzeb</DemandsListTitle>
          <DemansList>
            {selectedPlace.demands.map(demand => (
              <Demand>{demand?.supply?.namePl}</Demand>
            ))}
          </DemansList>
        </DemansWrapper>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
`

const PlaceDetails = styled.div`
  width: calc(100% - 0.8rem);
  display: flex;
  flex-direction: column;
  margin: 0 0.4rem;
  background-color: rgba(199, 199, 199, 0.1);
  padding: 1rem;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`
const PlaceDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 0 1.2rem;
  padding-bottom: 1rem;
`

const PlaceDescription = styled.p`
  display: inline-block;
  text-align: center;
  line-height: 1.4;
  width: 100%;
  color: #999999;
  font-size: 0.76rem;
  font-weight: 400;
  margin-bottom: 1rem;
`

const PlaceAddressWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Marker = styled.img`
  height: 30px;
  width: auto;
  display: inline-block;
  margin-right: 0.7rem;
  margin-bottom: 2px;
`

const PlaceAddress = styled.div`
  display: flex;
  flex-direction: column;
  span {
    color: #8d99b2;
    font-size: 0.7rem;
    font-weight: 400;
    margin: 0.1rem 0;
  }
`

const DetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const LastUpdate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  span {
    color: #8d99b2;
    font-size: 0.7rem;
    font-weight: 400;
    margin: 0.1rem 0;
  }
  h3 {
    color: #8d99b2;
    font-size: 0.78rem;
    font-weight: 500;
    margin: 0.1rem 0;
  }
`

const DemansWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.2rem 1.2rem 3.2rem;
`

const DemandsListTitle = styled.h4`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: #333333;
`

const DemansList = styled.ol`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1.2rem;
`

const Demand = styled.li`
  margin: 0.5rem;
  color: #999999;
`