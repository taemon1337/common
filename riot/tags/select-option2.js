<select-option>
  <select onchange={ select } class="form-control input-sm" name={ field }>
    <option class="form-control" if={ default }>{ default }</option>
    <option class="form-control" each={ rec in records } value={ rec[parent.option_value] } selected={ rec[parent.option_value] === current ? 'selected' : '' }>{ rec[parent.option_text] }</option>
  </select>

  <script>
    var getCurrentValue = function(o) {
      if(o.parse) { return o.parse(o) }
      if(o.current) { return o.current }
      if(o.record && o.field) {
        return o.record[o.field]
      }
      return null
    }

    var self = this
    self.default = opts.default
    self.field = opts.field
    self.record = opts.record
    self.current = getCurrentValue(opts)

    self.option_value = opts.option_value || "_id"
    self.option_text = opts.option_text || "_id"
    self.records = opts.records || []

    self.select = function(e) {
      var primitive = self.records.filter(function(r) { return r[self.option_value] === e.target.value })[0]
      if(self.parent && self.parent.parent && self.parent.parent.trigger) {
        self.parent.parent.trigger('option:selected', { value: e.target.value, field: self.field })
      }
      if(opts.onselect) {
        opts.onselect({ event: e, record: self.record, field: self.field, value: e.target.value, option: primitive })
      }
    }

    self.on('options:loaded', function(records) {
      self.update({ records: records })
    })

    self.on('mount', function() {
      if(opts.fetch) {
        opts.fetch(function(records) {
          self.update({ records: records })
        })
      }
    })
  </script>
</select-option>
