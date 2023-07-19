import type { CopyrightsObject, CursorResults, ExternalUrlObject, ImageObject, Market, PaginationQueryOptions } from './common'
import type { ArtistObject, SimplifiedArtistObject } from './artist'
import type { SimplifiedTrackObject } from './track'

export interface AlbumObject {
  /**
   * The type of the album.
   */
  album_type: 'album' | 'single' | 'compilation'

  /**
   * The number of tracks in the album.
   */
  total_tracks: number

  /**
   * A list of the countries in which the track can be played, identified by their
   * [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
   */
  available_markets: string[]

  /**
   * Known external URLs for this album.
   */
  external_urls: ExternalUrlObject

  /**
   * A link to the Web API endpoint providing full details of the album.
   */
  href: string

  /**
   * The [Spotify user ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the album.
   */
  id: string

  /**
   * Images of the album in various sizes, widest first.
   */
  images: ImageObject[]

  /**
   * The name of the album. In case of an album takedown, the value may be an empty string.
   */
  name: string

  /**
   * The date the album was first released.
   * @example "1981-12"
   */
  release_date: string

  /**
   * The precision with which release_date value is known.
   */
  release_date_precision: 'year' | 'month' | 'day'

  /**
   * Included in the response when a content restriction is applied.
   */
  restrictions: {
    /**
     * The reason for the restriction. Supported values:
     * - `market` - The content item is not available in the given market.
     * - `product` - The content item is not available for the user's subscription type.
     * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
     *
     * Additional reasons may be added in the future.
     *
     * **Note**: If you use this field, make sure that your application safely handles unknown values.
     */
    reason: 'market' | 'product' | 'explicit'
  }

  /**
   * The object type: "album"
   */
  type: 'album'

  /**
   * /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the album.
   */
  uri: string

  /**
   * The copyright statements of the album.
   */
  copyrights: CopyrightsObject[]

  /**
   * Known external IDs for the album.
   */
  external_ids: {
    /**
     * [International Standard Recording Code](https://en.wikipedia.org/wiki/International_Standard_Recording_Code)
     */
    isrc: string
    /**
     * [International Article Number](https://en.wikipedia.org/wiki/International_Article_Number)
     */
    ean: string
    /**
     * [Universal Product Code](https://en.wikipedia.org/wiki/Universal_Product_Code)
     */
    upc: string
  }

  /**
   * A list of the genres the album is associated with. If not yet classified, the array is empty.
   */
  genres: string[]

  /**
   * The label associated with the album.
   */
  label: string

  /**
   * The popularity of the album. The value will be between 0 and 100, with 100 being the most popular.
   */
  popularity: number

  /**
   * The artists of the album. Each artist object includes a link in href to more detailed information about the artist.
   */
  artists: ArtistObject[]

  /**
   * The tracks of the album.
   */
  tracks: CursorResults<SimplifiedTrackObject>[]
}

export type SimplifiedAlbumObject = Pick<
  AlbumObject,
  | 'album_type'
  | 'available_markets'
  | 'external_urls'
  | 'href'
  | 'id'
  | 'images'
  | 'name'
  | 'release_date'
  | 'release_date_precision'
  | 'restrictions'
  | 'type'
  | 'uri'
> & {
  /**
   * The field is present when getting an artist's albums. Compare to `album_type` this field represents relationship
   * between the artist and the album.
   */
  album_group: 'album' | 'single' | 'compilation' | 'appears_on'

  artists: SimplifiedArtistObject[]
}

export interface GetAlbumsOptions extends PaginationQueryOptions {
  /**
   * An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
   * only content that is available in that market will be returned.
   */
  market?: Market
}

export interface SavedAlbumObject {
  /**
   * The date and time the album was saved Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC)
   * with a zero offset: YYYY-MM-DDTHH:MM:SSZ. If the time is imprecise (for example, the date/time of an album release),
   * an additional field indicates the precision; see for example, release_date in an album object.
   */
  added_at: string

  /**
   * Information about the album
   */
  album: AlbumObject
}
