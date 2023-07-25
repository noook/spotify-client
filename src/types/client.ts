export enum Scopes {
  UGC_IMAGE_UPLOAD = 'ugc-image-upload',
  USER_READ_PLAYBACK_STATE = 'user-read-playback-state',
  USER_MODIFY_PLAYBACK_STATE = 'user-modify-playback-state',
  USER_READ_CURRENTLY_PLAYING = 'user-read-currently-playing',
  APP_REMOTE_CONTROL = 'app-remote-control',
  STREAMING = 'streaming',
  PLAYLIST_READ_PRIVATE = 'playlist-read-private',
  PLAYLIST_READ_COLLABORATIVE = 'playlist-read-collaborative',
  PLAYLIST_MODIFY_PRIVATE = 'playlist-modify-private',
  PLAYLIST_MODIFY_PUBLIC = 'playlist-modify-public',
  USER_FOLLOW_MODIFY = 'user-follow-modify',
  USER_FOLLOW_READ = 'user-follow-read',
  USER_READ_PLAYBACK_POSITION = 'user-read-playback-position',
  USER_TOP_READ = 'user-top-read',
  USER_READ_RECENTLY_PLAYED = 'user-read-recently-played',
  USER_LIBRARY_MODIFY = 'user-library-modify',
  USER_LIBRARY_READ = 'user-library-read',
  USER_READ_EMAIL = 'user-read-email',
  USER_READ_PRIVATE = 'user-read-private',
  USER_SOA_LINK = 'user-soa-link',
  USER_SOA_UNLINK = 'user-soa-unlink',
  USER_MANAGE_ENTITLEMENTS = 'user-manage-entitlements',
  USER_MANAGE_PARTNER = 'user-manage-partner',
  USER_CREATE_PARTNER = 'user-create-partner',
}

export interface ClientOptions {
  /**
   * The Client ID generated after registering your application.
   */
  clientId: string
  /**
   * The URI to redirect to after the user grants or denies permission. This URI needs to have been entered in the Redirect URI allowlist that you specified when you registered
   * your application (See the [app guide](https://developer.spotify.com/documentation/web-api/concepts/apps)). The value of `redirect_uri` here must exactly match one of the
   * values you entered when you registered your application, including upper or lowercase, terminating slashes, and such.
   */
  redirectUri: string

  /**
   * A space-separated list of [scopes](https://developer.spotify.com/documentation/web-api/concepts/scopes).If no scopes are specified, authorization will
   * be granted only to access publicly available information: that is, only information normally visible in the Spotify desktop, web, and mobile players.
   */
  scope?: Scopes[]

  /**
   * This provides protection against attacks such as cross-site request forgery. See R[FC-6749](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1).
   */
  state?: string

  /**
   * Whether or not to force the user to approve the app again if they’ve already done so.
   * If `false` (default), a user who has already approved the application may be automatically redirected to the URI specified by redirect_uri.
   * If `true`, the user will not be automatically redirected and will have to approve the app again.
   */
  show_dialog?: boolean
}

export interface GetAccessTokenPayload {
  /**
   * The client ID for your app, available from the developer dashboard.
   */
  client_id: string

  /**
   * The client secret for your app, available from the developer dashboard.
   */
  client_secret: string

  /**
   * The authorization code returned from the previous request.
   */
  code: string

  /**
   * This parameter is used for validation only (there is no actual redirection).
   * The value of this parameter must exactly match the value of `redirect_uri` supplied when
   * requesting the authorization code.
   */
  redirect_uri: string
}

export interface GetRefreshTokenPayload {
  /**
   * The client ID for your app, available from the developer dashboard.
   */
  client_id: string

  /**
   * The client secret for your app, available from the developer dashboard.
   */
  client_secret: string
}

export interface TokenResponse {
  /**
   * An Access Token that can be provided in subsequent calls, for example to Spotify Web API services.
   */
  access_token: string

  /**
   * A token that can be sent to the Spotify Accounts service in place of an authorization code.
   * (When the access code expires, send a POST request to the Accounts service `/api/token` endpoint, but use this code in place of an authorization code.
   * A new Access Token will be returned. A new refresh token might be returned too.)
   */
  refresh_token: string

  /**
   * How the Access Token may be used: always "Bearer".
   */
  token_type: 'Bearer'

  /**
   * The time period (in seconds) for which the Access Token is valid.
   */
  expires_in: number

  /**
   * A space-separated list of scopes which have been granted for this `access_token`
   */
  scope: string
}
