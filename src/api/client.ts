import type { $Fetch } from 'ofetch'
import { Headers, ofetch } from 'ofetch'
import { UsersApi } from './users'

export class SpotifyClient {
  private token: null | string = null
  protected $fetch: $Fetch

  public constructor() {
    this.$fetch = ofetch.create({
      baseURL: 'https://api.spotify.com/v1',
      onRequest: ({ options }) => {
        if (this.token === null)
          throw new Error('No token set')

        options.headers = new Headers(options.headers ?? {})
        options.headers.set('Authorization', `Bearer ${this.token}`)
      },
    })

    this.users = new UsersApi(this.$fetch)
  }

  public setAccessToken(token: string): this {
    this.token = token

    return this
  }

  public users: UsersApi
}