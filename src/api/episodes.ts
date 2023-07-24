import type { EpisodeObject, GetEpisodeOptions, GetEpisodesResponse, GetSavedEpisodesOptions, PaginatedResults, SavedEpisodeObject } from '../types'
import { ApiPart } from './api.part'

export class EpisodesApi extends ApiPart {
  /**
   * Get Spotify catalog information for a single episode identified by its unique Spotify ID.
   * @scope `user-read-playback-position`
   */
  public getEpisode(id: string, opts: GetEpisodeOptions = {}): Promise<EpisodeObject> {
    return this.$fetch<EpisodeObject>(`/episodes/${id}`, {
      query: opts,
    })
  }

  /**
   * Get Spotify catalog information for a single episode identified by its unique Spotify ID.
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids).
   * @scope `user-read-playback-position`
   */
  public getEpisodes(ids: string[], opts: GetEpisodeOptions = {}): Promise<GetEpisodesResponse> {
    return this.$fetch<GetEpisodesResponse>('/episodes', {
      query: {
        ids: ids.join(','),
        ...opts,
      },
    })
  }

  /**
   * Get a list of the episodes saved in the current Spotify user's library.
   *
   * This API endpoint is in **beta** and could change without warning.
   * Please share any feedback that you have, or issues that you discover, in our
   * [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
   * @beta
   * @scope `user-library-read`
   * @scope `user-read-playback-position`
   */
  public getSavedEpisodes(opts: GetSavedEpisodesOptions = {}): Promise<PaginatedResults<SavedEpisodeObject>> {
    return this.$fetch<PaginatedResults<SavedEpisodeObject>>('/me/episodes', {
      query: opts,
    })
  }

  /**
   * Save one or more episodes to the current user's library.
   *
   * This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our
   * [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids).
   * @beta
   * @max `50` IDs.
   * @scope `user-library-modify`
   */
  public async saveEpisodes(ids: string[]): Promise<void> {
    await this.$fetch<void>('/me/episodes', {
      method: 'PUT',
      query: {
        ids: ids.join(','),
      },
    })
  }

  /**
   * Remove one or more audiobooks to the current Spotify user's library.
   *
   * This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our
   * [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids).
   * @beta
   * @max `50` IDs.
   * @scope `user-library-modify`
   */
  public async removeEpisodes(ids: string[]): Promise<void> {
    await this.$fetch<void>('/me/episodes', {
      method: 'DELETE',
      query: {
        ids: ids.join(','),
      },
    })
  }

  /**
   * Check if one or more audiobooks are already saved in the current Spotify user's library.
   *
   * This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our
   * [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids).
   * @beta
   * @max `50` IDs.
   * @scope `user-library-read`
   */
  public checkUserSavedEpisodes(ids: string[]): Promise<boolean[]> {
    return this.$fetch<boolean[]>('/me/episodes/contains', {
      query: {
        ids: ids.join(','),
      },
    })
  }
}
