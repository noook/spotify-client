import type { CategoryItem, GetCategoriesOptions, GetCategoriesResults } from '../types'
import { ApiPart } from './api.part'

export class CategoriesApi extends ApiPart {
  public async getCategories(opts: GetCategoriesOptions = {}): Promise<GetCategoriesResults> {
    return this.$fetch<GetCategoriesResults>('/browse/categories', {
      query: opts,
    })
  }

  public async getCategory(id: string, opts: Pick<GetCategoriesOptions, 'country' | 'locale'> = {}): Promise<CategoryItem> {
    return this.$fetch<CategoryItem>(`/browse/categories/${id}`, {
      query: opts,
    })
  }
}
