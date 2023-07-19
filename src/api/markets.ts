import type { GetMarketsResults } from '../types'
import { ApiPart } from './api.part'

export class MarketsApi extends ApiPart {
  public getMarkets(): Promise<GetMarketsResults> {
    return this.$fetch<GetMarketsResults>('/markets')
  }
}
