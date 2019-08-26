import React, { Component } from 'react';
import WebTorrent from 

var WebTorrent = require('webtorrent')

var client = new WebTorrent()

var magnetURI = 'magnet: ...'

client.add(magnetURI, { path: '/path/to/folder' }, function (torrent) {
  torrent.on('done', function () {
    console.log('torrent download finished')
  })
})


`magnet:?xt=urn:btih:${this.props.infohash}`
export default PlayScreen;