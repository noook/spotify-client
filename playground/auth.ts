import { createServer } from 'node:http'
import { parse } from 'node:url'
import { consola } from 'consola'
import { Scopes, SpotifyClient } from 'spotify-web-client'

console.clear()

const client = new SpotifyClient()

// Test your functions here
const link = client.generateOAuthUrl({
  clientId: import.meta.env.SPOTIFY_CLIENT_ID!,
  redirectUri: import.meta.env.SPOTIFY_REDIRECT_URI!,
  scope: [
    Scopes.USER_READ_PRIVATE,
    Scopes.USER_READ_EMAIL,
  ],
})

consola.box('Spotify OAuth2 Playground')
consola.info('Open the following link to authenticate:')
console.log(link)

const server = createServer(async (req, res) => {
  const url = parse(req.url!, true)
  if (url.pathname === '/api/auth/callback') {
    const code = url.query.code as string

    const response = await client.getAccessToken({
      code,
      redirect_uri: import.meta.env.SPOTIFY_REDIRECT_URI!,
      client_secret: import.meta.env.SPOTIFY_CLIENT_SECRET!,
      client_id: import.meta.env.SPOTIFY_CLIENT_ID!,
    })

    consola.success('Successfully authenticated')
    consola.info('Access token:', response.access_token)

    console.debug('Refreshing token ...')
    const refreshed = await client.refreshToken({
      client_id: import.meta.env.SPOTIFY_CLIENT_ID!,
      client_secret: import.meta.env.SPOTIFY_CLIENT_SECRET!,
    })
    consola.success('Successfully refreshed token')
    consola.success('Access token:', refreshed.access_token)

    // Testing our token
    const profile = await client
      .setAccessToken(response.access_token, response.expires_in)
      .users
      .getCurrentUserProfile()

    consola.info('User email:', profile.email)
    consola.info('User display name:', profile.display_name)

    // Send the response to the client
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(response))
    res.end()
  }
})

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeFullReload', () => {
    server.close()
  })
}
server.listen(3000)

process.on('exit', () => {
  server.close()
})
