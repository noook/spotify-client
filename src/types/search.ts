import type { SimplifiedAlbumObject } from './album'
import type { ArtistObject } from './artist'
import type { Market, PaginatedResults } from './common'
import { ResourceType } from './common'
import type { TrackObject } from './track'

export enum SearchType {
  Album = ResourceType.Album,
  Artist = ResourceType.Artist,
  Playlist = ResourceType.Playlist,
  Track = ResourceType.Track,
  Show = ResourceType.Show,
  Episode = ResourceType.Episode,
  Audiobook = ResourceType.Audiobook,
}

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
  [SearchType.Album]: ResourceType.Albums
  [SearchType.Artist]: ResourceType.Artists
  [SearchType.Track]: ResourceType.Tracks
  [SearchType.Playlist]: ResourceType.Playlists
  [SearchType.Show]: ResourceType.Shows
  [SearchType.Episode]: ResourceType.Episodes
  [SearchType.Audiobook]: ResourceType.Audiobooks
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
