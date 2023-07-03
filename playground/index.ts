import { config } from 'dotenv'
import { SpotifyClient } from '@noook/spotify-client'

config({
  path: '.env.local',
})

async function init() {
  const client = new SpotifyClient().setAccessToken(process.env.SPOTIFY_TOKEN!)

  // Test your functions here
}

init()
