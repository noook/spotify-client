import type { GetAudiobookChapterOptions, GetAudiobookOptions, GetAudiobooksResponse, PaginatedResults, PaginationQueryOptions, SimplifiedAudiobookObject, SimplifiedChapterObject } from '../types'
import { ApiPart } from './api.part'

export class AudiobooksApi extends ApiPart {
  /**
   * Get Spotify catalog information for a single audiobook.
   *
   * **Note:** Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.
   * @param id The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.
   */
  public getAudiobook(id: string, opts: GetAudiobookOptions = {}) {
    return this.$fetch(`/audiobooks/${id}`, {
      query: opts,
    })
  }

  /**
   * Get Spotify catalog information for several audiobooks identified by their Spotify IDs.
   *
   * **Note:** Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.
   * @param ids A list of the Spotify IDs. For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`.
   * @max `50` IDs.
   */
  public getAudiobooks(ids: string[], opts: GetAudiobookOptions = {}): Promise<GetAudiobooksResponse[]> {
    return this.$fetch<GetAudiobooksResponse[]>('/audiobooks', {
      query: {
        ids: ids.join(','),
        ...opts,
      },
    })
  }

  /**
   *  Get Spotify catalog information about an audiobook's chapters.
   *
   * **Note:** Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.
   * @param opts
   * @returns
   */
  public getAudiobookChapters(id: string, opts: GetAudiobookChapterOptions = {}) {
    return this.$fetch<PaginatedResults<SimplifiedChapterObject>>(`/audiobooks/${id}/chapters`, {
      query: opts,
    })
  }

  /**
   * Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.
   * @param opts
   * @scope `user-library-read`
   */
  public getSavedAudiobooks(opts: PaginationQueryOptions = {}): Promise<PaginatedResults<PaginatedResults<SimplifiedAudiobookObject>>> {
    return this.$fetch<PaginatedResults<PaginatedResults<SimplifiedAudiobookObject>>>('/me/audiobooks', {
      query: opts,
    })
  }

  /**
   * Save one or more audiobooks to the current Spotify user's library.
   * @param ids A list of the [Spotify IDs]([Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)).
   * @max `50` IDs.
   * @scope `user-library-modify`
   */
  public async saveAudiobooks(ids: string[]): Promise<void> {
    await this.$fetch<void>('/me/audiobooks', {
      method: 'PUT',
      query: {
        ids: ids.join(','),
      },
    })
  }

  /**
   * Remove one or more audiobooks to the current Spotify user's library.
   * @param ids A list of the [Spotify IDs]([Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)).
   * @max `50` IDs.
   * @scope `user-library-modify`
   */
  public async removeAudiobooks(ids: string[]): Promise<void> {
    await this.$fetch<void>('/me/audiobooks', {
      method: 'DELETE',
      query: {
        ids: ids.join(','),
      },
    })
  }

  /**
   * Check if one or more audiobooks are already saved in the current Spotify user's library.
   * @param ids A list of the [Spotify IDs]([Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)).
   * @max `50` IDs.
   * @scope `user-library-read`
   */
  public checkUserSavedAudiobooks(ids: string[]): Promise<boolean[]> {
    return this.$fetch<boolean[]>('/me/audiobooks/contains', {
      query: {
        ids: ids.join(','),
      },
    })
  }
}
