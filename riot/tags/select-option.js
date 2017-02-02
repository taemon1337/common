<select-option>
  <select name={ field } onchange={ select } class="form-control input-sm">
    <option class="form-control" if={ default }>{ default }</option>
    <option class="form-control" each={ rec in records } value={ rec[parent.option_value] } selected={ rec[parent.option_value] === value ? 'selected' : '' }>{ rec[parent.option_text] }</option>
  </select>

  <script>
    var self = this
    this.default = opts.default
    this.record = opts.record || {}
    this.field = opts.field
    this.value = opts.value || this.record[this.field]

    this.option_value = opts.option_value || "_id"
    this.option_text = opts.option_text || "_id"
    this.records = opts.records || []

    this.select = function(e) {
      self.record[self.field] = e.target.value
      if(self.parent && self.parent.trigger) {
        self.parent.trigger('option:selected', {
          record: self.record,
          field: self.field,
          value: e.target.value
        })
      }
    }

    this.on('options:loaded', function(records) {
      self.update({ records: records })
    })

    this.on('mount', function() {
      if(opts.fetch) {
        opts.fetch(function(records) {
          self.update({ records: records })
        })
      }
    })
  </script>
</select-option>
