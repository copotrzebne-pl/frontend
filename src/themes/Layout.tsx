import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import { UserContextProvider } from 'contexts/userContext'

import Header from 'components/PageHeader'

export default () => (
  <UserContextProvider>
    <Header />
    <PageContent>
      <Outlet />
    </PageContent>
  </UserContextProvider>
)

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(
    100vh - ${({ theme }) => theme.dimensions.headerHeight} - 20px
  );
`
