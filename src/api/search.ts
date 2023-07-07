import type { SearchOptions, SearchResult, SearchType } from '../types/search'
import { ApiPart } from './api.part'

export class SearchApi extends ApiPart {
  /**
   * Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks that match a keyword string.
   *
   * **Note**: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.
   * @param types A list of item types to search across.
   * @param query Your search query.
   * You can narrow down your search using field filters. The available filters are `album`, `artist`,
   * `track`, `year`, `upc`, `tag:hipster`, `tag:new`, `isrc`, and `genre`. Each field filter only
   * applies to certain result types.
   * @param opts
   */
  public search<const T extends readonly SearchType[]>(
    types: T,
    query: string, opts: SearchOptions = {},
  ): Promise<SearchResult<T>> {
    return this.$fetch<SearchResult<T>>('/search', {
      query: {
        type: types.join(','),
        q: query,
        ...opts,
      },
    })
  }
}
