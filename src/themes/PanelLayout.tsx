import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import { UserContextProvider } from 'contexts/userContext'

import PanelHeader from 'components/PanelHeader'

export default () => (
  <UserContextProvider>
    <PanelHeader />
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
