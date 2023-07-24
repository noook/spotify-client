import type { CopyrightsObject, ExternalUrlObject, ImageObject, Market, PaginatedResults, PaginationQueryOptions } from './common'
import type { SimplifiedChapterObject } from '.'

export interface GetAudiobookOptions {
/**
   * An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
   * only content that is available in that market will be returned.
   */
  market?: Market
}

export interface GetAudiobookChapterOptions extends PaginationQueryOptions, GetAudiobookOptions {}

export interface GetAudiobooksResponse {
  audiobooks: AudiobookObject[]
}

export interface AudiobookAuthor {
  /**
   * The name of the author.
   */
  name: string
}

export interface AudiobookNarrator {
  /**
   * The name of the narrator.
   */
  name: string
}

export interface AudiobookObject {
  authors: AudiobookAuthor[]

  /**
   * /**
   * A list of the countries in which the track can be played, identified by their
   * [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
   */
  available_markets: string[]

  /**
   * The copyright statements of the audiobook.
   */
  copyrights: CopyrightsObject[]

  /**
   * A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
   */
  description: string

  /**
   * A description of the audiobook. This field may contain HTML tags.
   */
  html_description: string

  /**
   * The edition of the audiobook.
   */
  edition?: string

  /**
   * Whether or not the audiobook has explicit content (`true` = yes it does; `false` = no it does not OR unknown).
   */
  explicit: boolean

  /**
   * External URLs for this audiobook.
   */
  external_urls: ExternalUrlObject

  /**
   * A link to the Web API endpoint providing full details of the audiobook.
   */
  href: string

  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.
   */
  id: string

  /**
   * The cover art for the audiobook in various sizes, widest first.
   */
  images: ImageObject[]

  /**
   * A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.
   */
  languages: string[]

  /**
   * The media type of the audiobook.
   */
  media_type: string

  /**
   * The name of the audiobook.
   */
  name: string

  /**
   * The narrator(s) for the audiobook.
   */
  narrators: AudiobookNarrator[]

  /**
   * The publisher of the audiobook.
   */
  publisher: string

  /**
   * Allowed values: "audiobook"
   */
  type: 'audiobook'

  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.
   */
  uri: string

  /**
   * The number of chapters in this audiobook.
   */
  total_chapters: number

  /**
   * The chapters of the audiobook.
   */
  chapters: PaginatedResults<SimplifiedChapterObject>
}

export type SimplifiedAudiobookObject = Omit<AudiobookObject, 'chapters'>
