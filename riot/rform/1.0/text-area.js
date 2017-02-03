<text-area>
  <textarea onchange={ changed } class="form-control" rows="4">{ value }</textarea>
  <script>
    var self = this
    var parse = function(o) {
      if(o.value) {
        return o.value
      } else if(o.riotValue) {
        return o.riotValue
      } else if(o.record && o.field) {
        return o.record[o.field]
      } else {
        return ""
      }
    }

    self.record = opts.record
    self.field = opts.field
    self.value = parse(opts)

    self.changed = function(e) {
      self.value = e.target.value
      self.record[self.field] = self.value
      $(self.record).trigger('change')
      self.update()
    }

    self.on('mount', function() {
      if(opts.attributes) {
        var input = self.root.firstChild
        for(var key in opts.attributes) {
          input.setAttribute(key, opts.attributes[key])
        }
      }
    })
  </script>
</text-area>
