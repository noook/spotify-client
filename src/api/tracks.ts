import type { AudioFeaturesObject, DetailedTrackObject, GetRecommandationsResults, GetSeveralTracksOptions, GetTrackOptions, GetTracksAudioFeaturesResponse, SavedTrackObject, TrackAnalysisObject } from '../types'
import { ApiPart } from './api.part'

export class TracksApi extends ApiPart {
  /**
   * Get Spotify catalog information for a single track identified by its unique Spotify ID.
   */
  public getTrack(id: string, options: GetTrackOptions = {}): Promise<DetailedTrackObject> {
    return this.$fetch<DetailedTrackObject>(`/tracks/${id}`, {
      query: options,
    })
  }

  /**
   * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the tracks.
   * @max `50` IDs.
   */
  public getTracks(ids: string[], options: GetTrackOptions = {}): Promise<DetailedTrackObject[]> {
    return this.$fetch<DetailedTrackObject[]>('/tracks', {
      query: {
        ids: ids.join(','),
        ...options,
      },
    })
  }

  /**
   * Get a list of the songs saved in the current Spotify user's 'Your Music' library.
   * @scope `user-library-read`
   */
  public getUserSavedTracks(id: string, opts: GetSeveralTracksOptions = {}): Promise<SavedTrackObject[]> {
    return this.$fetch<SavedTrackObject[]>('/me/tracks', {
      query: opts,
    })
  }

  /**
   * Save one or more tracks to the current user's 'Your Music' library.
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the tracks.
   * @max `20` IDs.
   * @scope `user-library-modify`
   */
  public async saveTracks(ids: string[]): Promise<void> {
    await this.$fetch<void>('/me/tracks', {
      method: 'PUT',
      query: {
        ids: ids.join(','),
      },
    })
  }

  /**
   * Remove one or more tracks from the current user's 'Your Music' library.
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the tracks.
   * @max `20` IDs.
   * @scope `user-library-modify`
   */
  public async removeSavedTracks(ids: string[]): Promise<void> {
    await this.$fetch<void>('/me/tracks', {
      method: 'DELETE',
      query: {
        ids: ids.join(','),
      },
    })
  }

  /**
   * Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the tracks.
   * @max `20` IDs.
   * @returns An array with `true` if the track is in the library, `false` otherwise.
   * @scope `user-library-read`
   */
  public checkUserSavedTracks(ids: string[]): Promise<boolean[]> {
    return this.$fetch<boolean[]>('/me/tracks/contains', {
      query: {
        ids: ids.join(','),
      },
    })
  }

  /**
   * Get audio features for multiple tracks based on their Spotify IDs.
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the tracks.
   */
  public getTracksAudioFeatures(ids: string[]): Promise<GetTracksAudioFeaturesResponse> {
    return this.$fetch<GetTracksAudioFeaturesResponse>('/audio-features', {
      query: {
        ids: ids.join(','),
      },
    })
  }

  /**
   * Get audio feature information for a single track identified by its unique Spotify ID.
   * @param id The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  public getTrackAudioFeatures(id: string): Promise<AudioFeaturesObject> {
    return this.$fetch<AudioFeaturesObject>(`/audio-features/${id}`)
  }

  /**
   * Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.
   * @param id The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  public getTrackAudioAnalysis(id: string): Promise<TrackAnalysisObject> {
    return this.$fetch<TrackAnalysisObject>(`/audio-analysis/${id}`)
  }

  /**
   * Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks.
   * If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.
   *
   * For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.
   */
  public getRecommendations(): Promise<GetRecommandationsResults> {
    return this.$fetch<GetRecommandationsResults>('/recommendations')
  }
}
