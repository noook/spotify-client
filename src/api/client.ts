import type { $Fetch } from 'ofetch'
import { $fetch, Headers, ofetch } from 'ofetch'
import type { ClientOptions, GetAccessTokenPayload, GetRefreshTokenPayload, TokenResponse } from '../types'
import { AlbumsApi, ArtistsApi, AudiobooksApi, CategoriesApi, ChaptersApi, EpisodesApi, GenresApi, MarketsApi, PlayerApi, PlaylistsApi, SearchApi, ShowsApi, UsersApi } from '.'

export class SpotifyClient {
  private token: null | string = null
  private tokenExpiresAt: null | Date = null
  private _refreshToken: null | string = null
  protected $fetch: $Fetch

  public constructor() {
    this.$fetch = ofetch.create({
      baseURL: 'https://api.spotify.com/v1',
      onRequest: ({ options }) => {
        if (this.token === null) {
          throw new Error('No token set')
        }

        if (this.tokenExpiresAt !== null && this.tokenExpiresAt < new Date()) {
          throw new Error('Token expired')
        }

        options.headers = new Headers(options.headers ?? {})
        options.headers.set('Authorization', `Bearer ${this.token}`)
      },
    })

    this.albums = new AlbumsApi(this.$fetch)
    this.artists = new ArtistsApi(this.$fetch)
    this.audiobooks = new AudiobooksApi(this.$fetch)
    this.categories = new CategoriesApi(this.$fetch)
    this.chapters = new ChaptersApi(this.$fetch)
    this.episodes = new EpisodesApi(this.$fetch)
    this.genres = new GenresApi(this.$fetch)
    this.markets = new MarketsApi(this.$fetch)
    this.player = new PlayerApi(this.$fetch)
    this.playlists = new PlaylistsApi(this.$fetch)
    this.search = new SearchApi(this.$fetch)
    this.shows = new ShowsApi(this.$fetch)
    this.users = new UsersApi(this.$fetch)
  }

  public setAccessToken(token: string, expiresIn: number): this {
    this.token = token
    this.tokenExpiresAt = new Date(Date.now() + expiresIn * 1000)

    return this
  }

  public generateOAuthUrl(options: ClientOptions): string {
    const url = new URL('https://accounts.spotify.com/authorize')
    url.searchParams.set('client_id', options.clientId)
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('redirect_uri', options.redirectUri)

    if (options.scope?.length) {
      url.searchParams.set('scope', options.scope.join(' '))
    }
    if (options.state) {
      url.searchParams.set('state', options.state)
    }

    if (options.show_dialog) {
      url.searchParams.set('show_dialog', options.show_dialog.toString())
    }

    return url.toString()
  }

  public async getAccessToken(payload: GetAccessTokenPayload): Promise<TokenResponse> {
    const response = await $fetch<TokenResponse>('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        ...payload,
        grant_type: 'authorization_code',
      }),
    })

    this.setRefreshToken(response.refresh_token)

    return response
  }

  public async refreshToken(payload: GetRefreshTokenPayload): Promise<Omit<TokenResponse, 'refresh_token'>> {
    if (!this._refreshToken) {
      throw new Error('No refresh token set')
    }

    const response = await $fetch<Omit<TokenResponse, 'refresh_token'>>('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        ...payload,
        refresh_token: this._refreshToken!,
        grant_type: 'refresh_token',
      }),
    })

    this.setAccessToken(response.access_token, response.expires_in)

    return response
  }

  public setRefreshToken(refreshToken: string): this {
    this._refreshToken = refreshToken

    return this
  }

  public albums: AlbumsApi

  public artists: ArtistsApi

  public audiobooks: AudiobooksApi

  public categories: CategoriesApi

  public chapters: ChaptersApi

  public episodes: EpisodesApi

  public genres: GenresApi

  public markets: MarketsApi

  public player: PlayerApi

  public playlists: PlaylistsApi

  public search: SearchApi

  public shows: ShowsApi

  public users: UsersApi
}
