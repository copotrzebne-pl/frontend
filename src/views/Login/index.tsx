import styled from 'styled-components'
import { useState, useCallback, SyntheticEvent } from 'react'
import {
  LoginForm,
  FormGroup,
  Label,
  TextInput,
  LoginButton
} from './components'
import { useUserContext } from 'contexts/userContext'
import PageTitle from 'components/PageTitle'
import { breakpoint } from 'themes/breakpoints'

export default () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { login: loginUser } = useUserContext()
  const handleLogin = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
      if (!login || !password) return
      loginUser(login, password)
    },
    [login, password, loginUser]
  )

  return (
    <Container>
      <PageTitle>Zaloguj się</PageTitle>
      <LoginForm onSubmit={handleLogin}>
        <FormGroup>
          <Label>Email</Label>
          <TextInput
            autoComplete="on"
            id="login"
            type="email"
            placeholder="Email"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Hasło</Label>
          <TextInput
            id="password"
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <LoginButton type="submit" onClick={handleLogin}>
            Zaloguj się
          </LoginButton>
        </FormGroup>
      </LoginForm>
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
