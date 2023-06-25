import type { ArtistObject } from './artist'
import type { ExternalUrlObject } from './common'

export interface TrackObject {
  /**
   * The artists who performed the track. Each artist object includes a link in href to more
   * detailed information about the artist.
   */
  artists: ArtistObject[]

  /**
   * A list of the countries in which the track can be played, identified by their
   * [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
   */
  available_markets: string[]

  /**
   * The disc number (usually 1 unless the album consists of more than one disc).
   */
  disc_number: number

  /**
   * The track length in milliseconds.
   */
  duration_ms: number

  /**
   * Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown).
   */
  explicit: boolean

  /**
   * Known external IDs for the track.
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
   * Known external URLs for this track.
   */
  external_urls: ExternalUrlObject

  /**
   * A link to the Web API endpoint providing full details of the track.
   */
  href: string

  /**
   * The [Spotify user ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the track.
   */
  id: string

  /**
   * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/web-api/concepts/track-relinking)
   * is applied. If true, the track is playable in the given market. Otherwise false.
   */
  is_playable: boolean

  /**
   * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/web-api/concepts/track-relinking)
   * is applied, and the requested track has been replaced with different track. The track in the `linked_from` object contains
   * information about the originally requested track.
   * @todo complete type
   */
  linked_from: any

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
   * The name of the track.
   */
  name: string

  /**
   * The popularity of the track. The value will be between `0` and `100`, with `100` being the most popular.
   *
   * The popularity of a track is a value between `0` and `100`, with `100` being the most popular. The popularity
   * is calculated by algorithm and is based, in the most part, on the total number of plays the track has
   * had and how recent those plays are.
   *
   * Generally speaking, songs that are being played a lot now will have a higher popularity than songs that
   * were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are
   * rated independently. Artist and album popularity is derived mathematically from track popularity.
   *
   * **Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time.
   */
  popularity: number

  /**
   * A link to a 30 second preview (MP3 format) of the track.
   */
  preview_url: string | null

  /**
   * The number of the track. If an album has several discs, the track number is the number on the specified disc.
   */
  track_number: number

  /**
   * The object type.
   */
  type: 'track'

  /**
   * /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the track.
   */
  uri: string

  /**
   * Whether or not the track is from a local file.
   */
  is_local: boolean
}
