riot.tag('form-component', "<div></div>", function(opts) {
  var self = this
  var currentTag = null

  self.record = opts.record || self.parent.record
  self.field = opts.field
  self.value = opts.value

  self.onchange = function(e, a) {
    if(a && a.value) {
      self.record[self.field] = a.value
    } else if(e.target.value) {
      self.record[self.field] = e.target.value
    }
    $(self.record).trigger('change')
  }

  self.updateContent = function(tag) {
    if(tag.html) {
      currentTag && currentTag.remove()
      currentTag = $(tag.html)
      $(currentTag).appendTo( self.root )
      $(currentTag).off('change').on('change', self.onchange)
    } else if(tag.template) {
      self.root.innerHTML = riot.util.tmpl(tag.template,self.record)
    } else if(tag.name) {
      var tagopts = $.extend({}, tag.options, { record: self.record, field: self.field, value: self.value, onchange: self.onchange })
      if(self.tags[tag.name]) {
        self.tags[tag.name][0].unmount(true)
        self.tags[tag.name].push(riot.mount(self.root, tag.name, tagopts)[0])
      } else {
        self.tags[tag.name] = riot.mount(self.root, tag.name, tagopts)
      }
//      currentTag && currentTag.unmount(true)
//      currentTag = riot.mount(self.root, tag.name, tagopts)[0];
//      currentTag.parent = self.parent;
    } else if(tag.label) {
      currentTag && currentTag.remove()
      if(tag.editable) {
        currentTag = $("<input type='text' class='form-control'>").val(tag.label)
      } else {
        currentTag = $("<label class='control-label'></label>").text(tag.label)
      }
      $(currentTag).appendTo( self.root )
    }
  }

  self.on('mount', function() {
    self.root.className = "col-xs-"+(opts.columns || 12)
    self.updateContent(opts.tag)
  })

  self.on('update', function() {
    self.updateContent(opts.tag)
  })
})

