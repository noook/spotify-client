import type { ArtistObject } from './artist'
import type { ExternalUrlObject, FollowersObject, ImageObject, PaginatedResults, TimeRange } from './common'
import type { TrackObject } from './track'

export interface UserProfile {
  /**
   * The name displayed on the user's profile. null if not available.
   */
  display_name: null | string

  /**
   * Known external URLs for this user.
   */
  external_urls: ExternalUrlObject

  /**
   * Onformation about the followers of the user.
   */
  followers: FollowersObject

  /**
   * A link to the Web API endpoint for this user.
   */
  href: string

  /**
   * The [Spotify user ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the user.
   */
  id: string

  /**
   * The user's profile image.
   */
  images: ImageObject[]

  /**
   * The object type: "user"
   */
  type: 'user'

  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the user.
   */
  uri: string

}

export interface CurrentUserProfile extends UserProfile {
  /**
   * This field is only available when the current user has granted access to the `user-read-private` scope.
   */
  country?: string

  /**
   * The user's email address, as entered by the user when creating their account. Important! This email
   * address is unverified; there is no proof that it actually belongs to the user. This field is only
   * available when the current user has granted access to the `user-read-email` scope.
   */
  email?: string
  /**
   * The user's explicit content settings. This field is only available when the current user has granted
   * access to the `user-read-private` scope.
   */
  explicit_content?: {
    /**
     * When true, indicates that explicit content should not be played.
     */
    filter_enabled: boolean
    /**
     * When true, indicates that the explicit content setting is locked and can't be changed by the user.
     */
    filter_locked: boolean
  }

  /**
   * The user's Spotify subscription level: "premium", "free", etc. (The subscription level "open"
   * can be considered the same as "free".) This field is only available when the current user has
   * granted access to the `user-read-private` scope.
   */
  product?: 'premium' | 'free' | 'open' | string
}

export interface CurrentUserTopItemsOptions {
  /**
   * Over what time frame the affinities are computed. Valid values: long_term (calculated from several
   * years of data and including all new data as it becomes available), medium_term (approximately last 6 months),
   * short_term (approximately last 4 weeks). The default is "medium_term".
   * @default "medium_term"
   */
  time_range?: TimeRange

  /**
   * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @default 20
   * @min 1
   * @max 50
   */
  limit?: number

  /**
   * The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   * @default 0
   */
  offset?: number
}

export type CurrentUserTopItemsResponse = PaginatedResults<ArtistObject | TrackObject>

export interface CurrentUserGetFollowedArtistsOptions {
  /**
   * The last artist ID retrieved from the previous request.
   */
  after?: string

  /**
   * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @default 20
   * @min 1
   * @max 50
   */
  limit?: number
}
