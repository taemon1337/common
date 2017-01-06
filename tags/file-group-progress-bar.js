riot.tag('file-group-progress-bar', "<div class='progress'></div>", function(opts) {
  var self = this;
  var current = 0
  var total = 0
  var status = "info"
  this.files = opts.files
  this.title = opts.title || opts.files.length+" files"

  this.bar = $('<div class="progress-bar progress-bar-striped" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>');

  this.on('mount', function() {
    this.root.firstChild.appendChild( this.bar[0] )
  })

  this.files.forEach(function(file) {
    total += file.size

    $(this.file).on('progress', function(evt, p) {
      current += p.bytes;
      percent = Math.floor(current/total*100);

      if(percent >= 100) { status = "success" }
      console.log("PROGRESS: ", percent)

      $(self.bar)
      .width(percent+"%")
      .html(percent+"%")
      .attr('aria-valuenow', percent)
      .removeClass('progress-bar-success progress-bar-info progress-bar-danger')
      .addClass('progress-bar-'+(status || 'info'))
    });
  });
});

