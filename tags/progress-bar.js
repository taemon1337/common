riot.tag('progress-bar', "<div class='progress'></div>", function(opts) {
  var self = this;
  this.title = opts.title || ""

  this.bar = $('<div class="progress-bar progress-bar-striped" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>');

  this.on('mount', function() {
    this.root.firstChild.appendChild( this.bar[0] )
  })

  this.on('progress', function(p) {
    $(self.bar)
      .width(p.percent+"%")
//      .html(p.percent+"%")
      .attr('aria-valuenow', p.percent)
      .removeClass('progress-bar-success progress-bar-info progress-bar-danger')
      .addClass('progress-bar-'+(p.status || 'info'))
    ;
  });
});

