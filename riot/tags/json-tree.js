<json-tree>
  <json-tree-cell field={ field } object={ field } is_a_key={ true }></json-tree-cell>
  <json-tree-cell if={ type !== 'object' } field={ field } object={ object }></json-tree-cell>
  <ul if={ type === 'object' && !hidden }>
    <li each={ v,k in object }>
      <json-tree field={ k } object={ v }></json-tree>
    </li>
  </ul> 

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
        self.object[data.key] = data.key
        self.update()
        self.parent.trigger("tree:change", { field: self.field, object: self.object, is_new: true })
      }
    })

    self.on("remove:child", function(data) {
      delete self.object[data.field]
      self.update()
      self.parent.trigger("tree:change", { field: self.field, object: self.object })
    })

    self.on('cell:change', function(data) {
      console.log("cell change: ",  self.field, self.object, data)
      self.cell_update(data)
      self.update()
      self.parent.trigger("tree:change", { field: self.field, object: self.object, field_was: data.field })
    })

    self.on('tree:change', function(data) {
      console.log("tree change: ", self.field, self.object, data)
      if(data.field_was) {
        delete self.object[data.field_was]
        self.object[data.field] = data.object
      }
      if(data.is_new) {
        self.object[data.field] = data.object
      }
      self.type = typeof(self.object)
      self.update()
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
</json-tree>
