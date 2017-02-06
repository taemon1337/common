<multiselect>
  <div>
    <div class="input-group">
      <input onchange={ search } class="form-control" type='text' placeholder={ placeholder }>
      <div class="input-group-btn">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu dropdown-menu-right">
          <li each={ option,index in options }>
            <a onclick={ select } href="#">{ getText(option) }</a>
          </li>
        </ul>
      </div>
    </div>
    <ul if={ value.length } class="list-group">
      <li each={ selection,index in value } class="list-group-item">
        <span onclick={ remove } class="pull-right fa fa-remove text-danger"></span>
        { getText(selection) }
      </li>
    </ul>
  </div>

  <script>
    var self = this

    self.record = opts.record || {}
    self.field = opts.field
    self.value = opts.value || []
    self.text_field = opts.text_field
    self.value_field = opts.value_field
    self.placeholder = opts.placeholder || "select options..."
    self.options = opts.options || []

    self.search = function(e) {
      if(e.target.value) {
        self.update({ options: self.options.filter(function(o) { return JSON.stringify(o).match(e.target.value) }) })
      } else {
        self.reload()
      }
    }

    self.select = function(e) {
      e.preventDefault()
      var val = self.getValue(e.item.option)
      if(self.value.indexOf(val) === -1) {
        self.value.push(self.getValue(e.item.option))
        if(self.record && self.field) {
          self.record[self.field] = self.value
        }
      } else {
        console.log("Already Selected Option: ", val)
      }
    }

    self.remove = function(e) {
      if(self.value[e.item.index] === e.item.selection) {
        self.value.splice(e.item.index, 1)
        if(self.record && self.field) {
          self.record[self.field] = self.value
        }
        self.update()
      }
    }

    self.getValue = function(option) {
      return self.value_field ? option[self.value_field] : option
    }

    self.getText = function(option) {
      return self.text_field ? option[self.text_field] : option
    }

    self.reload = function() {
      if(opts.fetch) {
        opts.fetch(function(records) {
          self.update({ options: records })
        })
      }
    }

    self.on('mount', function() {
      self.reload()
    })
  </script>
</multiselect>
