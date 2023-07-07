import { ResourceType, SpotifyClient } from '@noook/spotify-client'

console.clear()
const client = new SpotifyClient().setAccessToken(import.meta.env.SPOTIFY_TOKEN!)

// Test your functions here
const searchResult = await client.search.search(
  [ResourceType.Track],
  'Uh uh',
)

await client.player.startPlayback(undefined, {
  uris: [searchResult.tracks.items[0].uri],
})
