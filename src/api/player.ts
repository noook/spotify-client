import type { CursorResults } from '../types/common'
import type { Device, GetPlaybackStateOptions, PlayHistoryObject, PlaybackState, SetPlaybackStateOptions, UserQueueResponse, getRecentlyPlayedTracksOptions } from '../types/player'
import { ApiPart } from './api.part'

export class PlayerApi extends ApiPart {
  /**
   * Get information about the user’s current playback state, including track or episode,
   * progress, and active device.
   * @scope `user-read-playback-state`
   */
  public getPlaybackState(opts: GetPlaybackStateOptions = {}): Promise<PlaybackState> {
    return this.$fetch<PlaybackState>('/me/player', {
      query: {
        ...opts,
        additional_types: opts.additional_types?.join(','),
      },
    })
  }

  /**
   * Transfer playback to a new device and determine if it should start playing.
   * @param play `true`: ensure playback happens on new device. `false` or not provided: keep the current playback state.
   * @scope `user-modify-playback-state`
   */
  public async transferPlayback(deviceId: string, play?: boolean): Promise<void> {
    await this.$fetch<void>('/me/player', {
      method: 'PUT',
      body: {
        device_ids: [deviceId],
        play,
      },
    })
  }

  /**
   * Get information about a user’s available devices.
   * @scope `user-read-playback-state`
   */
  public getAvailableDevices(): Promise<Device[]> {
    return this.$fetch<Device[]>('/me/player/devices')
  }

  /**
   * Get the object currently being played on the user's Spotify account.
   * @scope `user-read-currently-playing`
   */
  public getCurrentlyPlayedTrack(opts: GetPlaybackStateOptions = {}): Promise<PlaybackState> {
    return this.$fetch<PlaybackState>('/me/player/currently-playing', {
      query: {
        ...opts,
        additional_types: opts.additional_types?.join(','),
      },
    })
  }

  /**
   *  Start a new context or resume current playback on the user's active device.
   * @scope `user-modify-playback-state`
   */
  public async startPlayback(deviceId?: string, opts: SetPlaybackStateOptions = {}): Promise<void> {
    await this.$fetch<void>('/me/player/play', {
      method: 'PUT',
      query: {
        device_id: deviceId,
      },
      body: opts,
    })
  }

  /**
   * Pause playback on the user's account.
   * @scope `user-modify-playback-state`
   */
  public async pausePlayback(deviceId?: string): Promise<void> {
    await this.$fetch<void>('/me/player/pause', {
      method: 'PUT',
      query: {
        device_id: deviceId,
      },
    })
  }

  /**
   * Skips to next track in the user’s queue.
   * @scope `user-modify-playback-state`
   */
  public async skipToNext(deviceId?: string): Promise<void> {
    await this.$fetch<void>('/me/player/next', {
      method: 'POST',
      query: {
        device_id: deviceId,
      },
    })
  }

  /**
   * Skips to previous track in the user’s queue.
   * @scope `user-modify-playback-state`
   */
  public async skipToPrevious(deviceId?: string): Promise<void> {
    await this.$fetch<void>('/me/player/previous', {
      method: 'POST',
      query: {
        device_id: deviceId,
      },
    })
  }

  /**
   * Seeks to the given position in the user’s currently playing track.
   * @param positionMs The position in milliseconds to seek to. Must be a positive number.
   * Passing in a position that is greater than the length of the track will cause the player
   * to start playing the next song.
   * @scope `user-modify-playback-state`
   */
  public async seekToPosition(positionMs: number, deviceId?: string): Promise<void> {
    await this.$fetch<void>('/me/player/seek', {
      method: 'PUT',
      query: {
        device_id: deviceId,
        position_ms: positionMs,
      },
    })
  }

  /**
   * Set the repeat mode for the user's playback. Options are repeat-track, repeat-context, and off.
   * @param state track, context or off.
   * - `track` will repeat the current track.
   * - `context` will repeat the current context.
   * - `off` will turn repeat off.
   * @scope `user-modify-playback-state`
   */
  public async setRepeatMode(state: PlaybackState['repeat_state'], deviceId?: string): Promise<void> {
    await this.$fetch<void>('/me/player/repeat', {
      method: 'PUT',
      query: {
        device_id: deviceId,
        state,
      },
    })
  }

  /**
   * Set the volume for the user’s current playback device.
   * @param volumePercent The volume to set.
   * @min 0
   * @max 100
   * @scope `user-modify-playback-state`
   */
  public setPlaybackVolume(volumePercent: number, deviceId?: string): Promise<void> {
    return this.$fetch<void>('/me/player/volume', {
      method: 'PUT',
      query: {
        device_id: deviceId,
        volume_percent: volumePercent,
      },
    })
  }

  /**
   * Toggle shuffle on or off for user’s playback.
   * @param state Shuffle state
   * - `true` : Shuffle user's playback.
   * - `false` : Do not shuffle user's playback.
   * @scope `user-modify-playback-state`
   */
  public async toggleShuffle(state: boolean, deviceId?: string): Promise<void> {
    await this.$fetch<void>('/me/player/shuffle', {
      method: 'PUT',
      query: {
        device_id: deviceId,
        state,
      },
    })
  }

  /**
   * Get tracks from the current user's recently played tracks.
   * **Note:** Currently doesn't support podcast episodes.
   * @scope `user-read-recently-played`
   */
  public getRecentlyPlayedTracks(opts: getRecentlyPlayedTracksOptions = {}): Promise<CursorResults<PlayHistoryObject>> {
    return this.$fetch<CursorResults<PlayHistoryObject>>('/me/player/recently-played', {
      query: opts,
    })
  }

  /**
   * Get the list of objects that make up the user's queue.
   * @scope `user-read-playback-state`
   */
  public getUserQueue(): Promise<UserQueueResponse> {
    return this.$fetch<UserQueueResponse>('/me/player/queue')
  }

  /**
   * Add an item to the end of the user's current playback queue.
   * @param uri The uri of the item to add to the queue. Must be a track or an episode uri.
   * @scope `user-modify-playback-state`
   */
  public async addItemToQueue(uri: string, deviceId?: string): Promise<void> {
    await this.$fetch<void>('/me/player/queue', {
      method: 'POST',
      query: {
        uri,
        device_id: deviceId,
      },
    })
  }
}
