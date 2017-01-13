<json-tree-cell>
  <span>
    <span if={ parent.type === 'object' } onclick={ parent.show } class="fa fa-{ parent.hidden ? 'caret-right' : 'caret-up' } pointer"></span>
    <span hide={ !editing }>
      <input class="input-sm" onfocusout={ change } type="text" name={ field } value={ object } style="width:{ (object.length*8) }px">
    </span>
    <span ondblclick={ edit } hide={ editing }>{ object }{ is_a_key ? ':' : '' }</span>
    <span onclick={ addChild } if={ parent.type === 'object' } style="cursor:pointer;" title="Add Element">+</span>

    <span onclick={ remove } class="x text-danger hidden pointer">&times;</span>
  </span>

  <style>
    .pointer {
      cursor: pointer;
    }
  </style>

  <script>
    var self = this
    self.field = opts.field
    self.object = opts.object
    self.is_a_key = opts.is_a_key || false
    self.editing = opts.editing || false

    self.edit = function() {
      self.update({ editing: !self.editing })
    }

    self.addChild = function(e) {
      var key = prompt('Field Name: ')
      if(key) {
        key = key.replace(/[ ]+/g,'-')
        self.parent.trigger("add:child", { field: self.field, key: key })
      }
    }

    self.change = function(e) {
      var val = e.target.value
      if(!self.is_a_key) { try { val = JSON.parse(val) } catch(err) {}}
      self.update({ object: val, editing: false })
      self.parent.trigger('cell:change', { field: self.field, object: val, is_a_key: self.is_a_key }) 
    }

    self.remove = function(e) {
      var a = confirm("Are you sure you want to remove " + self.field)
      if(a) {
        self.parent.parent.trigger("remove:child", { field: self.field })
      }
    }

    self.on('updated', function() {
      if(self.editing) {
        $(this.root).find('input').focus()
      }
    })

    self.on('mount', function() {
      if(self.is_a_key) {
        $(self.root.firstChild).hover(function() {
          $(self.root.firstChild).css('border','1px solid red')
          $(self.root.firstChild).find(".x").removeClass("hidden")
        }, function() {
          $(self.root.firstChild).css('border','none')
          $(self.root.firstChild).find(".x").addClass("hidden")
        })
      }
    })
  </script>
</json-tree-cell>
