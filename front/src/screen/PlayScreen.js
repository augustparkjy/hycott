import React, { Component } from 'react';
import NewWindow from 'react-new-window'
import { FormGroup } from '@material-ui/core';
import html from './screen.js'

class PlayScreen extends Component {
  // constructor (props) {
  //   super(props)
  // }
  state = {
    torrentInfoHash: "",
    torrentMagnetURI: "",
    torrentName: "",
    torrentProgress: "",
    torrentFiles: []
  }
  // componentDidMount() {
  //   var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'//`magnet:?xt=urn:btih:${this.props.infohash}`
  //   // console.log(torrentId)
  //   var WebTorrent = require('webtorrent');
  //   var client = new WebTorrent();
  //   client.on('error', err => {
  //     console.log('[+] Webtorrent error: ' + err.message);
  //   });

  //   client.add(torrentId, (torrent) => {
  //     const interval = setInterval(() => {
  //       // console.log('[+] Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
  //       this.setState({torrentProgress: (torrent.progress * 100).toFixed(1) + '%'});
  //     }, 5000);
  //     torrent.on('done', () => {
  //       console.log('Progress: 100%');
  //       clearInterval(interval);
  //     })

  //     this.setState({
  //       torrentInfoHash: torrent.infoHash,
  //       torrentMagnetURI: torrent.magnetURI,
  //       torrentName: torrent.name,
  //       torrentFiles: torrent.files,
  //     });
  //     // // TODO Figure out a better way to render these files 
  //     // this.state.torrentFiles.map((file, i) => {
  //     //   file.appendTo('main');
  //     // })

  //   });
  // }
  componentDidMount(){
    console.log(this.props.infohash)
    var frog = window.open('', 'wildebeast', 'width=800, height=640, scrollbar=1, resizable=1')
    // var html = ""
    frog.document.open()
    frog.document.write(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>WebTorrent video player</title>
        <style>
          #output video {
            width: 100%;
          }
          #progressBar {
              height: 5px;
              width: 0%;
              background-color: #35b44f;
              transition: width .4s ease-in-out;
          }
          body.is-seed .show-seed {
              display: inline;
          }
          body.is-seed .show-leech {
              display: none;
          }
          .show-seed {
              display: none;
          }
          #status code {
              font-size: 90%;
              font-weight: 700;
              margin-left: 3px;
              margin-right: 3px;
              border-bottom: 1px dashed rgba(255,255,255,0.3);
          }
    
          .is-seed #hero {
              background-color: #154820;
              transition: .5s .5s background-color ease-in-out;
          }
          #hero {
              background-color: #2a3749;
          }
          #status {
              color: #fff;
              font-size: 17px;
              padding: 5px;
          }
          a:link, a:visited {
              color: #30a247;
              text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div id="hero">
          <div id="output">
            <div id="progressBar"></div>
            <!-- The video player will be added here -->
          </div>
          <!-- Statistics -->
          <div id="status">
            <div>
              <span class="show-leech">Downloading </span>
              <span class="show-seed">Seeding </span>
              <code>
                <!-- Informative link to the torrent file -->
                <a id="torrentLink" href="https://webtorrent.io/torrents/sintel.torrent">sintel.torrent</a>
              </code>
              <span class="show-leech"> from </span>
              <span class="show-seed"> to </span>
              <code id="numPeers">0 peers</code>.
            </div>
            <div>
              <code id="downloaded"></code>
              of <code id="total"></code>
              — <span id="remaining"></span><br/>
              &#x2198;<code id="downloadSpeed">0 b/s</code>
              / &#x2197;<code id="uploadSpeed">0 b/s</code>
            </div>
          </div>
        </div>
        <!-- Include the latest version of WebTorrent -->
        <script src="https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js"></script>
    
        <!-- Moment is used to show a human-readable remaining time -->
        <script src="http://momentjs.com/downloads/moment.min.js"></script>
    
        <script>
          var torrentId = 'magnet:?xt=urn:btih:88594aaacbde40ef3e2510c47374ec0aa396c08e&dn=bbb_sunflower_1080p_30fps_normal.mp4&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=http%3A%2F%2Fdistribution.bbb3d.renderfarming.net%2Fvideo%2Fmp4%2Fbbb_sunflower_1080p_30fps_normal.mp4'
    
          var client = new WebTorrent()
    
          // HTML elements
          var $body = document.body
          var $progressBar = document.querySelector('#progressBar')
          var $numPeers = document.querySelector('#numPeers')
          var $downloaded = document.querySelector('#downloaded')
          var $total = document.querySelector('#total')
          var $remaining = document.querySelector('#remaining')
          var $uploadSpeed = document.querySelector('#uploadSpeed')
          var $downloadSpeed = document.querySelector('#downloadSpeed')
    
          // Download the torrent
          client.add(torrentId, function (torrent) {
    
            // Torrents can contain many files. Let's use the .mp4 file
            var file = torrent.files.find(function (file) {
              return file.name.endsWith('.mp4')
            })
    
            // Stream the file in the browser
            file.appendTo('#output')
    
            // Trigger statistics refresh
            torrent.on('done', onDone)
            setInterval(onProgress, 500)
            onProgress()
    
            // Statistics
            function onProgress () {
              // Peers
              $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers')
    
              // Progress
              var percent = Math.round(torrent.progress * 100 * 100) / 100
              $progressBar.style.width = percent + '%'
              $downloaded.innerHTML = prettyBytes(torrent.downloaded)
              $total.innerHTML = prettyBytes(torrent.length)
    
              // Remaining time
              var remaining
              if (torrent.done) {
                remaining = 'Done.'
              } else {
                remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
                remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
              }
              $remaining.innerHTML = remaining
    
              // Speed rates
              $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s'
              $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s'
            }
            function onDone () {
              $body.className += ' is-seed'
              onProgress()
            }
          })
    
          // Human readable bytes util
          function prettyBytes(num) {
            var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            if (neg) num = -num
            if (num < 1) return (neg ? '-' : '') + num + ' B'
            exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
            num = Number((num / Math.pow(1000, exponent)).toFixed(2))
            unit = units[exponent]
            return (neg ? '-' : '') + num + ' ' + unit
          }
        </script>
      </body>
    </html>`)
    frog.document.close()
    // var newDiv = document.createElement('main');
    // var currentDiv = document.getElementById('root')
    // document.body.insertBefore(newDiv, currentDiv)
  }

  render() {
 
    return (<div/>
      // <div>
      //   <h1>{this.state.torrentName}</h1>
      //   <p><b>Torrent Info Hash: </b>{this.state.torrentInfoHash}</p>
      //   <p><b>Torrent Progress: </b>{this.state.torrentProgress}</p>
      //   {/* <p>{this.props.infoHash}</p> */}
      // </div>
      // // </NewWindow>
    );
  }
}

export default PlayScreen;