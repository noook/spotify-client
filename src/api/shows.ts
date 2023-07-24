import type { GetShowEpisodesOptions, GetShowOptions, GetShowsResponse, PaginatedResults, PaginationQueryOptions, SavedShowObject, ShowObject, SimplifiedEpisodeObject } from '../types'
import { ApiPart } from './api.part'

export class ShowsApi extends ApiPart {
  /**
   * Get Spotify catalog information for a single show identified by its unique Spotify ID.
   * @scope `user-read-playback-position`
   */
  public getShow(id: string, opts: GetShowOptions = {}): Promise<ShowObject> {
    return this.$fetch<ShowObject>(`/shows/${id}`, {
      query: opts,
    })
  }

  /**
   * Get Spotify catalog information for several shows based on their Spotify IDs.
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids).
   */
  public getShows(ids: string[], opts: GetShowOptions = {}): Promise<GetShowsResponse> {
    return this.$fetch<GetShowsResponse>('/shows', {
      query: {
        ids: ids.join(','),
        ...opts,
      },
    })
  }

  /**
   * Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.
   * @scope `user-read-playback-position`
   */
  public getShowsEpisodes(id: string, opts: GetShowEpisodesOptions = {}): Promise<PaginatedResults<SimplifiedEpisodeObject>> {
    return this.$fetch<PaginatedResults<SimplifiedEpisodeObject>>(`/shows/${id}/episodes`, {
      query: opts,
    })
  }

  /**
   * Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.
   * @scope `user-library-read`
   */
  public getSavedShows(opts: PaginationQueryOptions = {}): Promise<PaginatedResults<SavedShowObject>> {
    return this.$fetch<PaginatedResults<SavedShowObject>>('/me/shows', {
      query: opts,
    })
  }

  /**
   * Save one or more shows to current Spotify user's library.
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids).
   * @max `50` IDs.
   * @scope `user-library-read`
   */
  public async saveShows(ids: string[]) {
    await this.$fetch<void>('/me/shows', {
      method: 'PUT',
      query: {
        ids: ids.join(','),
      },
    })
  }

  /**
   * Remove one or more shows to current Spotify user's library.
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids).
   * @max `50` IDs.
   * @scope `user-library-read`
   */
  public async removeShows(ids: string[]) {
    await this.$fetch<void>('/me/shows', {
      method: 'DELETE',
      query: {
        ids: ids.join(','),
      },
    })
  }

  /**
   * Check if one or more shows are already saved in the current Spotify user's library.
   *
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids).
   * @max `50` IDs.
   * @scope `user-library-read`
   */
  public checkUserSavedShows(ids: string[]): Promise<boolean[]> {
    return this.$fetch<boolean[]>('/me/shows/contains', {
      query: {
        ids: ids.join(','),
      },
    })
  }
}
