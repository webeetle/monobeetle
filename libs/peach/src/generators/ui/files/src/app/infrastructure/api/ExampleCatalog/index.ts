import axios from 'axios'

// Request
import { IExampleCatalogPayload } from '../../entities'

// Response
import { IExampleCatalogResponse } from '../../entities'

export const getExampleCatalog = async (payload: IExampleCatalogPayload): Promise<IExampleCatalogResponse> => {
  return axios.get('/examplecatalog')
}
