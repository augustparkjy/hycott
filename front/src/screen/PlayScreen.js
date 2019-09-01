import React, { Component } from 'react';
import NewWindow from 'react-new-window';

class PlayScreen extends Component {
  state = {
    torrentInfoHash: "",
    torrentMagnetURI: "",
    torrentName: "",
    torrentProgress: "",
    torrentFiles: [],
    screen : document.createElement('http')
  }
  componentDidMount() {
    var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'//`magnet:?xt=urn:btih:${this.props.infohash}`
    var WebTorrent = require('webtorrent');
    var client = new WebTorrent();

    client.on('error', err => {
      console.log('[+] Webtorrent error: ' + err.message);
    });

    client.add(torrentId, (torrent) => {
      console.log('client.add')
      const interval = setInterval(() => {
        // console.log('[+] Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
        this.setState({torrentProgress: (torrent.progress * 100).toFixed(1) + '%'});
      }, 5000);

      torrent.on('done', () => {
        console.log('Progress: 100%');
        clearInterval(interval);
      })

      this.setState({
        torrentInfoHash: torrent.infoHash,
        torrentMagnetURI: torrent.magnetURI,
        torrentName: torrent.name,
        torrentFiles: torrent.files
      });
      // TODO Figure out a better way to render these files 
      this.state.torrentFiles.map((file, i) => {
        console.log(file)
        file.appendTo(this.state.screen);
      })
    });
  }
 
  render() {
 
    return (
      <NewWindow>
        <div dangerouslySetInnerHTML={{__html:this.state.screen.outerHTML}}></div>
        <div>
          <h1>{this.state.torrentName}</h1>
          <p><b>Torrent Info Hash: </b>{this.state.torrentInfoHash}</p>
          <p><b>Torrent Progress: </b>{this.state.torrentProgress}</p>
          {/* <p>{this.props.infoHash}</p> */}
        </div>
      </NewWindow>
    );
  }
}

export default PlayScreen;