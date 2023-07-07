import type { SimplifiedAlbumObject } from '../types/album'
import type { ArtistObject, GetArtistAlbumsOptions } from '../types/artist'
import type { TrackObject } from '../types/track'

// eslint-disable-next-line unused-imports/no-unused-imports
import type { Market, PaginatedResults } from '../types/common'
import { ApiPart } from './api.part'

export class ArtistsApi extends ApiPart {
  /**
   * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
   * @param artistId The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist.
   */
  public getArtist(artistId: string): Promise<ArtistObject> {
    return this.$fetch<ArtistObject>(`/artists/${artistId}`)
  }

  /**
   * Get Spotify catalog information for several artists based on their Spotify IDs.
   * @param artistIds A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the artists.
   * @max `50` IDs.
   */
  public getArtists(artistIds: string[]): Promise<{ artists: ArtistObject[] }> {
    return this.$fetch<{ artists: ArtistObject[] }>('/artists', {
      query: {
        ids: artistIds.join(','),
      },
    })
  }

  /**
   * Get Spotify catalog information about an artist's albums.
   * @param artistId The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist.
   */
  public getArtistAlbums(artistId: string, opts: GetArtistAlbumsOptions = {}): Promise<PaginatedResults<SimplifiedAlbumObject>> {
    return this.$fetch<PaginatedResults<SimplifiedAlbumObject>>(`/artists/${artistId}/albums`, {
      query: opts,
    })
  }

  /**
   *
   * @param artistId The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist.
   * @param market {@link Market} An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
   * only content that is available in that market will be returned.
   */
  public getArtistTopTracks(artistId: string, market?: string): Promise<{ tracks: TrackObject[] }> {
    return this.$fetch<{ tracks: TrackObject[] }>(`/artists/${artistId}/top-tracks`, {
      query: {
        market,
      },
    })
  }

  /**
   * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.
   * @param artistId The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist.
   */
  public getRelatedArtists(artistId: string): Promise<{ artists: ArtistObject[] }> {
    return this.$fetch<{ artists: ArtistObject[] }>(`/artists/${artistId}/related-artists`)
  }
}
