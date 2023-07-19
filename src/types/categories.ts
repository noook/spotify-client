import type { ImageObject, PaginatedResults, PaginationQueryOptions } from './common'

export interface GetCategoriesOptions extends PaginationQueryOptions {
  /**
   * A country: an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.
   * Provide this parameter if you want the list of returned items to be relevant to a particular country.
   * If omitted, the returned items will be relevant to all countries.
   */
  country?: string

  /**
   * The desired language, consisting of a lowercase [ISO 639-1 ](https://en.wikipedia.org/wiki/ISO_639-1) language code
   * and an uppercase [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code, joined by an underscore.
   * For example: `es_MX`, meaning "Spanish (Mexico)".
   *
   * Provide this parameter if you want the results returned in a particular language (where available).
   *
   * **Note:** if locale is not supplied, or if the specified language is not available, all strings will be returned in
   * the Spotify default language (American English).
   *
   * The locale parameter, combined with the country parameter, may give odd results if not carefully matched.For example country=SE&locale=de_DE will return a list of categories relevant to Sweden but as German language strings.
   */
  locale?: string
}

export interface CategoryItem {
  /**
   * A link to the Web API endpoint returning full details of the category.
   */
  href: string

  /**
   * The category icon, in various sizes.
   */
  icons: ImageObject[]

  /**
   * The Spotify [category ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids) of the category.
   */
  id: string

  /**
   * The name of the category.
   */
  name: string
}

export interface GetCategoriesResults {
  categories: PaginatedResults<CategoryItem>
}
