import { ApiPart } from './api.part'
import type { ImageObject, PaginatedResults } from '@/types/common'
import type { AddPlaylistItemsOptions, CreatePlaylistOptions, GetFeaturedPlaylistsOptions, GetFeaturedPlaylistsResponse, GetPlaylistItemsOptions, GetPlaylistOptions, PlaylistObject, PlaylistObjectSimplified, PlaylistTrackObject, RemovePlaylistItemsOptions, ReorderPlaylistItemsOptions, UpdatePlaylistItemsResponse, UpdatePlaylistOptions } from '@/types/playlist'

export class PlaylistsApi extends ApiPart {
  /**
   * Get a playlist owned by a Spotify user.
   * @param playlistId The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
   */
  public getPlaylist(playlistId: string, opts: GetPlaylistOptions = {}): Promise<PlaylistObject> {
    return this.$fetch<PlaylistObject>(`/playlists/${playlistId}`, {
      query: {
        ...opts,
        additional_types: opts.additional_types?.join(','),
      },
    })
  }

  /**
   * Change a playlist's name and public/private state. (The user must, of course, own the playlist.)
   * @param playlistId The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
   * @scope `playlist-modify-public`
   * @scope `playlist-modify-private`
   */
  public async updatePlaylistDetails(playlistId: string, opts: UpdatePlaylistOptions): Promise<void> {
    await this.$fetch(`/playlists/${playlistId}`, {
      method: 'PUT',
      body: opts,
    })
  }

  /**
   * Get full details of the items of a playlist owned by a Spotify user.
   * @param playlistId The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
   * @scope playlist-read-private
   */
  public async getPlaylistItems(playlistId: string, opts: GetPlaylistItemsOptions = {}): Promise<PaginatedResults<PlaylistTrackObject>> {
    return this.$fetch<PaginatedResults<PlaylistTrackObject>>(`/playlists/${playlistId}/tracks`, {
      query: {
        ...opts,
        additional_types: opts.additional_types?.join(','),
      },
    })
  }

  /**
   * Either reorder or replace items in a playlist depending on the request's parameters.
   * - To reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.
   * - To replace items, include `uris` as either a query parameter or in the request's body.
   *
   * Replacing items in a playlist will overwrite its existing items.
   * This operation can be used for replacing or clearing items in a playlist.
   * @scope `playlist-modify-public`
   * @scope `playlist-modify-private`
   */
  public updatePlaylistItems(playlistId: string, opts: ReorderPlaylistItemsOptions): Promise<UpdatePlaylistItemsResponse> {
    return this.$fetch<UpdatePlaylistItemsResponse>(`/playlists/${playlistId}/tracks`, {
      method: 'PUT',
      body: opts,
    })
  }

  /**
   * Add one or more items to a user's playlist.
   * @scope `playlist-modify-public`
   * @scope `playlist-modify-private`
   */
  public addPlaylistItems(playlistId: string, opts: AddPlaylistItemsOptions): Promise<UpdatePlaylistItemsResponse> {
    return this.$fetch<UpdatePlaylistItemsResponse>(`/playlists/${playlistId}/tracks`, {
      method: 'POST',
      body: opts,
    })
  }

  /**
   * Remove one or more items from a user's playlist.
   * @scope `playlist-modify-public`
   * @scope `playlist-modify-private`
   */
  public removePlaylistItems(playlistId: string, opts: RemovePlaylistItemsOptions): Promise<UpdatePlaylistItemsResponse> {
    return this.$fetch<UpdatePlaylistItemsResponse>(`/playlists/${playlistId}/tracks`, {
      method: 'DELETE',
      body: {
        tracks: opts.uris.map(uri => ({ uri })),
        snapshot_id: opts.snapshot_id,
      },
    })
  }

  /**
   * Get a list of the playlists owned or followed by the current Spotify user.
   * @scope `playlist-read-private`
   */
  public getCurrentUserPlaylists(opts: Pick<GetPlaylistItemsOptions, 'limit' | 'offset'> = {}): Promise<PaginatedResults<PlaylistObjectSimplified>> {
    return this.$fetch<PaginatedResults<PlaylistObjectSimplified>>('/me/playlists', {
      query: opts,
    })
  }

  /**
   * Get a list of the playlists owned or followed by a Spotify user.
   * @scope `playlist-read-private`
   * @scope `playlist-read-collaborative`
   */
  public getUserPlaylists(userId: string, opts: Pick<GetPlaylistItemsOptions, 'limit' | 'offset'> = {}): Promise<PaginatedResults<PlaylistObjectSimplified>> {
    return this.$fetch<PaginatedResults<PlaylistObjectSimplified>>(`/users/${userId}/playlists`, {
      query: {
        user_id: userId,
        ...opts,
      },
    })
  }

  /**
   * Create a playlist for a Spotify user.
   * The playlist will be empty until you add tracks. ({@link PlaylistsApi.addPlaylistItems})
   * @param userId
   * @param opts
   * @returns
   */
  public createPlaylist(userId: string, opts: CreatePlaylistOptions): Promise<PlaylistObject> {
    return this.$fetch<PlaylistObject>(`/users/${userId}/playlists`, {
      method: 'POST',
      body: opts,
    })
  }

  /**
   * Get the current image associated with a specific playlist.
   */
  public getPlaylistCoverImage(playlistId: string): Promise<ImageObject[]> {
    return this.$fetch<ImageObject[]>(`/playlists/${playlistId}/images`)
  }

  /**
   * Replace the image used to represent a specific playlist.
   * @param image Base64 encoded JPEG image data, maximum payload size is 256 KB
   * @scope `ugc-image-upload`
   * @scope `playlist-modify-public`
   * @scope `playlist-modify-private`
   */
  public async addCustomPlaylistCoverImage(playlistId: string, image: string): Promise<void> {
    await this.$fetch(`/playlists/${playlistId}/images`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: image,
    })
  }

  /**
   * Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
   */
  public getFeaturedPlaylists(opts: GetFeaturedPlaylistsOptions = {}): Promise<GetFeaturedPlaylistsResponse> {
    return this.$fetch<GetFeaturedPlaylistsResponse>('/browse/featured-playlists', {
      query: opts,
    })
  }

  /**
   * Get a list of Spotify playlists tagged with a particular category.
   */
  public getPlaylistsForCategory(categoryId: string, opts: Pick<GetFeaturedPlaylistsOptions, 'country' | 'limit' | 'offset'> = {}): Promise<GetFeaturedPlaylistsResponse> {
    return this.$fetch<GetFeaturedPlaylistsResponse>(`/browse/categories/${categoryId}/playlists`, {
      query: opts,
    })
  }
}
