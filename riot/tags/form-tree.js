<form-tree>
  <div class="form-horizontal">
    <div class="form-group">
      <div class="col-xs-2">
        <label data-is="form-tree-cell" class="control-label" field={ field } object={ field } is_a_key={ true }></label>
      </div>
      <div class="col-xs-10">
        <span data-is="form-tree-cell" if={ type !== 'object' } field={ field } object={ object }></span>
        <div if={ type === 'object' }>
          <br/>
          <div show={ !hidden } each={ v,k in object }>
            <div data-is="form-tree" field={ k } object={ v }></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    var self = this
    self.field = opts.field
    self.object = opts.object
    self.hidden = opts.hidden || false
    self.type = typeof(self.object)

    self.show = function() {
      self.update({ hidden: !self.hidden })
    }

    self.on("add:child", function(data) {
      if(self.field == data.field) {
        console.log('adding child to ' + self.field, data)
        self.object[data.key] = data.key
        self.parent.trigger("tree:change", { field: self.field, object: self.object, is_new: true })
      }
    })

    self.on("remove:child", function(data) {
      if(self.type === 'object') {
        console.log("removing child " + data.field)
        var obj = Object.assign({}, self.object, {})
        delete obj[data.field]
        self.parent.trigger("tree:change", { field: self.field, object: obj })
      } else {
        $(this.root).remove()
        self.parent.trigger("remove:child", { field: data.field })
      }
    })

    self.on('cell:change', function(data) {
      console.log("cell change: ",  self.field, self.object, data)
      self.cell_update(data)
      self.parent.trigger("tree:change", { field: self.field, object: self.object, field_was: data.field })
    })

    self.on('tree:change', function(data) {
      console.log("tree change: ", self.field, self.object, data)
      if(self.type === 'object') {
        if(data.field_was) {
          delete self.object[data.field_was]
          self.object[data.field] = data.object
        } else if(data.is_new) {
          self.object[data.field] = data.object
        }
      } else {
        console.log('TYPE: ', self.type)
      }

      self.parent.trigger("tree:change", { field: self.field, object: self.object })
    })

    self.cell_update = function(data) {
      if(data.is_a_key) {
        self.field = data.object
      } else {
        if(self.type === 'object') {
          if(data.field_was) {
            self.object[data.field] = data.object
            delete self.object[data.field_was]
          } else if(data.is_new) {
            self.object[data.field] = data.object
          } else {
            self.object[data.field] = data.object
          }
        } else {
          self.object = data.object
        }
      }
      self.type = typeof(self.object)
    }
  </script>
</form-tree>
