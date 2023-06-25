import { ApiPart } from './api.part'

export class GenresApi extends ApiPart {
  /**
   * Retrieve a list of available genres seed parameter values
   * for [recommendations](https://developer.spotify.com/documentation/web-api/reference/get-recommendations).
   */
  public getAvailableGenreSeeds(): Promise<{ genres: string[] }> {
    return this.$fetch<{ genres: string[] }>('/recommendations/available-genre-seeds')
  }
}
