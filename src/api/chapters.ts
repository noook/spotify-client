import type { ChapterObject, GetChapterOptions, GetChaptersResponse } from '../types'
import { ApiPart } from './api.part'

export class ChaptersApi extends ApiPart {
  /**
   * Get Spotify catalog information for a single chapter.
   *
   * **Note:** Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.
   *
   * @param id The [Spotify ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) for the chapter.
   */
  public getChapter(id: string, opts: GetChapterOptions = {}): Promise<ChapterObject> {
    return this.$fetch<ChapterObject>(`/chapters/${id}`, {
      query: opts,
    })
  }

  /**
   * Get Spotify catalog information for several chapters identified by their Spotify IDs.
   * @param ids A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids).
   */
  public getChapters(ids: string[], opts: GetChapterOptions = {}): Promise<GetChaptersResponse> {
    return this.$fetch<GetChaptersResponse>('/chapters', {
      query: {
        ids: ids.join(','),
        ...opts,
      },
    })
  }
}
