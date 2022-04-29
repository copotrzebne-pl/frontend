import { useEffect } from 'react'
import PageTitle from 'components/PageTitle'
import { usePanelContext } from 'contexts/panelContext'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import format from 'date-fns/format'
import marker from 'assets/marker.svg'
import { breakpoint } from 'themes/breakpoints'
import FacebookShareButton from 'components/FacebookShareButton'
import { Helmet } from 'react-helmet-async'
import TranslatedEntry from 'components/TranslatedEntry'
import TranslatedText from 'components/TranslatedText'
import { useTextTransformToHTML } from 'hooks/useTextTransformToHTML'
import { useGroupDemands } from 'hooks/useGroupDemands'

export default () => {
  const {
    selectedPlace,
    demands,
    fetchPlace,
    fetchDemands,
    clearDemands,
    clearSelectedPlace
  } = usePanelContext()
  const { idOrSlug } = useParams()
  const formattedPlaceDescription = useTextTransformToHTML(
    selectedPlace?.additionalDescription
  )
  const { groupedDemands, demandsKeys } = useGroupDemands(demands)

  useEffect(() => {
    if (idOrSlug) {
      fetchPlace(idOrSlug)
    }
    return () => {
      clearSelectedPlace()
    }
  }, [idOrSlug])

  useEffect(() => {
    if (selectedPlace?.id) {
      fetchDemands(selectedPlace.id)
    }
    return () => {
      clearDemands()
    }
  }, [selectedPlace?.id])

  const shouldRenderLinksSection = (): boolean =>
    !!selectedPlace?.placeLink &&
    (!!selectedPlace?.placeLink.homepage ||
      !!selectedPlace?.placeLink.facebook ||
      !!selectedPlace?.placeLink.signup ||
      !!selectedPlace?.placeLink.fundraising)

  return (
    <>
      <Helmet>
        <title>Copotrzebne.pl - pomagamy pomagać</title>
        <meta
          property="og:title"
          content="Copotrzebne.pl - pomagamy pomagać. Razem dla Ukrainy."
        />
        <meta
          name="description"
          content="Lokalizator punktów pomocowych w twojej okolicy. Znajdź aktualne zbiórki rzeczowe i wesprzyj fundacje i prywatne firmy w niesieniu pomocy osobom uchodźczym z Ukrainy"
        />
        <meta
          property="og:description"
          content="Zobacz aktualne zbiórki rzeczowe i pomagaj z nami!"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Container>
        {selectedPlace !== null && (
          <PlaceDetails>
            <PageTitle>{selectedPlace?.name}</PageTitle>
            <PlaceDetailsWrapper>
              {formattedPlaceDescription && (
                <PlaceDescription
                  dangerouslySetInnerHTML={{
                    __html: formattedPlaceDescription
                  }}
                />
              )}
              <DetailsRow>
                <PlaceAddressWrapper
                  target="_blank"
                  href={`https://www.google.com/maps/place/${selectedPlace?.street}+${selectedPlace?.buildingNumber}+${selectedPlace?.city}`}
                >
                  <MapLocation>
                    <Marker src={marker} alt="marker" />
                  </MapLocation>
                  <PlaceAddress>
                    <span>
                      {selectedPlace.street || ''}{' '}
                      {selectedPlace.buildingNumber || ''}
                      {selectedPlace.apartment
                        ? `/${selectedPlace.apartment}`
                        : ''}
                    </span>
                    <span>{selectedPlace?.city}</span>
                    <span>{selectedPlace?.workingHours || ''}</span>
                  </PlaceAddress>
                </PlaceAddressWrapper>
                <LastUpdate>
                  <span>
                    <TranslatedText value="lastUpdate" />
                  </span>
                  <h3>
                    {selectedPlace.lastUpdatedAt
                      ? format(
                          Date.parse(selectedPlace.lastUpdatedAt),
                          'd MMM Y H:m'
                        )
                      : '---'}
                  </h3>
                </LastUpdate>
              </DetailsRow>
              {selectedPlace.bankAccount && (
                <DetailsRow>
                  <BankAccount>
                    <TranslatedText value="bankAccount" />
                    <br />
                    <span>{selectedPlace.bankAccount || '-'}</span>
                  </BankAccount>
                </DetailsRow>
              )}
              {shouldRenderLinksSection() && (
                <DetailsRow>
                  <Links>
                    {selectedPlace.placeLink?.homepage && (
                      <div>
                        <a
                          href={selectedPlace.placeLink?.homepage || '/'}
                          target="_blank"
                          rel="noreferrer"
                        >
                          &#8594; <TranslatedText value="homepageLink" />
                        </a>
                      </div>
                    )}
                    {selectedPlace.placeLink?.facebook && (
                      <div>
                        <a
                          href={selectedPlace.placeLink?.facebook || '/'}
                          target="_blank"
                          rel="noreferrer"
                        >
                          &#8594; <TranslatedText value="facebookLink" />
                        </a>
                      </div>
                    )}
                    {selectedPlace.placeLink?.signup && (
                      <div>
                        <a
                          href={selectedPlace.placeLink?.signup || '/'}
                          target="_blank"
                          rel="noreferrer"
                        >
                          &#8594; <TranslatedText value="signupLink" />
                        </a>
                      </div>
                    )}
                    {selectedPlace.placeLink?.fundraising && (
                      <div>
                        <a
                          href={selectedPlace.placeLink?.fundraising || '/'}
                          target="_blank"
                          rel="noreferrer"
                        >
                          &#8594; <TranslatedText value="fundraisingLink" />
                        </a>
                      </div>
                    )}
                  </Links>
                </DetailsRow>
              )}
            </PlaceDetailsWrapper>
          </PlaceDetails>
        )}
        <StyledFacebookButton>
          <TranslatedText value="shareThisOrganizationCollection" />
        </StyledFacebookButton>
        {selectedPlace !== null && demands.length > 0 && (
          <DemandsWrapper>
            <DemandsListTitle>
              <TranslatedText value="demandsList" />
            </DemandsListTitle>
            <DemandsList>
              {demandsKeys.map((priorityNumber, key) => {
                if (!groupedDemands[priorityNumber]) return null
                return (
                  <div key={key}>
                    <CategoryHeader>
                      <TranslatedEntry
                        entry={
                          groupedDemands[priorityNumber][0].supply?.category
                        }
                      />
                    </CategoryHeader>
                    {groupedDemands[priorityNumber].map((demand, index) => (
                      <DemandComponent key={index}>
                        <div>
                          <DemandInfo>
                            <span>
                              <TranslatedEntry entry={demand?.supply} />
                            </span>
                            <TranslatedEntry entry={demand?.priority} />
                          </DemandInfo>
                          {demand?.comment && (
                            <DemandComment>{demand?.comment}</DemandComment>
                          )}
                        </div>
                      </DemandComponent>
                    ))}
                  </div>
                )
              })}
            </DemandsList>
          </DemandsWrapper>
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
`

const PlaceDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(199, 199, 199, 0.1);
  padding: 1rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  `}
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
  text-align: left;
  line-height: 1.4;
  width: 100%;
  color: #999999;
  font-size: 0.76rem;
  font-weight: 400;
  margin-bottom: 1rem;
  overflow-wrap: break-word;
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
`

const PlaceAddressWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Marker = styled.img`
  height: 30px;
  width: auto;
  display: inline-block;
  margin-right: 0.7rem;
`

const MapLocation = styled.a`
  width: auto;
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

const BankAccount = styled.div`
  margin-top: 1.6rem;
  color: #8d99b2;
  font-size: 0.8rem;
  font-weight: 400;

  span {
    display: inline-block;
    color: #8d99b2;
    font-size: 0.9rem;
    font-weight: 500;
    margin: 0.2rem 0;
  }
`

const Links = styled.div`
  margin-top: 1.6rem;
  color: #8d99b2;
  font-size: 0.8rem;
  font-weight: 400;

  div {
    margin: 0.5rem 0;
  }

  a {
    color: #0076ff;
    font-size: 0.8rem;
    font-weight: 500;
    margin: 0.2rem 0;
  }

  a:hover {
    color: #0055ff;
  }
`

const DemandsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.2rem 3.2rem;
  width: 100%;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`

const DemandsListTitle = styled.h4`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: #333333;
`

const DemandsList = styled.ol`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1.2rem;
  margin: 0;
`

const DemandComponent = styled.li`
  margin: 0.6rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid #999;

  & > span {
    color: #999;
  }

  & > b {
    color: #333;
    font-weight: 600;
  }
`

const DemandInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    color: #333333;
  }
`

const DemandComment = styled.div`
  margin-top: 0.2rem;
  color: #999999;
`

const StyledFacebookButton = styled(FacebookShareButton)`
  margin: 1.2rem;
  width: calc(100% - 2.4rem);
  cursor: pointer;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 1.2rem auto;
  `}
`

const CategoryHeader = styled.span`
  display: flex;
  width: 100%;
  padding: 0.6rem 0.6rem;
  margin: 0.8rem 0;
  color: #8cb134;
  border-bottom: 1px solid #8cb134;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 1rem;
`
