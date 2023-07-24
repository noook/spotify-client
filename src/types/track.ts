import type { SimplifiedAlbumObject } from './album'
import type { ArtistObject } from './artist'
import type { ExternalUrlObject, Market, PaginationQueryOptions } from './common'

export interface TrackObject {
  /**
   * The artists who performed the track. Each artist object includes a link in href to more
   * detailed information about the artist.
   */
  artists: ArtistObject[]

  /**
   * A list of the countries in which the track can be played, identified by their
   * [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
   */
  available_markets: string[]

  /**
   * The disc number (usually 1 unless the album consists of more than one disc).
   */
  disc_number: number

  /**
   * The track length in milliseconds.
   */
  duration_ms: number

  /**
   * Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown).
   */
  explicit: boolean

  /**
   * Known external IDs for the track.
   */
  external_ids: {
    /**
     * [International Standard Recording Code](https://en.wikipedia.org/wiki/International_Standard_Recording_Code)
     */
    isrc: string
    /**
     * [International Article Number](https://en.wikipedia.org/wiki/International_Article_Number)
     */
    ean: string
    /**
     * [Universal Product Code](https://en.wikipedia.org/wiki/Universal_Product_Code)
     */
    upc: string
  }

  /**
   * Known external URLs for this track.
   */
  external_urls: ExternalUrlObject

  /**
   * A link to the Web API endpoint providing full details of the track.
   */
  href: string

  /**
   * The [Spotify user ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the track.
   */
  id: string

  /**
   * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/web-api/concepts/track-relinking)
   * is applied. If true, the track is playable in the given market. Otherwise false.
   */
  is_playable: boolean

  /**
   * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/web-api/concepts/track-relinking)
   * is applied, and the requested track has been replaced with different track. The track in the `linked_from` object contains
   * information about the originally requested track.
   * @todo complete type
   */
  linked_from: any

  /**
   * Included in the response when a content restriction is applied.
   */
  restrictions: {
    /**
     * The reason for the restriction. Supported values:
     * - `market` - The content item is not available in the given market.
     * - `product` - The content item is not available for the user's subscription type.
     * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
     *
     * Additional reasons may be added in the future.
     *
     * **Note**: If you use this field, make sure that your application safely handles unknown values.
     */
    reason: 'market' | 'product' | 'explicit'
  }

  /**
   * The name of the track.
   */
  name: string

  /**
   * The popularity of the track. The value will be between `0` and `100`, with `100` being the most popular.
   *
   * The popularity of a track is a value between `0` and `100`, with `100` being the most popular. The popularity
   * is calculated by algorithm and is based, in the most part, on the total number of plays the track has
   * had and how recent those plays are.
   *
   * Generally speaking, songs that are being played a lot now will have a higher popularity than songs that
   * were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are
   * rated independently. Artist and album popularity is derived mathematically from track popularity.
   *
   * **Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time.
   */
  popularity: number

  /**
   * A link to a 30 second preview (MP3 format) of the track.
   */
  preview_url: string | null

  /**
   * The number of the track. If an album has several discs, the track number is the number on the specified disc.
   */
  track_number: number

  /**
   * The object type.
   */
  type: 'track'

  /**
   * /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the track.
   */
  uri: string

  /**
   * Whether or not the track is from a local file.
   */
  is_local: boolean
}

export interface SavedTrackObject {
  /**
   * The date and time the track was saved. Timestamps are returned in ISO 8601
   * format as Coordinated Universal Time (UTC) with a zero offset: `YYYY-MM-DDTHH:MM:SSZ`.
   * If the time is imprecise (for example, the date/time of an album release),
   * an additional field indicates the precision; see for example, `release_date` in an album object.
   */
  added_at: string

  /**
   * Information about the track.
   */
  track: DetailedTrackObject
}

export interface GetTrackOptions {
  /**
   * An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
   * only content that is available in that market will be returned.
   */
  market?: Market
}

export interface GetSeveralTracksOptions extends GetTrackOptions, PaginationQueryOptions {}

export type DetailedTrackObject = TrackObject & {
  album: SimplifiedAlbumObject
}

export type SimplifiedTrackObject = Omit<TrackObject, 'external_ids' | 'popularity'>

export interface AudioFeaturesObject {
  /**
   * A confidence measure from `0.0` to `1.0` of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
   * Range `0.0` - `1.0`
   * @example `0.00242`
   */
  acousticness: number

  /**
   * A URL to access the full audio analysis of this track. An access token is required to access this data.
   */
  analysis_url: string

  /**
   * Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability,
   * beat strength, and overall regularity.
   * A value of `0.0` is least danceable and `1.0` is most danceable.
   */
  danceability: number

  /**
   * The duration of the track in milliseconds.
   */
  duration_ms: number

  /**
   * Energy is a measure from `0.0` to `1.0` and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.
   * For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute
   * include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
   */
  energy: number

  /**
   * The Spotify ID for the track.
   */
  id: string

  /**
   * Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context.
   * Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to `1.0`, the greater likelihood the track contains no vocal content.
   * Values above `0.5` are intended to represent instrumental tracks, but confidence is higher as the value approaches `1.0`.
   */
  instrumentalness: number

  /**
   * The key the track is in. Integers map to pitches using standard Pitch Class notation.
   * ```
   * 0 = C
   * 1 = C♯/D♭
   * 2 = D
   * ```
   * ... and so on.
   *
   * If no key was detected, the value is `-1`.
   * @range: `-1`-`11`
   */
  key: number

  /**
   * Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live.
   * A value above `0.8` provides strong likelihood that the track is live.
   */
  liveness: number

  /**
   * The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks.
   * Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between `-60` and `0` db.
   */
  loudness: number

  /**
   * Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by `1` and minor is `0`.
   */
  mode: number

  /**
   * Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry),
   * the closer to `1.0` the attribute value. Values above `0.66` describe tracks that are probably made entirely of spoken words.
   * Values between `0.33` and `0.66` describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music.
   * Values below `0.33` most likely represent music and other non-speech-like tracks.
   */
  speechiness: number

  /**
   * The overall estimated tempo of a track in beats per minute (BPM). In musical terminology,
   * tempo is the speed or pace of a given piece and derives directly from the average beat duration.
   */
  tempo: number

  /**
   * An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).
   * The time signature ranges from `3` to `7` indicating time signatures of `"3/4"`, to `"7/4"`.
   */
  time_signature: number

  /**
   * A link to the Web API endpoint providing full details of the track.
   */
  track_href: string

  /**
   * The object type.
   */
  type: 'audio_features'

  /**
   * The Spotify URI for the track.
   */
  uri: string

  /**
   * A measure from `0.0` to `1.0` describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric),
   * while tracks with low valence sound more negative (e.g. sad, depressed, angry).
   */
  valence: number
}

export interface GetTracksAudioFeaturesResponse {
  audio_features: AudioFeaturesObject[]
}

export interface TrackAnalysisMeta {
  /**
   * The version of the Analyzer used to analyze this track.
   */
  analyzer_version: string

  /**
   * The platform used to read the track's audio data.
   */
  platform: string

  /**
   * A detailed status code for this track. If analysis data is missing, this code may explain why.
   */
  detailed_status: string

  /**
   * The return code of the analyzer process. `0` if successful, `1` if any errors occurred.
   */
  status_code: number

  /**
   * The Unix timestamp (in seconds) at which this track was analyzed.
   */
  timestamp: number

  /**
   * The amount of time taken to analyze this track.
   */
  analysis_time: number

  /**
   * The method used to read the track's audio data.
   * @example "libvorbisfile L+R 44100->22050"
   */
  input_process: string
}

export interface AudioAnalysisTrack {
  /**
   * The exact number of audio samples analyzed from this track. See also `analysis_sample_rate`.
   */
  num_samples: number

  /**
   * Length of the track in seconds.
   */
  duration: number

  /**
   * This field will always contain the empty string.
   */
  sample_md5: string

  /**
   * An offset to the start of the region of the track that was analyzed. (As the entire track is analyzed, this should always be `0`.)
   */
  offset_seconds: number

  /**
   * The length of the region of the track was analyzed, if a subset of the track was analyzed. (As the entire track is analyzed, this should always be `0`.)
   */
  window_seconds: number

  /**
   * The sample rate used to decode and analyze this track. May differ from the actual sample rate of this track available on Spotify.
   */
  analysis_sample_rate: number

  /**
   * The number of channels used for analysis. If `1`, all channels are summed together to mono before analysis.
   */
  analysis_channels: number

  /**
   * The time, in seconds, at which the track's fade-in period ends. If the track has no fade-in, this will be `0.0`.
   */
  end_of_fade_in: number

  /**
   * The time, in seconds, at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length.
   */
  start_of_fade_out: number

  /**
   * The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful
   * for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological
   * correlate of physical strength (amplitude). Values typically range between `-60` and `0` db.
   */
  loudness: number

  /**
   * The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or
   * pace of a given piece and derives directly from the average beat duration.
   */
  tempo: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the tempo.
   */
  tempo_confidence: number

  /**
   * An estimated time signature. The time signature (meter) is a notational convention to specify how many
   * beats are in each bar (or measure). The time signature ranges from `3` to `7` indicating time signatures of `"3/4"`, to `"7/4"`.
   */
  time_signature: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the time_signature.
   */
  time_signature_confidence: number

  /**
   * The key the track is in. Integers map to pitches using standard Pitch Class notation.
   * ```
   * 0 = C
   * 1 = C♯/D♭
   * 2 = D
   * ```
   * ... and so on.
   *
   * If no key was detected, the value is `-1`.
   * @range: `-1`-`11`
   */
  key: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the key.
   */
  key_confidence: number

  /**
   * Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by `1` and minor is `0`.
   */
  mode: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the mode.
   */
  mode_confidence: number

  /**
   * An [Echo Nest Musical Fingerprint (ENMFP)](https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4) codestring for this track.
   */
  codestring: string

  /**
   * A version number for the Echo Nest Musical Fingerprint format used in the codestring field.
   */
  code_version: number

  /**
   * An [EchoPrint](https://github.com/spotify/echoprint-codegen) codestring for this track.
   */
  echoprintstring: string

  /**
   * A version number for the EchoPrint format used in the echoprintstring field.
   */
  echoprint_version: number

  /**
   * A [Synchstring](https://github.com/echonest/synchdata) for this track.
   */
  synchstring: string

  /**
   * A version number for the Synchstring used in the synchstring field.
   */
  synch_version: number

  /**
   * A Rhythmstring for this track. The format of this string is similar to the Synchstring.
   */
  rythmstring: string

  /**
   * A version number for the Rhythmstring used in the rhythmstring field.
   */
  rythm_version: number
}

export interface TrackAnalysisBar {
  /**
   * The starting point (in seconds) of the time interval.
   */
  start: number

  /**
   * The starting point (in seconds) of the time interval.
   */
  duration: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the interval.
   */
  confidence: number
}

export interface TrackAnalysisBeat {
  /**
   * The starting point (in seconds) of the time interval.
   */
  start: number

  /**
   * The starting point (in seconds) of the time interval.
   */
  duration: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the interval.
   */
  confidence: number
}

export interface TrackAnalysisSection {
  /**
   * The starting point (in seconds) of the time interval.
   */
  start: number

  /**
   * The starting point (in seconds) of the time interval.
   */
  duration: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the interval.
   */
  confidence: number

  /**
   * The overall loudness of the section in decibels (dB). Loudness values are useful for comparing relative loudness of sections within tracks.
   */
  loudness: number

  /**
   * The overall estimated tempo of the section in beats per minute (BPM). In musical terminology, tempo is the speed or
   * pace of a given piece and derives directly from the average beat duration.
   */
  tempo: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo
   * (like pure speech) which would correspond to a low value in this field.
   */
  tempo_confidence: number

  /**
   * The key the track is in. Integers map to pitches using standard Pitch Class notation.
   * ```
   * 0 = C
   * 1 = C♯/D♭
   * 2 = D
   * ```
   * ... and so on.
   *
   * If no key was detected, the value is `-1`.
   * @range: `-1`-`11`
   */
  key: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the key. Songs with many key changes may correspond to low values in this field.
   */
  key_confidence: number

  /**
   * Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived.
   * This field will contain a `0` for "minor", a `1` for "major", or a `-1` for no result. Note that the major key (e.g. C major) could
   * more likely be confused with the minor key at `3` semitones lower (e.g. A minor) as both keys carry the same pitches.
   */
  mode: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the mode.
   */
  mode_confidence: number

  /**
   * An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).
   * The time signature ranges from `3` to `7` indicating time signatures of `"3/4"`, to `"7/4"`.
   */
  time_signature: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the time_signature. Sections with time signature changes may correspond to low values in this field.
   */
  time_signature_confidence: number
}

export interface TrackAnalysisSegment {
  /**
   * The starting point (in seconds) of the time interval.
   */
  start: number

  /**
   * The starting point (in seconds) of the time interval.
   */
  duration: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the interval.
   */
  confidence: number

  /**
   * The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.
   */
  loudness_start: number

  /**
   * The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.
   */
  loudness_max: number

  /**
   * The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.
   */
  loudness_max_time: number

  /**
   * The offset loudness of the segment in decibels (dB). This value should be equivalent to the `loudness_start` of the following segment.
   */
  loudness_end: number

  /**
   * Pitch content is given by a “chroma” vector, corresponding to the `12` pitch classes `C`, `C#`, `D` to `B`, with values ranging from `0` to `1` that describe the relative
   * dominance of every pitch in the chromatic scale. For example a `C Major` chord would likely be represented by large values of `C`, `E` and `G` (i.e. classes `0`, `4`, and `7`).
   *
   * Vectors are normalized to `1` by their strongest dimension, therefore noisy sounds are likely represented by values that are all close to `1`,
   * while pure tones are described by one value at `1` (the pitch) and others near `0`. As can be seen below, the `12` vector indices are a combination of low-power
   * spectrum values at their respective pitch frequencies.
   * @see [Schema of pitch vector](https://developer.spotify.com/assets/audio/Pitch_vector.png)
   *
   * @range `0`-`1`
   */
  pitches: number[]

  /**
   * Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color,
   * texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes `12`
   * unbounded values roughly centered around `0`. Those values are high level abstractions of the spectral surface, ordered by degree of importance.
   *
   * For completeness however, the first dimension represents the average loudness of the segment; second emphasizes brightness; third is more closely correlated to
   * the flatness of a sound; fourth to sounds with a stronger attack; etc. See an image below representing the `12` basis functions (i.e. template segments). timbre basis functions
   *
   * @see [Timbre basic functions](https://developer.spotify.com/assets/audio/Timbre_basis_functions.png)
   *
   * The actual timbre of the segment is best described as a linear combination of these `12` basis functions weighted by the coefficient values
   * `timbre = c1 x b1 + c2 x b2 + ... + c12 x b12`, where `c1` to `c12` represent the `12` coefficients and `b1` to `b12` the `12` basis functions as displayed below.
   * Timbre vectors are best used in comparison with each other.
   */
  timbre: number[]
}

export interface TrackAnalysisTatum {
  /**
   * The starting point (in seconds) of the time interval.
   */
  start: number

  /**
   * The starting point (in seconds) of the time interval.
   */
  duration: number

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the interval.
   */
  confidence: number
}

export interface TrackAnalysisObject {
  meta: TrackAnalysisMeta

  track: AudioAnalysisTrack

  /**
   * The confidence, from 0.0 to 1.0, of the reliability of the interval.
   */
  bars: TrackAnalysisBar[]

  /**
   * The confidence, from `0.0` to `1.0`, of the reliability of the interval.
   */
  beats: TrackAnalysisBeat[]

  /**
   * Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc.
   * Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness.
   */
  sections: TrackAnalysisSection[]

  /**
   * Each segment contains a roughly conisistent sound throughout its duration.
   */
  segments: TrackAnalysisSegment[]

  /**
   * A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments).
   */
  tatums: TrackAnalysisTatum[]
}

export interface GetRecommandationsOptions {
  /**
   * The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied,
   * it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response.
   * @default 20
   * @min `1`
   * @max `100`
   */
  limit?: number
  /**
   * An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
   * only content that is available in that market will be returned.
   */
  market?: Market

  /**
   * A comma separated list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for seed artists.
   * Up to `5` seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.
   *
   * **Note:** only required if `seed_genres` and `seed_tracks` are not set.
   */
  seed_artists?: string[]

  /**
   * A comma separated list of any genres in the set of [available genre seeds](https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres).
   * Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.
   *
   * **Note**: only required if `seed_artists` and `seed_tracks` are not set.
   */
  seed_genres?: string[]

  /**
   * A comma separated list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for a seed track. Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.
   *
   * **Note:** only required if `seed_artists` and `seed_genres` are not set.
   */
  seed_tracks?: string[]

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options.
   *
   * For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than `140` beats per minute.
   */
  min_acousticness?: number

  /**
   * For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options.
   *
   * For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
   */
  max_acousticness?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
   */
  target_acousticness?: number

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options.
   *
   * For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
   */
  min_danceability?: number

  /**
   * For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options.
   *
   * For example,`max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
   */
  max_danceability?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
   */
  target_danceability?: number

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options.
   *
   * For example, `min_duration_ms=180000` would restrict results to only those tracks with a duration greater than `3` minutes.
   */
  min_duration_ms?: number

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options.
   *
   * For example, `max_duration_ms=180000` would restrict results to only those tracks with a duration lower than `3` minutes.
   */
  max_duration_ms?: number

  /**
   * Target duration of the track (ms)
   */
  target_duration_ms?: number

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options.
   *
   * For example, `min_energy=0.4` would filter out most tracks that have low energy.
   */
  min_energy?: number

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options.
   *
   * For example, `max_energy=0.4` would filter out most tracks that have high energy.
   */
  max_energy?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
   */
  target_energy?: number

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options.
   *
   * For example, `min_instrumentalness=0.35` would filter out most tracks that are unlikely to be instrumental.
   */
  min_instrumetalness?: number

  /**
   * For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options.
   *
   * For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
   */
  max_instrumetalness?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
   */
  target_instrumentalness?: number

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options.
   *
   * For example, `min_key=0` and `max_key=8` would filter out tracks that are not in the keys of `C`, `C#`, `D`, `D#`, `E`, `F`, `F#`, and `G`.
   */
  min_key?: number

  /**
   * For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options.
   *
   * For example, `min_key=0` and `max_key=8` would filter out tracks that are not in the keys of `C`, `C#`, `D`, `D#`, `E`, `F`, `F#`, and `G`.
   */
  max_key?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_key=4` and `target_mode=0`. All target values will be weighed equally in ranking results.
   */
  target_key?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_liveness=0.4` and `max_liveness=0.8`. All target values will be weighed equally in ranking results.
   */
  min_liveness?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_liveness=0.4` and `max_liveness=0.8`. All target values will be weighed equally in ranking results.
   */
  max_liveness?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_liveness=0.65` and `target_loudness=0.8`. All target values will be weighed equally in ranking results.
   */
  target_liveness?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_loudness=0.4` and `max_loudness=0.8`. All target values will be weighed equally in ranking results.
   */
  min_loudness?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_loudness=0.4` and `max_loudness=0.8`. All target values will be weighed equally in ranking results.
   */
  max_loudness?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_loudness=0.65` and `target_loudness=0.8`. All target values will be weighed equally in ranking results.
   */
  target_loudness?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_mode=0.4` and `max_mode=0.8`. All target values will be weighed equally in ranking results.
   */
  min_mode?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_mode=0.4` and `max_mode=0.8`. All target values will be weighed equally in ranking results.
   */
  max_mode?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_mode=0.65` and `target_mode=0.8`. All target values will be weighed equally in ranking results.
   */
  target_mode?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_popularity=0.4` and `max_popularity=0.8`. All target values will be weighed equally in ranking results.
   */
  min_popularity?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_popularity=0.4` and `max_popularity=0.8`. All target values will be weighed equally in ranking results.
   */
  max_popularity?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_popularity=0.65` and `target_popularity=0.8`. All target values will be weighed equally in ranking results.
   */
  target_popularity?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_speechiness=0.4` and `max_speechiness=0.8`. All target values will be weighed equally in ranking results.
   */
  min_speechiness?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_speechiness=0.4` and `max_speechiness=0.8`. All target values will be weighed equally in ranking results.
   */
  max_speechiness?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_speechiness=0.65` and `target_speechiness=0.8`. All target values will be weighed equally in ranking results.
   */
  target_speechiness?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_tempo=0.4` and `max_tempo=0.8`. All target values will be weighed equally in ranking results.
   */
  min_tempo?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_tempo=0.4` and `max_tempo=0.8`. All target values will be weighed equally in ranking results.
   */
  max_tempo?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_tempo=0.65` and `target_tempo=0.8`. All target values will be weighed equally in ranking results.
   */
  target_tempo?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_time_signature=0.4` and `max_time_signature=0.8`. All target values will be weighed equally in ranking results.
   */
  min_time_signature?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_time_signature=0.4` and `max_time_signature=0.8`. All target values will be weighed equally in ranking results.
   */
  max_time_signature?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_time_signature=0.65` and `target_time_signature=0.8`. All target values will be weighed equally in ranking results.
   */
  target_time_signature?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_valence=0.4` and `max_valence=0.8`. All target values will be weighed equally in ranking results.
   */
  min_valence?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `min_valence=0.4` and `max_valence=0.8`. All target values will be weighed equally in ranking results.
   */
  max_valence?: number

  /**
   * For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred.
   *
   * For example, you might request `target_valence=0.65` and `target_valence=0.8`. All target values will be weighed equally in ranking results.
   */
  target_valence?: number
}

export interface RecommandationSeedObject {
  /**
   * The number of tracks available after `min_*` and `max_*` filters have been applied.
   */
  afterFilteringSize: number

  /**
   * The number of tracks available after relinking for regional availability.
   */
  afterRelinkingSize: number

  /**
   * A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object.
   * For artists a link to an Artist Object. For genre seeds, this value will be `null`.
   */
  href: string | null

  /**
   * The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter.
   */
  id: string

  /**
   * The number of recommended tracks available for this seed.
   */
  initialPoolSize: number

  /**
   * The entity type of this seed. One of artist, track or genre.
   */
  type: 'artist' | 'track' | 'genre'
}

export interface GetRecommandationsResults {
  /**
   * An array of recommendation seed objects.
   */
  seeds: RecommandationSeedObject[]

  /**
   * An array of track object (simplified) ordered according to the parameters supplied.
   */
  tracks: DetailedTrackObject[]
}
