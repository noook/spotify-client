export enum ResourceType {
  Album = 'album',
  Artist = 'artist',
  Playlist = 'playlist',
  Track = 'track',
  Show = 'show',
  Episode = 'episode',
  Audiobook = 'audiobook',

  Albums = 'albums',
  Artists = 'artists',
  Playlists = 'playlists',
  Tracks = 'tracks',
  Shows = 'shows',
  Episodes = 'episodes',
  Audiobooks = 'audiobooks',

  User = 'user',
}

export enum TimeRange {
  LongTerm = 'long_term',
  MediumTerm = 'medium_term',
  ShortTerm = 'short_term',
}

/**
 * An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
 * only content that is available in that market will be returned.
 * If a valid user access token is specified in the request header, the country associated with the user account will take
 * priority over this parameter.
 * **Note**: If neither market or user country are provided, the content is considered unavailable for the client.
 * Users can view the country that is associated with their account in the account settings.
 * @example "ES"
 */
export type Market = string

export interface ExternalUrlObject {
  /**
   * The [Spotify URL](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the object.
   */
  spotify: string
}

export interface CopyrightsObject {
  /**
   * The copyright text for this content.
   */
  text: string

  /**
   * The type of copyright: C = the copyright, P = the sound recording (performance) copyright.
   */
  type: 'C' | 'P'
}

export interface FollowersObject {
  /**
   * This will always be set to null, as the Web API does not support it at the moment.
   */
  href: null
  /**
   * The total number of followers.
   */
  total: number
}

export interface ImageObject {
  /**
   * The source URL of the image.
   */
  url: string
  /**
   * The image height in pixels.
   */
  height: number | null
  /**
   * The image width in pixels.
   */
  width: number | null
}

export interface PaginatedResults<T> {
  /**
   * A link to the Web API endpoint returning the full result of the request
   * @example "https://api.spotify.com/v1/me/shows?offset=0&limit=20"
   */
  href: string

  /**
   * The maximum number of items in the response (as set in the query or by default).
   */
  limit: number

  /**
   * URL to the next page of items. (null if none)
   */
  next: string | null

  /**
   * The offset of the items returned (as set in the query or by default)
   */
  offset: number

  /**
   * URL to the previous page of items. (null if none)
   */
  previous: string | null

  /**
   * The total number of items available to return.
   */
  total: number

  items: T[]
}

export interface CursorResults<T> {
  /**
   * A link to the Web API endpoint returning the full result of the request.
   */
  href: string

  /**
   * The maximum number of items in the response (as set in the query or by default).
   */
  limit: number

  /**
   * URL to the next page of items. (null if none)
   */
  next: string | null

  /**
   * The cursors used to find the next set of items.
   */
  cursors: {
    /**
     * The cursor to use as key to find the next page of items.
     */
    after: string

    /**
     * The cursor to use as key to find the previous page of items.
     */
    before: string
  }

  /**
   * The total number of items available to return.
   */
  total: number

  items: T[]
}
