import { SearchType, SpotifyClient } from 'spotify-web-client'

console.clear()
const client = new SpotifyClient().setAccessToken(import.meta.env.SPOTIFY_TOKEN!, 3600)

// Test your functions here
const searchResult = await client.search.search(
  [SearchType.Track],
  'Uh uh',
)

await client.player.startPlayback(undefined, {
  uris: [searchResult.tracks.items[0].uri],
})
