import type { GetMarketsResults } from '../types'
import { ApiPart } from './api.part'

export class MarketsApi extends ApiPart {
  /**
   * Get the list of markets where Spotify is available.
   */
  public getMarkets(): Promise<GetMarketsResults> {
    return this.$fetch<GetMarketsResults>('/markets')
  }
}
