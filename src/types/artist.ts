import type { ExternalUrlObject, FollowersObject, ImageObject, Market } from './common'

export interface ArtistObject {
  /**
   * Known external URLs for this artist.
   */
  external_urls: ExternalUrlObject

  /**
   * Information about the followers of the artist.
   */
  followers: FollowersObject

  /**
   * A list of the genres the artist is associated with. If not yet classified, the array is empty.
   */
  genres: string[]

  /**
   * A link to the Web API endpoint providing full details of the artist.
   */
  href: string

  /**
   * The [Spotify user ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the artist.
   */
  id: string

  /**
   * Images of the artist in various sizes, widest first.
   */
  images: ImageObject[]

  /**
   * The name of the artist.
   */
  name: string

  /**
   * The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular.
   * The artist's popularity is calculated from the popularity of all the artist's tracks.
   */
  popularity: number

  /**
   * The object type.
   */
  type: 'artist'

  /**
   * /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the artist.
   */
  uri: string
}

export type SimplifiedArtistObject = Pick<ArtistObject, 'external_urls' | 'href' | 'id' | 'name' | 'type' | 'uri'>

export interface GetArtistAlbumsOptions {
  /**
   * A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned.
   * Valid values are:
   * - album
   * - single
   * - appears_on
   * - compilation
   */
  include_groups?: 'album' | 'single' | 'appears_on' | 'compilation'

  /**
   * An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
   * only content that is available in that market will be returned.
   */
  market?: Market

  /**
   * The maximum number of items to return.
   * @default `20`
   * @min `1`
   * @max `50`
   */
  limit?: number

  /**
   * The index of the first item to return. Use with limit to get the next set of items.
   * @default `0` (the first item).
   */
  offset?: number
}
