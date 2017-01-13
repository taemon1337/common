<select-option>
  <select onchange={ select } class="form-control input-sm">
    <option class="form-control" if={ default }>{ default }</option>
    <option class="form-control" each={ rec in records } value={ rec[parent.option_value] } selected={ rec[parent.option_value] === current ? 'selected' : '' }>{ rec[parent.option_text] }</option>
  </select>

  <script>
    var self = this
    this.default = opts.default
    this.field = opts.field
    this.current = opts.current

    this.option_value = opts.option_value || "_id"
    this.option_text = opts.option_text || "_id"
    this.records = opts.records || []

    this.select = function(e) {
      self.parent.parent.trigger('option:selected', { value: e.target.value, field: self.field })
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
