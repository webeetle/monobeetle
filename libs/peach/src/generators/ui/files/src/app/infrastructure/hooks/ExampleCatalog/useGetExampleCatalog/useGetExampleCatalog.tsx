import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { HookParams, ReactQueryParams } from './types'
import { getExampleCatalog } from '../../../api'

const useGetExampleCatalog = (params: HookParams) => {
  //...write your implementation

  return useQuery(['get-example-catalog'], async () => {
    return getExampleCatalog({ token: 'example_token' })
  })
}

export default useGetExampleCatalog
