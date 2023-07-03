import type { ExternalUrlObject, Market, ResourceType } from './common'
import type { EpisodeObject } from './episode'
import type { TrackObject } from './track'

export interface getRecentlyPlayedTracksOptions {
  /**
   * The maximum number of items to return.
   * @default `20`
   * @min `1`
   * @max `50`
   */
  limit?: number

  /**
   * A Unix timestamp in milliseconds. Returns all items after (but not including)
   * this cursor position. If after is specified, before must not be specified.
   */
  after?: number

  /**
   * A Unix timestamp in milliseconds. Returns all items before (but not including) this cursor position.
   * If before is specified, after must not be specified.
   */
  before?: number
}

export interface PlayHistoryObject {
  /**
   * The track the user listened to.
   */
  track: TrackObject

  /**
   * The date and time the track was played.
   */
  played_at: string

  /**
   * The context the track was played from.
   */
  context: {
    /**
     * The object type, e.g. "artist", "playlist", "album", "show".
     */
    type: ResourceType.Artist | ResourceType.Playlist | ResourceType.Album | ResourceType.Show

    /**
     * A link to the Web API endpoint providing full details of the track.
     */
    href: string

    /**
     * External URLs for this context.
     */
    external_urls: ExternalUrlObject

    /**
     * The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
     * for the context.
     */
    uri: string
  }
}

export interface GetPlaybackStateOptions {
  /**
   * An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
   * only content that is available in that market will be returned.
   */
  market?: Market

  /**
   * A list of item types that your client supports besides the default track type. Valid types are: track and episode.
   * Note: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future.
   * @deprecated This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future.
   * In addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the type field of each object.
   */
  additional_types?: ('track' | 'episode')[]
}

export interface Device {
  /**
   * The device ID
   */
  id: string | null

  /**
   * If this device is the currently active device.
   */
  is_active: boolean

  /**
   * If this device is currently in a private session.
   */
  is_private_session: boolean

  /**
   * Whether controlling this device is restricted. At present if this is "true"
   * then no Web API commands will be accepted by this device.
   */
  is_restricted: boolean

  /**
   * A human-readable name for the device. Some devices have a name that
   * the user can configure (e.g. "Loudest speaker") and some devices have a
   * generic name associated with the manufacturer or device model.
   */
  name: string

  /**
   * Device type, such as "computer", "smartphone" or "speaker".
   */
  type: string

  /**
   * The current volume in percent.
   * @min `0`
   * @max `100`
   */
  volume_percent: number | null
}

export interface PlaybackState {
  /**
   * The device that is currently active.
   */
  device: Device

  /**
   * off, track, context
   */
  repeat_state: 'off' | 'track' | 'context'

  /**
   * If shuffle is on or off.
   */
  shuffle_state: boolean

  /**
   * A Context Object.
   */
  context: {
    /**
     * The object type, e.g. "artist", "playlist", "album", "show".
     */
    type: ResourceType.Artist | ResourceType.Playlist | ResourceType.Album | ResourceType.Show

    /**
     * A link to the Web API endpoint providing full details of the track.
     */
    href: string

    /**
     * External URLs for this context.
     */
    external_urls: ExternalUrlObject

    /**
     * The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
     * for the context.
     */
    uri: string
  } | null

  /**
   * Unix Millisecond Timestamp when data was fetched.
   */
  timestamp: number

  /**
   * Progress into the currently playing track or episode.
   */
  progress_ms: number | null

  /**
   * If something is currently playing, return true
   */
  is_playing: boolean

  /**
   * The currently playing track or episode.
   */
  item: TrackObject | EpisodeObject | null

  /**
   * The object type of the currently playing item. Can be one of track, episode,
   * ad or unknown.
   */
  currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown'

  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   */
  actions: {
    /**
     * Interrupting playback.
     */
    interrupting_playback?: boolean

    /**
     * Pausing.
     */
    pausing?: boolean

    /**
     * Resuming.
     */
    resuming?: boolean

    /**
     * Seeking playback location.
     */
    seeking?: boolean

    /**
     * Skipping to the next context.
     */
    skipping_next?: boolean

    /**
     * Skipping to the previous context.
     */
    skipping_prev?: boolean

    /**
     * Skipping to the previous context.
     */
    toggling_repeat_context?: boolean

    /**
     * Toggling shuffle flag.
     */
    toggling_shuffle?: boolean

    /**
     * Toggling repeat track flag.
     */
    toggling_repeat_track?: boolean

    /**
     * Transfering playback between devices.
     */
    transferring_playback?: boolean
  }
}

export interface SetPlaybackStateOptions {
  /**
   * Spotify URI of the context to play. Valid contexts are albums, artists & playlists.
   * @example { context_uri: "spotify:album:1Je1IMUlBXcx1Fz0WE7oPT" }
   */
  context_uri?: string

  /**
   * A JSON array of the Spotify track URIs to play.
   * @example { uris: ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"] }
   */
  uris?: string[]

  /**
   * Indicates from where in the context playback should start. Only available when context_uri corresponds
   * to an album or playlist object.
   */
  offset?: {
    /**
     * position" is zero based and can’t be negative
     * @example "offset": { "position": 5 }
     */
    position?: number

    /**
     * "uri" is a string representing the uri of the item to start at.
     * @example "offset": { "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }
     */
    uri?: string
  }

  position_ms?: number
}

export interface UserQueueResponse {
  /**
   * The currently playing track or episode.
   */
  currently_playing: null | EpisodeObject | TrackObject

  /**
   * The tracks or episodes in the queue. Can be empty.
   */
  queue: TrackObject[] | EpisodeObject[]
}
