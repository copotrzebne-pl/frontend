import { Navigate, Outlet } from 'react-router-dom'
import { checkIfAuthorized } from 'utils/session'

export enum Page { //eslint-disable-line no-shadow
  LOGIN,
  HOME,
  PLACE,
  NOTFOUND,
  ABOUT,
  LANGUAGE,
  PANEL
}

export const routes: { [key in Page]: string } = {
  [Page.HOME]: '/',
  [Page.LOGIN]: '/login',
  [Page.PANEL]: '/panel',
  [Page.PLACE]: '/place',
  [Page.LANGUAGE]: '/language',
  [Page.ABOUT]: '/about',
  [Page.NOTFOUND]: '*'
}

export const PrivatePath = () => {
  const authorized = checkIfAuthorized()
  return authorized ? <Outlet /> : <Navigate to={routes[Page.LOGIN]} />
}
