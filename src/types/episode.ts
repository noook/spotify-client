import type { ExternalUrlObject, ImageObject, Market, PaginationQueryOptions } from './common'
import type { SimplifiedShowObject } from '.'

export interface GetEpisodeOptions {
  /**
     * An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
     * only content that is available in that market will be returned.
     */
  market?: Market
}

export interface EpisodeObject {
  /**
   * A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.
   */
  audio_preview_url: string | null

  /**
   * A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
   */
  description: string

  /**
   * A description of the episode. This field may contain HTML tags.
   */
  html_description: string

  /**
   * Whether or not the episode has explicit content (`true` = yes it does; `false` = no it does not OR unknown).
   */
  explicit: boolean

  /**
   * External URLs for this episode.
   */
  external_urls: ExternalUrlObject

  /**
   * A link to the Web API endpoint providing full details of the episode.
   */
  href: string

  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the episode.
   */
  id: string

  /**
   * The cover art for the episode in various sizes, widest first.
   */
  images: ImageObject[]

  /**
   * `true` if the episode is hosted outside of Spotify's CDN.
   */
  is_externally_hosted: boolean

  /**
   * `true` if the episode is playable in the given market. Otherwise `false`.
   */
  is_playable: boolean

  /**
   * A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.
   */
  languages: string[]

  /**
   * The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future.
   * Please use the languages field instead.
   * @deprecated
   */
  language: string

  /**
   * The name of the episode
   */
  name: string

  /**
   * The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
   */
  release_date: string

  /**
   * The precision with which `release_date` value is known.
   */
  release_date_precision: 'year' | 'month' | 'day'

  /**
   * The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.
   */
  resume_point?: {
    /**
     * Whether or not the episode has been fully played by the user.
     */
    fully_played: boolean

    /**
     * The user's most recent position in the episode in milliseconds.
     */
    resume_position_ms: number
  }

  /**
   * The object type.
   */
  type: 'episode'

  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the episode.
   */
  uri: string

  /**
   * Included in the response when a content restriction is applied.
   */
  restrictions?: {
    /**
     * The reason for the restriction. Supported values:
     * - `market` - The content item is not available in the given market.
     * - `product` - The content item is not available for the user's subscription type.
     * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
     *
     * Additional reasons may be added in the future.
     *
     * **Note:** If you use this field, make sure that your application safely handles unknown values.
     */
    reason: string
  }

  show: SimplifiedShowObject
}

export type SimplifiedEpisodeObject = Omit<EpisodeObject, 'show'>

export interface GetEpisodesResponse {
  episodes: EpisodeObject[]
}

export interface GetSavedEpisodesOptions extends PaginationQueryOptions, GetEpisodeOptions {}

export interface SavedEpisodeObject {
  /**
   * The date and time the episode was saved. Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  added_at: string

  episode: EpisodeObject
}
