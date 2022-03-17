import { useEffect, useState, useCallback, SyntheticEvent } from 'react'
import Button from 'components/Button'
import { Form, FormGroup, Label, TextInput } from 'components/forms'
import PageTitle from 'components/PageTitle'
import { Place } from 'contexts/types'
import { useUserContext } from 'contexts/userContext'
import { useParams } from 'react-router-dom'
import { Page } from 'routes'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'

export default () => {
  const { id } = useParams()
  const { ownedPlaces, fetchOwnedPlaces, savePlace } = useUserContext()
  const [selectedPlace, setSelectedPlace] = useState<Place>({
    id,
    name: '',
    city: '',
    street: '',
    buildingNumber: '',
    apartment: '',
    comment: '',
    email: '',
    phone: '',
    latitude: '',
    longitude: ''
  })

  useEffect(() => {
    fetchOwnedPlaces()
  }, [])

  useEffect(() => {
    const place = ownedPlaces.filter(elem => elem.id === id)[0]
    if (place) {
      setSelectedPlace(place)
    }
  }, [ownedPlaces])

  const setValue = useCallback(
    (name: string, value: string) => {
      setSelectedPlace({ ...selectedPlace, [name]: value })
    },
    [selectedPlace]
  )

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
      if (
        !selectedPlace.name ||
        !selectedPlace.city ||
        !selectedPlace.street ||
        !selectedPlace.buildingNumber
      )
        return
      savePlace(selectedPlace)
    },
    [selectedPlace]
  )

  return (
    <Container>
      <PageTitle backPage={Page.PANEL}>
        {selectedPlace?.name || 'Dodaj nowe miejsce'}
      </PageTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nazwa</Label>
          <TextInput
            id="name"
            type="text"
            placeholder="name"
            required
            value={selectedPlace.name || ''}
            onChange={e => setValue('name', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Miasto</Label>
          <TextInput
            id="city"
            type="text"
            placeholder="city"
            required
            value={selectedPlace.city || ''}
            onChange={e => setValue('city', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Ulica</Label>
          <TextInput
            id="street"
            type="text"
            placeholder="street"
            required
            value={selectedPlace.street || ''}
            onChange={e => setValue('street', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Numer budynku</Label>
          <TextInput
            id="buildingNumber"
            type="text"
            placeholder="buildingNumber"
            required
            value={selectedPlace.buildingNumber || ''}
            onChange={e => setValue('buildingNumber', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Numer lokalu</Label>
          <TextInput
            id="apartment"
            type="text"
            placeholder="apartment"
            value={selectedPlace.apartment || ''}
            onChange={e => setValue('apartment', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Komentarz</Label>
          <TextInput
            id="comment"
            type="text"
            placeholder="comment"
            value={selectedPlace.comment || ''}
            onChange={e => setValue('comment', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <TextInput
            id="email"
            type="text"
            placeholder="email"
            value={selectedPlace.email || ''}
            onChange={e => setValue('email', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Telefon</Label>
          <TextInput
            id="phone"
            type="text"
            placeholder="phone"
            value={selectedPlace.phone || ''}
            onChange={e => setValue('phone', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Latitude</Label>
          <TextInput
            id="latitude"
            type="text"
            placeholder="latitude"
            value={selectedPlace.latitude || ''}
            onChange={e => setValue('latitude', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Longitude</Label>
          <TextInput
            id="longitude"
            type="text"
            placeholder="longitude"
            value={selectedPlace.longitude || ''}
            onChange={e => setValue('longitude', e.target.value)}
          />
        </FormGroup>
        <ButtonWrapper>
          <Button type="submit" onClick={handleSubmit}>
            Zapisz
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 2.2rem 2rem 2rem;
`