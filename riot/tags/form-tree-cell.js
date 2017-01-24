<form-tree-cell>
  <span class="control-label">
    <span if={ parent.type === 'object' } onclick={ parent.show } class="fa fa-{ parent.hidden ? 'caret-right' : 'caret-up' } pointer"></span>

    <span class="wrapper">
      <span onclick={ addChild } class="hover hidden text-success" if={ parent.type === 'object' } style="cursor:pointer;" title="Add Child">+</span>
      <b show={ is_a_key && !editing } ondblclick={ edit }>{ object }:</b>

      <span show={ editing || !is_a_key }>
        <input class="form-control input-sm" onfocusout={ change } type="text" name={ field } value={ object }>
      </span>
      <span onclick={ remove } title="Remove" class="hover text-danger hidden pointer">&times;</span>
    </span>

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
        self.parent.trigger("remove:child", { field: self.field })
      }
    }

    self.on('updated', function() {
      if(self.editing) {
        $(this.root).find('input').focus()
      }
    })

    self.on('mount', function() {
      if(self.is_a_key) {
        var el = $(this.root).find(".wrapper")
        $(el).hover(function() {
          $(el).css('border','1px solid red')
          $(el).find(".hover").removeClass("hidden")
        }, function() {
          $(el).css('border','none')
          $(el).find(".hover").addClass("hidden")
        })
      }
    })
  </script>
</form-tree-cell>
