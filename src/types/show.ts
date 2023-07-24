import type { CopyrightsObject, ExternalUrlObject, ImageObject, Market, PaginatedResults, PaginationQueryOptions } from './common'
import type { SimplifiedEpisodeObject } from './episode'

export interface GetShowOptions {
  /**
   * An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
   * only content that is available in that market will be returned.
   */
  market?: Market
}

export interface ShowObject {
  /**
   * A list of the countries in which the track can be played, identified by their
   * [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
   */
  available_markets: string[]

  /**
   * The copyright statements of the show.
   */
  copyrights: CopyrightsObject[]

  /**
   * A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
   */
  description: string

  /**
   * A description of the show. This field may contain HTML tags.
   */
  html_description: string

  /**
   * Whether or not the show has explicit content (`true` = yes it does; `false` = no it does not OR unknown).
   */
  explicit: boolean

  /**
   * External URLs for this show.
   */
  external_urls: ExternalUrlObject

  /**
   * A link to the Web API endpoint providing full details of the show.
   */
  href: string

  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the show.
   */
  id: string

  /**
   * The cover art for the show in various sizes, widest first.
   */
  images: ImageObject[]

  /**
   * `true` if the show is hosted outside of Spotify's CDN.
   */
  is_externally_hosted: boolean

  /**
   * A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.
   */
  languages: string[]

  /**
   * The media type of the show.
   */
  media_type: 'audio' | 'video'

  /**
   * The name of the episode.
   */
  name: string

  /**
   * The publisher of the show.
   */
  publisher: string

  /**
   * The object type.
   */
  type: 'show'

  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the show.
   */
  uri: string

  /**
   * The total number of episodes in the show.
   */
  total_episodes: number

  /**
   * The episodes of the show.
   */
  episodes: PaginatedResults<SimplifiedEpisodeObject>
}

export type SimplifiedShowObject = Omit<ShowObject, 'episodes'>

export interface GetShowsResponse {
  shows: SimplifiedShowObject[]
}

export interface GetShowEpisodesOptions extends PaginationQueryOptions, GetShowOptions {}

export interface SavedShowObject {
  /**
   * The date and time the show was saved. Timestamps are returned in ISO 8601 format as
   * Coordinated Universal Time (UTC) with a zero offset: `YYYY-MM-DDTHH:MM:SSZ`.
   *
   * If the time is imprecise (for example, the date/time of an album release), an additional
   * field indicates the precision; see for example, `release_date` in an album object.
   */
  added_at: string

  show: SimplifiedShowObject
}
