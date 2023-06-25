import type { SimplifiedAlbumObject } from './album'
import type { ArtistObject } from './artist'
import type { Market, PaginatedResults, ResourceType } from './common'
import type { TrackObject } from './track'

export type SearchType =
  | ResourceType.Album
  | ResourceType.Artist
  | ResourceType.Playlist
  | ResourceType.Track
  | ResourceType.Show
  | ResourceType.Episode
  | ResourceType.Audiobook

export interface SearchOptions {
  /**
   * If include_external=audio is specified it signals that the client can play externally hosted audio content,
   * and marks the content as playable in the response.
   * By default externally hosted audio content is marked as unplayable in the response.
   */
  include_external?: 'audio'

  /**
   * An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified,
   * only content that is available in that market will be returned.
   */
  market?: Market

  /**
   * The maximum number of items to return.
   * @default `20`
   * @min `1`
   * @max `50`
   */
  limit?: number

  /**
   * The index of the first item to return. Use with limit to get the next set of items.
   * @default `0` (the first item).
   */
  offset?: number
}

interface ResourceTypeToResultKey {
  [ResourceType.Album]: ResourceType.Albums
  [ResourceType.Artist]: ResourceType.Artists
  [ResourceType.Track]: ResourceType.Tracks
  [ResourceType.Playlist]: ResourceType.Playlists
  [ResourceType.Show]: ResourceType.Shows
  [ResourceType.Episode]: ResourceType.Episodes
  [ResourceType.Audiobook]: ResourceType.Audiobooks
}

interface SearchResultsMap {
  [ResourceType.Album]: SimplifiedAlbumObject
  [ResourceType.Artist]: ArtistObject
  [ResourceType.Track]: TrackObject
}

export type PartialSearchResult = {
  [K in SearchType as ResourceTypeToResultKey[K]]?: PaginatedResults<K extends keyof SearchResultsMap ? SearchResultsMap[K] : any>
}

/**
 * Makes all properties in SearchResults optional, unless the type T is a tuple (literal array / tuple) of SearchTypes.
 */
export type SearchResult<T extends readonly SearchType[]> = Pick<PartialSearchResult, ResourceTypeToResultKey[T[number]]> extends infer R
  ? number extends T['length']
    ? R
    : Required<R>
  : never
