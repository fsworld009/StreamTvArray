# Stream TV Array

A utility web page to allow you to watch multiple streams (currently only support Twitch.tv) on one screen, with the ability to show and hide chat box at will.

[Go to the page now](https://fsworld009.github.io/StreamTvArray/)


## Features
- Customize array width and height
- Toggle chat box visibility
- Set transparency on chat box
- Confirm popup before unload the page to prevent from accidentally closing or leaving the page
- Auto load opened streams on page refresh as long as the tab is not closed

## Changelog
- 08.15.2021:
  - [@danny8376](https://github.com/danny8376): Fixed Twitch embed script
  - Applied dark theme to chats 
- 09.16.2018:
  - Support Youtube Live
- 09.12.2018:
  - Fix transparency resets to 50 on reopen options screen after setting it to 100
- 04.29.2018:
  - Fix Twitch chat URL
- 01.05.2018:
  - Change color scheme
  - Fix: Chat box was above the "Move To Here" rectangle
- 12.21.2017:
  - Add Multi Language support (only English and Traditional Chinese as of now)
  - Add Move Stream feature, now you can move/swap stream location at any time
  - Add new chat options: width, position, and automatically extending width on mouse hover
- 12.13.2017: First version

## Development

Requirement: Node v8.17.10 (dependencies are broken in 10 and up)

```bash
npm ci
npm run build-semantic
# Start a dev server with Vue hot reload support at localhost:3000 
npm run dev-server
```

## Deployment

Edit `utils/deploy.env` to deploy to your GH pages

```
npm run build
npm run deployment
```


## Todos
- Test other browsers (mainly tested on Firefox as of now)
- Export / Import array and stream settings
- Support more sites (not top priority)

## Licence
MIT