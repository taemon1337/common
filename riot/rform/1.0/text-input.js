<text-input>
  <input onchange={ changed } type='text' class='form-control { opts.addclass }' value={ value }>

  <style>
    .tablecell {
      width: 100%;
      padding: 10px;
      margin: 0px;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
  </style>

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
    self.value = opts.parse ? opts.parse(opts) : parse(opts)

    self.changed = function(e) {
      if(opts.onchange) {
        opts.onchange(e, { record: self.record, field: self.field, value: e.target.value })
      }
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
</text-input>
