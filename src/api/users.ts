import { ResourceType } from '../types/common'
import type { CursorResults, PaginatedResults } from '../types/common'
import type { ArtistObject } from '../types/artist'
import type { TrackObject } from '../types/track'
import type { CurrentUserGetFollowedArtistsOptions, CurrentUserProfile, CurrentUserTopItemsOptions, UserProfile } from '../types/users'
import { ApiPart } from './api.part'

export class UsersApi extends ApiPart {
  /**
   * Get detailed profile information about the current user (including the current user's username).
   * @scope `user-read-private`
   * @scope `user-read-email`
   */
  public getCurrentUserProfile(): Promise<CurrentUserProfile> {
    return this.$fetch<CurrentUserProfile>('/me')
  }

  /**
   * Get the current user's top artists or tracks based on calculated affinity.
   * @scope `user-top-read`
   */
  public getCurrentUserTopItems(type: ResourceType.Artists, opts?: CurrentUserTopItemsOptions): Promise<PaginatedResults<ArtistObject>>
  public getCurrentUserTopItems(type: ResourceType.Tracks, opts?: CurrentUserTopItemsOptions): Promise<PaginatedResults<TrackObject>>
  public getCurrentUserTopItems(
    type: ResourceType.Artists | ResourceType.Tracks,
    opts: CurrentUserTopItemsOptions = {},
  ): Promise<PaginatedResults<ArtistObject | TrackObject>> {
    return this.$fetch(`/me/top/${type}`, {
      query: opts,
    })
  }

  /**
   * Get public profile information about a Spotify user.
   * @param userId The user's [Spotify user ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids).
   */
  public getUserProfile(userId: string): Promise<UserProfile> {
    return this.$fetch<UserProfile>(`/users/${userId}`)
  }

  /**
   * Add the current user as a follower of a playlist.
   * @param playlistId The playlist's [Spotify user ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids).
   * @param options.public Defaults to `true`. If `true` the playlist will be included in user's public playlists, if `false` it will remain private.
   * @scope `playlist-modify-public`
   * @scope `playlist-modify-private`
   */
  public async followPlaylist(playlistId: string, opts: { public: boolean }): Promise<void> {
    await this.$fetch(`/playlists/${playlistId}/followers`, {
      method: 'PUT',
      body: opts,
    })
  }

  /**
   * Remove the current user as a follower of a playlist.
   * @param playlistId The playlist's [Spotify user ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids).
   * @scope `playlist-modify-public`
   * @scope `playlist-modify-private`
   */
  public async unfollowPlaylist(playlistId: string): Promise<void> {
    await this.$fetch(`/playlists/${playlistId}/followers`, {
      method: 'DELETE',
    })
  }

  /**
   * Get the current user's followed artists.
   * @scope `user-follow-read`
   */
  public getFollowedArtists(opts: CurrentUserGetFollowedArtistsOptions = {}): Promise<CursorResults<ArtistObject>> {
    return this.$fetch<CursorResults<ArtistObject>>('/me/following', {
      query: {
        type: ResourceType.Artists,
        ...opts,
      },
    })
  }

  /**
   * Add the current user as a follower of one or more artists or other Spotify users.
   * @param type The ID type: either `artist` or `user`.
   * @param ids The IDs of the artists or users to follow.
   * @scope `user-follow-modify`
   */
  public async follow(type: ResourceType.Artist | ResourceType.User, ids: string[]): Promise<void> {
    await this.$fetch('/me/following', {
      method: 'PUT',
      query: {
        type,
      },
      body: {
        ids,
      },
    })
  }

  /**
   * Remove the current user as a follower of one or more artists or other Spotify users.
   * @param type The ID type: either `artist` or `user`.
   * @param ids The IDs of the artists or users to follow.
   * @scope `user-follow-modify`
   */
  public unfollow(type: ResourceType.Artist | ResourceType.User, ids: string[]): Promise<void> {
    return this.$fetch('/me/following', {
      method: 'DELETE',
      query: {
        type,
      },
      body: {
        ids,
      },
    })
  }

  /**
   * Check to see if the current user is following one or more artists or other Spotify users.
   * @param type The ID type: either artist or user
   * @param ids A list of the artist or the user Spotify IDs to check.
   * For example: ids = ["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]
   *
   * A maximum of `50` IDs can be sent in one request.
   * @scope `user-follow-read`
   */
  public isFollowing(type: ResourceType.Artist | ResourceType.User, ids: string[]): Promise<boolean[]> {
    return this.$fetch<boolean[]>('/me/following/contains', {
      query: {
        type,
        ids: ids.join(','),
      },
    })
  }

  /**
   * Check to see if one or more Spotify users are following a specified playlist.
   * @param playlistId The Spotify ID of the playlist.
   * @param userIds A list of Spotify User IDs ; the ids of the users that you want to check to see if they follow the playlist.
   * @max `5` userIds
   */
  public async isFollowingPlaylist(playlistId: string, userIds: string[]): Promise<boolean[]> {
    return this.$fetch<boolean[]>(`/playlists/${playlistId}/followers/contains`, {
      query: {
        ids: userIds.join(','),
      },
    })
  }
}
