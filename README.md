# spotify-web-client

A fully typed client for node and browser environments.

##  🚀 Quick Start
Install:

```bash
# npm
npm i spotify-web-client

# yarn
yarn add spotify-web-client
```

Import:

```ts
// ESM / Typescript
import { SpotifyClient } from 'spotify-web-client'

// CommonJS
const { SpotifyClient } = require('spotify-web-client')
```

Usage
```ts
const token = '...' // Generate an access token with OAuth

const client = new SpotifyClient().setAccessToken(token)

// Get currently played song
const playbackState = await client.player.getPlaybackState()
if (playbackState.item?.type === 'track') {
  // playbackState.item narrowed to TrackObject
  console.log(playbackState.item.name)
}
```

You can check for more advanced usage (OAuth, other methods...) in the [playground directory](./playground/)

## 📦 Available APIs

- [🔒 Authentication](#---authentication)
- [💿 Albums](#---albums)
- [🎤 Artists](#---artists)
- [📗 Audiobooks](#---audiobooks)
- [🔖 Categories](#---categories)
- [🕮 Chapters](#---chapters)
- [🎙️ Episodes](#----episodes)
- [🪩 Genres](#---genres)
- [🌍 Markets](#---markets)
- [▶️ Player](#---player)
- [🎧 Playlists](#---playlists)
- [🔍 Search](#---search)
- [🎙️ Shows](#----shows)
- [🎼 Tracks](#---tracks)
- [👥 Users](#---users)

### 🔒 Authentication

These methods can be accessed directly through your `SpotifyClient` instance.

| Method | Description |
| -------| ----------- |
| `setAccessToken` | Sets the `access_token` for the current instance of `SpotifyClient` |
| `setRefreshToken` | Sets the `refresh_token` for the current instance of `SpotifyClient` |
| `generateOAuthUrl` | Generates an OAuth link with the provided scope |
| `getAccessToken` | Exchanges an authorization code for an `access_token` and a `refresh_token` |
| `refreshToken` | Obtain a new `access_token` from a refresh token |


### 💿 Albums

These methods can be accessed through the `albums` key of your `SpotifyClient` instance.

| Method | Description |
| -------| ----------- |
| [`getAlbum`](https://developer.spotify.com/documentation/web-api/reference/get-an-album) | Get Spotify catalog information for a single album. |
| [`getAlbums`](https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums) | Get Spotify catalog information for multiple albums identified by their Spotify IDs. |
| [`getAlbumTracks`](https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks) | Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned. |
| [`getSavedAlbums`](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums) | Get a list of the albums saved in the current Spotify user's 'Your Music' library. |
| [`saveAlbums`](https://developer.spotify.com/documentation/web-api/reference/save-albums-user) | Save one or more albums to the current user's 'Your Music' library. |
| [`removeAlbums`](https://developer.spotify.com/documentation/web-api/reference/remove-albums-user) | Remove one or more albums from the current user's 'Your Music' library. |
| [`checkUserSavedAlbums`](https://developer.spotify.com/documentation/web-api/reference/check-users-saved-albums) | Check if one or more albums is already saved in the current Spotify user's 'Your Music' library. |
| [`getReleases`](https://developer.spotify.com/documentation/web-api/reference/get-new-releases) | Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab). |

### 🎤 Artists

These methods can be accessed through the `artists` key of your `SpotifyClient` instance.

| Method | Description |
| -------| ----------- |
| [`getArtist`](https://developer.spotify.com/documentation/web-api/reference/get-an-artist) | Get Spotify catalog information for a single artist identified by their unique Spotify ID. |
| [`getArtists`](https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists) | Get Spotify catalog information for several artists based on their Spotify IDs. |
| [`getArtistAlbums`](https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums) | Get Spotify catalog information about an artist's albums. |
| [`getArtistTopTracks`](https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks) | Get Spotify catalog information about an artist's top tracks by country. |
| [`getRelatedArtists`](https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists) | Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history. |

### 📗 Audiobooks

These methods can be accessed through the `audiobooks` key of your `SpotifyClient` instance.

**Note:** Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.

| Method | Description |
| -------| ----------- |
| [`getAudiobook`](https://developer.spotify.com/documentation/web-api/reference/get-an-audiobook) | Get Spotify catalog information for a single audiobook. |
| [`getAudiobooks`](https://developer.spotify.com/documentation/web-api/reference/get-multiple-audiobooks) | Get Spotify catalog information for several audiobooks identified by their Spotify IDs. |
| [`getAudiobookChapters`](https://developer.spotify.com/documentation/web-api/reference/get-audiobook-chapters) | Get Spotify catalog information about an audiobook's chapters. |
| [`getSavedAudiobooks`](api/reference/get-users-saved-audiobooks) | Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library. |
| [`saveAudiobooks`](https://developer.spotify.com/documentation/web-api/reference/save-audiobooks-user) | Save one or more audiobooks to the current Spotify user's library. |
| [`removeAudiobooks`](https://developer.spotify.com/documentation/web-api/reference/remove-audiobooks-user) | Remove one or more audiobooks from the Spotify user's library. |
| [`checkUserSavedAudiobooks`](https://developer.spotify.com/documentation/web-api/reference/check-users-saved-audiobooks) | Check if one or more audiobooks are already saved in the current Spotify user's library. |

### 🔖 Categories

These methods can be accessed through the `categories` key of your `SpotifyClient` instance.

| Method | Description |
| -------| ----------- |
| [`getCategories`](https://developer.spotify.com/documentation/web-api/reference/get-categories) | Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab). |
| [`getCategory`](https://developer.spotify.com/documentation/web-api/reference/get-a-category) | Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab). |

### 🕮 Chapters

These methods can be accessed through the `chapters` key of your `SpotifyClient` instance.

**Note:** Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.

| Method | Description |
| -------| ----------- |
| [`getChapter`](https://developer.spotify.com/documentation/web-api/reference/get-a-chapter) | Get Spotify catalog information for a single chapter. |
| [`getChapters`](https://developer.spotify.com/documentation/web-api/reference/get-several-chapters) | Get Spotify catalog information for several chapters identified by their Spotify IDs. |

### 🎙️ Episodes

These methods can be accessed through the `episodes` key of your `SpotifyClient` instance.

| Method | Description |
| -------| ----------- |
| [`getEpisode`](https://developer.spotify.com/documentation/web-api/reference/get-an-episode) | Get Spotify catalog information for a single episode identified by its unique Spotify ID. |
| [`getEpisodes`](https://developer.spotify.com/documentation/web-api/reference/get-multiple-episodes) | Get Spotify catalog information for several episodes based on their Spotify IDs. |
| [`getSavedEpisodes`](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-episodes) | Get a list of the episodes saved in the current Spotify user's library. |
| [`saveEpisodes`](https://developer.spotify.com/documentation/web-api/reference/save-episodes-user) | Save one or more episodes to the current user's library. |
| [`removeEpisodes`](https://developer.spotify.com/documentation/web-api/reference/remove-episodes-user) | Remove one or more episodes from the current user's library. |
| [`checkUserSavedEpisodes`](https://developer.spotify.com/documentation/web-api/reference/check-users-saved-episodes) | Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library. |

### 🪩 Genres

These methods can be accessed through the `genres` key of your `SpotifyClient` instance.

| Method | Description |
| -------| ----------- |
| [`getAvailableGenreSeeds`](https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres) | Retrieve a list of available genres seed parameter values for recommendations. |

### 🌍 Markets

These methods can be accessed through the `genres` key of your `SpotifyClient` instance.

| Method | Description |
| -------| ----------- |
| [`getMarkets`](https://developer.spotify.com/documentation/web-api/reference/get-available-markets) | Get the list of markets where Spotify is available. |

### ▶️ Player

These methods can be accessed through the `player` key of your `SpotifyClient` instance.

| Method | Description |
| -------| ----------- |
| [`getPlaybackState`](https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback) | Get information about the user’s current playback state, including track or episode, progress, and active device. |
| [`transferPlayback`](https://developer.spotify.com/documentation/web-api/reference/transfer-a-users-playback) | Transfer playback to a new device and determine if it should start playing. |
| [`getAvailableDevices`](https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices) | Get information about a user’s available devices. |
| [`getCurrentlyPlayedTrack`](https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track) | Get the object currently being played on the user's Spotify account. |
| [`startPlayback`](https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback) | Start a new context or resume current playback on the user's active device. |
| [`pausePlayback`](https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback) | Pause playback on the user's account. |
| [`skipToNext`](https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track) | Skips to next track in the user’s queue. |
| [`skipToPrevious`](https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track) | Skips to previous track in the user’s queue. |
| [`seekToPosition`](https://developer.spotify.com/documentation/web-api/reference/seek-to-position-in-currently-playing-track) | Seeks to the given position in the user’s currently playing track. |
| [`setRepeatMode`](https://developer.spotify.com/documentation/web-api/reference/set-repeat-mode-on-users-playback) | Set the repeat mode for the user's playback. Options are repeat-track, repeat-context, and off. |
| [`setPlaybackVolume`](https://developer.spotify.com/documentation/web-api/reference/set-volume-for-users-playback) | Set the volume for the user’s current playback device. |
| [`toggleShuffle`](https://developer.spotify.com/documentation/web-api/reference/toggle-shuffle-for-users-playback) | Toggle shuffle on or off for user’s playback. |
| [`getRecentlyPlayedTracks`](https://developer.spotify.com/documentation/web-api/reference/get-recently-played) | Get tracks from the current user's recently played tracks. |
| [`getUserQueue`](https://developer.spotify.com/documentation/web-api/reference/get-queue) | Get the list of objects that make up the user's queue. |
| [`addItemToQueue`](https://developer.spotify.com/documentation/web-api/reference/add-to-queue) | Add an item to the end of the user's current playback queue. |

### 🎧 Playlists

These methods can be accessed through the `playlists` key of your `SpotifyClient` instance.

| Method | Description |
| -------| ----------- |
| [`getPlaylist`](https://developer.spotify.com/documentation/web-api/reference/get-playlist) | Get a playlist owned by a Spotify user. |
| [`updatePlaylistDetails`](https://developer.spotify.com/documentation/web-api/reference/change-playlist-details) | Change a playlist's name and public/private state. (The user must, of course, own the playlist.) |
| [`getPlaylistItems`](https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks) | Get full details of the items of a playlist owned by a Spotify user. |
| [`updatePlaylistItems`](https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks) | Either reorder or replace items in a playlist depending on the request's parameters. To reorder items, include range_start, insert_before, range_length and snapshot_id in the request's body. To replace items, include uris as either a query parameter or in the request's body. Replacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist. |
| [`addPlaylistItems`](https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist) | Add one or more items to a user's playlist. |
| [`removePlaylistItems`](https://developer.spotify.com/documentation/web-api/reference/remove-tracks-playlist) | Remove one or more items from a user's playlist. |
| [`getCurrentUserPlaylists`](https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists) | Get a list of the playlists owned or followed by the current Spotify user. |
| [`getUserPlaylists`](https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists) | Get a list of the playlists owned or followed by a Spotify user. |
| [`createPlaylist`](https://developer.spotify.com/documentation/web-api/reference/create-playlist) | Create a playlist for a Spotify user. (The playlist will be empty until you add tracks.) |
| [`getFeaturedPlaylists`](https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists) | Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab). |
| [`getPlaylistsForCategory`](https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists) | Get a list of Spotify playlists tagged with a particular category. |
| [`getPlaylistCoverImage`](https://developer.spotify.com/documentation/web-api/reference/get-playlist-cover) | Get the current image associated with a specific playlist. |
| [`addCustomPlaylistCoverImage`](https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover) | Replace the image used to represent a specific playlist. |

### 🔍 Search

These methods can be accessed through the `search` key of your `SpotifyClient` instance.

**Note:** Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.

| Method | Description |
| -------| ----------- |
| [`search`](https://developer.spotify.com/documentation/web-api/reference/search) | Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks that match a keyword string. |

### 🎙️ Shows

These methods can be accessed through the `shows` key of your `SpotifyClient` instance.

| Method | Description |
| -------| ----------- |
| [`getShow`](https://developer.spotify.com/documentation/web-api/reference/get-a-show) | Get Spotify catalog information for a single show identified by its unique Spotify ID. |
| [`getShows`](https://developer.spotify.com/documentation/web-api/reference/get-multiple-shows) | Get Spotify catalog information for several shows based on their Spotify IDs. |
| [`getShowsEpisodes`](https://developer.spotify.com/documentation/web-api/reference/get-a-shows-episodes) | Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned. |
| [`getSavedShows`](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-shows) | Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned. |
| [`saveShows`](https://developer.spotify.com/documentation/web-api/reference/save-shows-user) | Save one or more shows to current Spotify user's library. |
| [`removeShows`](https://developer.spotify.com/documentation/web-api/reference/remove-shows-user) | Delete one or more shows from current Spotify user's library. |
| [`checkUserSavedShows`](https://developer.spotify.com/documentation/web-api/reference/check-users-saved-shows) | Check if one or more shows is already saved in the current Spotify user's library. |

### 🎼 Tracks

These methods can be accessed through the `tracks` key of your `SpotifyClient` instance.

| Method | Description |
| -------| ----------- |
| [`getTrack`](https://developer.spotify.com/documentation/web-api/reference/get-track) | Get Spotify catalog information for a single track identified by its unique Spotify ID. |
| [`getTracks`](https://developer.spotify.com/documentation/web-api/reference/get-several-tracks) | Get Spotify catalog information for multiple tracks based on their Spotify IDs. |
| [`getUserSavedTracks`](https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks) | Get a list of the songs saved in the current Spotify user's 'Your Music' library. |
| [`saveTracks`](https://developer.spotify.com/documentation/web-api/reference/save-tracks-user) | Save one or more tracks to the current user's 'Your Music' library. |
| [`removeSavedTracks`](https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user) | Remove one or more tracks from the current user's 'Your Music' library. |
| [`checkUserSavedTracks`](https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks) | Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library. |
| [`getTracksAudioFeatures`](https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features) | Get audio features for multiple tracks based on their Spotify IDs. |
| [`getTrackAudioFeatures`](https://developer.spotify.com/documentation/web-api/reference/get-audio-features) | Get audio feature information for a single track identified by its unique Spotify ID. |
| [`getTrackAudioAnalysis`](https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis) | Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre. |
| [`getRecommendations`](https://developer.spotify.com/documentation/web-api/reference/get-recommendations) | Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details. <br>For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks. |

### 👥 Users

These methods can be accessed through the `users` key of your `SpotifyClient` instance.

| Method | Description |
| -------| ----------- |
| [`getCurrentUserProfile`](https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile) | Get detailed profile information about the current user (including the current user's username). |
| [`getCurrentUserTopItems`](https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks) | Get the current user's top artists or tracks based on calculated affinity. |
| [`getUserProfile`](https://developer.spotify.com/documentation/web-api/reference/get-users-profile) | Get public profile information about a Spotify user. |
| [`followPlaylist`](https://developer.spotify.com/documentation/web-api/reference/follow-playlist) | Add the current user as a follower of a playlist. |
| [`unfollowPlaylist`](https://developer.spotify.com/documentation/web-api/reference/unfollow-playlist) | Remove the current user as a follower of a playlist. |
| [`getFollowedArtists`](https://developer.spotify.com/documentation/web-api/reference/get-followed) | Get the current user's followed artists. |
| [`follow`](https://developer.spotify.com/documentation/web-api/reference/follow-artists-users) | Add the current user as a follower of one or more artists or other Spotify users. |
| [`unfollow`](https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users) | Remove the current user as a follower of one or more artists or other Spotify users. |
| [`isFollowing`](https://developer.spotify.com/documentation/web-api/reference/check-current-user-follows) | Check to see if the current user is following one or more artists or other Spotify users. |
| [`isFollowingPlaylist`](https://developer.spotify.com/documentation/web-api/reference/check-if-user-follows-playlist) | Check to see if one or more Spotify users are following a specified playlist. |