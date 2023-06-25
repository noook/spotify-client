import { ApiPart } from './api.part'
import type { SimplifiedTrackObject } from '@/types'

// eslint-disable-next-line unused-imports/no-unused-imports
import type { Market, PaginatedResults } from '@/types/common'
import type { AlbumObject, GetAlbumsOptions, SavedAlbumObject, SimplifiedAlbumObject } from '@/types/album'

export class AlbumsAPI extends ApiPart {
  /**
   * Get Spotify catalog information for a single album.
   * @param albumId The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the album.
   * @param market {@link Market} An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
   * only content that is available in that market will be returned.
   */
  public getAlbum(albumId: string, market?: string) {
    return this.$fetch(`/albums/${albumId}`, {
      query: {
        market,
      },
    })
  }

  /**
   *Get Spotify catalog information for multiple albums identified by their Spotify IDs.
   * @param albumIds A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the albums.
   * @max `20` IDs.
   * @param market {@link Market} An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
   * only content that is available in that market will be returned.
   */
  public getAlbums(albumIds: string[], market?: string): Promise<{ albums: AlbumObject[] }> {
    return this.$fetch<{ albums: AlbumObject[] }>('/albums', {
      query: {
        ids: albumIds.join(','),
        market,
      },
    })
  }

  /**
   * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
   * @param albumId The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) of the album.
   */
  public getAlbumTracks(albumId: string, opts: GetAlbumsOptions = {}): Promise<PaginatedResults<SimplifiedTrackObject>> {
    return this.$fetch<PaginatedResults<SimplifiedTrackObject>>(`/albums/${albumId}/tracks`, {
      query: opts,
    })
  }

  /**
   * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
   * @scope `user-library-read`
   */
  public getSavedAlbums(opts: GetAlbumsOptions = {}): Promise<PaginatedResults<SavedAlbumObject>> {
    return this.$fetch<PaginatedResults<SavedAlbumObject>>('/me/albums', {
      query: opts,
    })
  }

  /**
   * Save one or more albums to the current user's 'Your Music' library.
   * @param albumIds A list of the Spotify IDs for the albums.
   * @max `50` IDs.
   * @scope `user-library-modify`
   */
  public async saveAlbums(albumIds: string[]): Promise<void> {
    await this.$fetch<void>('/me/albums', {
      method: 'PUT',
      body: {
        ids: albumIds,
      },
    })
  }

  /**
   * Remove one or more albums from the current user's 'Your Music' library.
   * @param albumIds A list of the Spotify IDs for the albums.
   * @max `50` IDs.
   * @scope `user-library-modify`
   */
  public async removeAlbums(albumIds: string[]): Promise<void> {
    await this.$fetch<void>('/me/albums', {
      method: 'DELETE',
      body: {
        ids: albumIds,
      },
    })
  }

  /**
   * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
    @param albumIds A list of the Spotify IDs for the albums.
   * @max `20` IDs.
   * @scope `user-library-read`
   */
  public checkUserSavedAlbums(albumIds: string[]): Promise<boolean[]> {
    return this.$fetch<boolean[]>('/me/albums/contains', {
      query: {
        ids: albumIds.join(','),
      },
    })
  }

  public getReleases(albumIds: string[], opts: GetAlbumsOptions = {}): Promise<{ albums: PaginatedResults<SimplifiedAlbumObject>[] }> {
    return this.$fetch<{ albums: PaginatedResults<SimplifiedAlbumObject>[] }>('/browse/new-releases', {
      query: {
        ids: albumIds.join(','),
        ...opts,
      },
    })
  }
}
