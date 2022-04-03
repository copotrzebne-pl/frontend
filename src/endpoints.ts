const main = {
  demands: '/demands'
} as const

const panel = {
  login: '/login',
  getPlaces: '/places',
  getPlace: '/places/:id',
  getPlaceDemands: '/places/:id/demands',
  getUser: '/users/whoami',
  getOwnedPlaces: '/users-places/owned',
  savePlace: '/places',
  supplies: '/supplies',
  priorities: '/priorities',
  saveDemand: '/demands',
  removeDemand: '/demands/:id',
  removeAllDemands: '/places/:id/demands'
} as const

export const API = { main, panel }
