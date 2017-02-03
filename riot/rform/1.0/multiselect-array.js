<multiselect-array>
  <div>
    <div class="input-group">
      <input onchange={ changed } type="text" class="form-control" placeholder="enter value...">
      <div class="input-group-btn">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu dropdown-menu-right">
          <li each={ option in values }>
            <a onclick={ selected } data-value={ parent.option_value ? option[parent.option_value] : option } href="#">{ parent.option_text ? option[parent.option_text] : option }</a>
          </li>
        </ul>
      </div>
    </div>
    <ul if={ value.length } class="list-inline">
      <li each={ val in value } class="label label-default" style="margin:2px;">
        { val }
        <span onclick={ remove } class="fa fa-remove text-danger pointer"></span>
      </li>
    </ul>
  </div>
  
  <style>
    .pointer { margin-left:5px; cursor: pointer; }
  </style>

  <script>
    var self = this

    var parse = function(o) {
      if(o.parse) {
        return o.parse(o)
      } else if(o.values) {
        return o.values
      } else if(o.record && o.field) {
        return o.record[o.field] || []
      } else {
        return []
      }
    }

    self.record = opts.record
    self.field = opts.field
    self.option_text = opts.option_text
    self.option_value = opts.option_value
    self.values = parse(opts)
    self.fetch = opts.fetch
    self.value = opts.value || opts.riotValue || []

    self.selected = function(e) {
      e.preventDefault()
      var v = $(e.target).data('value')
      if(self.value.indexOf(v) === -1) {
        self.value.push(v)
        self.record[self.field] = self.value
        $(self.record).trigger('change')
      }
    }

    self.changed = function(e) {
      if(self.value.indexOf(e.target.value) === -1) {
        self.value.push(e.target.value)
        e.target.value = ''
        self.record[self.field] = self.value
        $(self.record).trigger('change')
      }
    }

    self.remove = function(e) {
      var i = self.value.indexOf( $(e.target).parent().text().trim() )
      if(i !== -1) {
        self.value.splice(i,1)
        self.record[self.field] = self.value
        $(self.record).trigger('change')
      }
    }

    self.on('mount', function() {
      if(self.fetch) {
        self.fetch(function(values) {
          self.update({ values: values })
        })
      }
    })
  </script>
</multiselect-array>
