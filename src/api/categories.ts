import type { CategoryItem, GetCategoriesOptions, GetCategoriesResults } from '../types'
import { ApiPart } from './api.part'

export class CategoriesApi extends ApiPart {
  /**
   * Get a list of categories used to tag items in Spotify
   * (on, for example, the Spotify player’s “Browse” tab).
   */
  public async getCategories(opts: GetCategoriesOptions = {}): Promise<GetCategoriesResults> {
    return this.$fetch<GetCategoriesResults>('/browse/categories', {
      query: opts,
    })
  }

  /**
   * Get a single category used to tag items in Spotify
   * (on, for example, the Spotify player’s “Browse” tab).
   */
  public async getCategory(id: string, opts: Pick<GetCategoriesOptions, 'country' | 'locale'> = {}): Promise<CategoryItem> {
    return this.$fetch<CategoryItem>(`/browse/categories/${id}`, {
      query: opts,
    })
  }
}
