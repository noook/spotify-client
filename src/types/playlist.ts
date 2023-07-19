import type { ExternalUrlObject, FollowersObject, ImageObject, Market, PaginatedResults, PaginationQueryOptions } from './common'
import type { EpisodeObject } from './episode'
import type { TrackObject } from './track'
import type { UserProfile } from './users'

export interface GetPlaylistOptions {
  /**
   * An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
   * only content that is available in that market will be returned.
   */
  market?: Market

  /**
   * Filters for the query: a comma-separated list of the fields to return. If omitted, all fields are returned.
   * For example, to get just the playlist's description and URI:
   * `fields=description,uri`.
   * A dot separator can be used to specify non-reoccurring fields, while parentheses can be used to specify reoccurring fields within objects.
   * For example, to get just the added date and user ID of the adder:
   * `fields=tracks.items(added_at,added_by.id)`.
   * Use multiple parentheses to drill down into nested objects, for example:
   * `fields=tracks.items(track(name,href,album(name,href)))`.
   * Fields can be excluded by prefixing them with an exclamation mark, for example:
   * `fields=tracks.items(track(name,href,album(!name,href)))`
   *
   * @example "items(added_by.id,track(name,href,album(name,href)))"
   */
  fields?: string

  /**
   * A list of item types that your client supports besides the default track type. Valid types are: track and episode.
   * Note: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future.
   * @deprecated This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future.
   * In addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the type field of each object.
   */
  additional_types?: ('track' | 'episode')[]
}

export interface PlaylistTrackObject {
  /**
   * The date and time the track or episode was added.
   * **Note**: some very old playlists may return null in this field.
   */
  added_at: string | null

  /**
   * The Spotify user who added the track or episode.
   * **Note**: some very old playlists may return null in this field.
   */
  added_by: Omit<UserProfile, 'images'> | null

  /**
   * Whether this track or episode is a [local file](https://developer.spotify.com/documentation/web-api/concepts/playlists#local-files)
   * or not.
   */
  is_local: boolean

  track: TrackObject | EpisodeObject
}

export interface PlaylistObject {
  /**
   * `true` if the owner allows other users to modify the playlist.
   */
  collaborative: boolean

  /**
   * The playlist description. Only returned for modified, verified playlists, otherwise `null`.
   */
  description: string | null

  /**
   * Known external URLs for this playlist.
   */
  external_urls: ExternalUrlObject

  /**
   * Information about the followers of the playlist.
   */
  followers: FollowersObject

  /**
   * A link to the Web API endpoint providing full details of the playlist.
   */
  href: string

  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
   */
  id: string

  /**
   * Images for the playlist. The array may be empty or contain up to three images. The images are returned by size
   * in descending order. See [Working with Playlists](https://developer.spotify.com/documentation/web-api/concepts/playlists).
   * **Note**: If returned, the source URL for the image (url) is temporary and will expire in less than a day.
   */
  images: ImageObject[]

  /**
   * The name of the playlist.
   */
  name: string

  /**
   * The user who owns the playlist
   */
  owner: Omit<UserProfile, 'images'>

  /**
   * The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the
   * playlist status is not relevant.
   * For more about public/private status, see [Working with Playlists](https://developer.spotify.com/documentation/web-api/concepts/playlists).
   */
  public: boolean | null

  /**
   * The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version
   */
  snapshot_id: string

  /**
   * The tracks of the playlist
   */
  tracks: PaginatedResults<PlaylistObject>

  /**
   * The object type: "playlist"
   */
  type: 'playlist'

  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the playlist.
   */
  uri: string
}

export type PlaylistObjectSimplified = Omit<PlaylistObject, 'tracks' | 'followers'> & {
  /**
   * A collection containing a link ( href ) to the Web API endpoint where full details of the playlist's tracks can be retrieved,
   * along with the total number of tracks in the playlist.
   * Note, a track object may be null. This can happen if a track is no longer available.
   */
  tracks: {
    /**
     * A link to the Web API endpoint where full details of the playlist's tracks can be retrieved.
     */
    href: string
    /**
     * Number of tracks in the playlist.
     */
    total: number
  }
}

export interface UpdatePlaylistOptions {
  /**
   * The new name for the playlist, for example "My New Playlist Title"
   */
  name?: string

  /**
   * If `true` the playlist will be public, if `false` it will be private.
   */
  public?: boolean

  /**
   * If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client.
   * **Note**: You can only set collaborative to true on non-public playlists.
   */
  collaborative?: boolean

  /**
   * Value for playlist description as displayed in Spotify Clients and in the Web API.
   */
  description?: string
}

export interface GetPlaylistItemsOptions extends GetPlaylistOptions, PaginationQueryOptions {}

export interface ReorderPlaylistItemsOptions {
  /**
   * A list of [Spotify URIs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) to set,
   * can be track or episode URIs.
   * @max `100`
   * @example ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]
   */
  uris: string[]

  /**
   * The position of the first item to be reordered.
   */
  range_start?: number

  /**
   * The position where the items should be inserted.
   * - To reorder the items to the end of the playlist, simply set `insert_before` to the position after the last item.
   * - To reorder the first item to the last position in a playlist with 10 items:
   *   ```ts
   *   { range_start: 0, insert_before: 10 }
   *   ```
   * - To reorder the last item in a playlist with 10 items to the start of the playlist:
   *   ```ts
   *   { range_start: 9, insert_before: 0 }
   *   ```
   */
  insert_before?: number

  /**
   * The amount of items to be reordered. Defaults to `1` if not set.
   * The range of items to be reordered begins from the `range_start` position, and includes the `range_length` subsequent items.
   * - To move the items at index `9-10` to the start of the playlist, `range_start` is set to 9, and `range_length` is set to 2.
   *   ```ts
   *   { range_start: 9, range_length: 2 }
   *   ```
   */
  range_length?: number

  /**
   * The playlist's snapshot ID against which you want to make the changes.
   */
  snapshot_id?: string
}

export interface UpdatePlaylistItemsResponse {
  /**
   * A snapshot ID for the playlist
   */
  snapshot_id: string
}

export interface AddPlaylistItemsOptions {
  /**
   * A list of [Spotify URIs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) to set,
   * can be track or episode URIs.
   * @max `100`
   * @example ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]
   */
  uris: string[]

  /**
   * The position to insert the items, a zero-based index.
   * - To insert the items in the first position:
   *   ```ts
   *   { position: 0 }
   *   ```
   * - To insert the items in the third position:
   *   ```ts
   *   { position: 2 }
   *   ```
   * - If omitted, the items will be appended to the playlist.
   *
   * Items are added in the order they appear in the uris array.
   */
  position?: number
}

export interface RemovePlaylistItemsOptions {
  /**
   * A list of [Spotify URIs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) to set,
   * can be track or episode URIs.
   * @max `100`
   * @example ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]
   */
  uris: string[]

  /**
   * The playlist's snapshot ID against which you want to make the changes.
   * The API will validate that the specified items exist and in the specified positions and make the changes,
   * even if more recent changes have been made to the playlist.
   */
  snapshot_id?: string
}

export interface CreatePlaylistOptions {
  /**
   * The name for the new playlist, for example "Your Coolest Playlist".
   * This name does not need to be unique; a user may have several playlists with the same name.
   */
  name: string

  /**
   * Defaults to true. If true the playlist will be public, if false it will be private.
   * To be able to create private playlists, the user must have granted the `playlist-modify-private` scope
   * @scope `playlist-modify-private`
   */
  public?: boolean

  /**
   * If true the playlist will be collaborative.
   * **Note:** to create a collaborative playlist you must also set `public` to `false`.
   * To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` scopes.
   * @default false
   * @scope `playlist-modify-private`
   * @scope `playlist-modify-public`
   */
  collaborative?: boolean

  /**
   * Value for playlist description as displayed in Spotify Clients and in the Web API.
   */
  description?: string
}

export interface GetFeaturedPlaylistsOptions extends PaginationQueryOptions {
  /**
   * A country: an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.
   * Provide this parameter if you want the list of returned items to be relevant to a particular country.
   * If omitted, the returned items will be relevant to all countries.
   */
  country?: string

  /**
   * The desired language, consisting of a lowercase [ISO 639-1 ](https://en.wikipedia.org/wiki/ISO_639-1) language code
   * and an uppercase [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code, joined by an underscore.
   * For example: `es_MX`, meaning "Spanish (Mexico)".
   *
   * Provide this parameter if you want the results returned in a particular language (where available).
   *
   * **Note:** if locale is not supplied, or if the specified language is not available, all strings will be returned in
   * the Spotify default language (American English).
   *
   * The locale parameter, combined with the country parameter, may give odd results if not carefully matched.For example country=SE&locale=de_DE will return a list of categories relevant to Sweden but as German language strings.
   */
  locale?: string

  /**
   * A timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `yyyy-MM-ddTHH:mm:ss`.
   *
   * Use this parameter to specify the user's local time to get results tailored for that specific date and time in the day.
   *
   * If not provided, the response defaults to the current UTC time. Example: "2014-10-23T09:00:00" for a user whose local time is 9AM.
   *
   * If there were no featured playlists (or there is no data) at the specified time, the response will revert to the current UTC time.
   */
  timestamp?: string
}

export interface GetFeaturedPlaylistsResponse {
  message: string

  playlists: PaginatedResults<PlaylistObjectSimplified>
}
