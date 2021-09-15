[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![logo](https://chemindigest.com/wp-content/uploads/2019/09/Copper-black.png)

## Requirements

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. YouTube Data API v3 Key **[Guide](https://developers.google.com/youtube/v3/getting-started)**  
2.1 **(Optional)** Soundcloud Client ID **[Guide](https://github.com/zackradisic/node-soundcloud-downloader#client-id)**
3. Node.js v14.0.0 or newer

## 📝 Features & Commands

> Note: The default prefix is '/'

* 🎶 Play music from YouTube via url

`$play https://www.youtube.com/watch?v=GLvohMXgcBo`

* 🔎 Play music from YouTube via search query

`$play under the bridge red hot chili peppers`

* 🎶 Play music from Soundcloud via url

`$play https://soundcloud.com/blackhorsebrigade/pearl-jam-alive`

* 🔎 Search and select music to play

`$search Pearl Jam`

Reply with song number or numbers seperated by comma that you wish to play

Examples: `1` or `1,2,3`

* 📃 Play youtube playlists via url

`$playlist https://www.youtube.com/watch?v=YlUKcNNmywk&list=PL5RNCwK3GIO13SR_o57bGJCEmqFAwq82c`

* 🔎 Play youtube playlists via search query

`$playlist linkin park meteora`
* Now Playing ($np)
* Queue system ($queue, $q)
* Loop / Repeat ($loop)
* Shuffle ($shuffle)
* Volume control ($volume, $v)
* Lyircs ($lyrics, $ly)
* Pause ($pause)
* Resume ($resume, $r)
* Skip ($skip, $s)
* Skip to song # in queue ($skipto, $st)
* Move a song in the queue ($move, $mv)
* Remove song # from queue ($remove, $rm)
* Play an mp3 clip ($clip song.mp3) (put the file in sounds folder)
* List all clips ($clips)
* Show ping to Discord API ($ping)
* Show bot uptime ($uptime)
* Help ($help, $h)
