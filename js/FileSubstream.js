function FileSubstream(file, substream, opts) {
  var self = this
  opts = opts || {};
  var fileSize = file.size;
  var chunkSize = opts.chunkSize || 1024*1024; // 1024*1024 = 1MB
  var offset = opts.offset || 0;

  var chunkReaderBlock = function(_offset, length, _file, cb) {
    var r = new FileReader();
    var blob = _file.slice(_offset, length + _offset);
    r.onloadend = cb;
    r.readAsBinaryString(blob);
  }

  var readEventHandler = function(evt) {
    if(evt.target.error == null) {
      var buf = evt.target.result;
      offset += buf.length;
      substream.write(buf);
    } else {
      console.log("Read error: " + evt.target.error);
      substream.emit('error', evt.target.error);
      substream.end();
      return;
    }

    if(offset >= fileSize) {
      substream.end()
      return;
    }
    chunkReaderBlock(offset, chunkSize, file, readEventHandler); // do next chunk
  };

  chunkReaderBlock(offset, chunkSize, file, readEventHandler); // start with 1st block
}
