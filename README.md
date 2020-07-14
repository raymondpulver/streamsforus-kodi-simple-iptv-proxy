# streamsforus-kodi-simple-iptv-proxy

The streamsforus.net service seems to be incompatible with Kodi Simple IPTV Client so I wrote this

## Usage

Build the docker image then set the environment variables

- USERNAME
- PASSWORD
- HOST
- PORT

Deploy the docker image on a host with port 8080 exposed, then set your m3u playlist to the /playlist endpoint and your EPG url to /guide

I'm hosting this on my private OpenVPN server and serving television to my folks. Love you mom.

## Author

Raymond Pulver
