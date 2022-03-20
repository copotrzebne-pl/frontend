import React from 'react'

export type Route = {
  path: string
  component: React.ComponentType
}

export type DictionaryEntry = {
  id?: string
  namePl: string
  nameUa?: string
  nameEn?: string
}
