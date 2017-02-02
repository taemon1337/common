<form-designer-components>
  <div class="row">
    <div class="pull-right">
      <select class="form-control" onchange={ add }>
        <option selected>--add component--</option>
        <option each={ name in available }>{ name.name }</option>
      </select>
    </div>
    <div data-is="riot-tag-table" title={ parent.form.name } headers={ headers } records={ parent.form.components } fetch={ fetch } record_buttons={ record_buttons }></div>

  <script>
    var getNames = function(section) {
      var ret = []
      if(section.name) {
        ret.push({ name: section.name })
      }
      if(section.children) {
        section.children.forEach(function(child) { ret = ret.concat(getNames(child)) })
      }
      return ret
    }

    var self = this
    self.names = opts.names || getNames(self.parent.form)

    self.available = opts.available || [
      {
        name: "text",
        field: "field.name",
        label: "Text Label",
        tag: { html: "<input class='form-control' type='text' placeholder='...'>" }
      },
      {
        name: "textarea",
        field: "field.name",
        label: "Paragraph",
        tag: { html: "<textarea class='form-control' rows='4' placeholder='...'></textarea>" }
      },
      {
        name: "multiselect-array",
        field: "items",
        tag: {
          name: "multiselect-array",
          options: {
            values: ["Item1","Item2","Item3"]
          }
        }
      }
    ]

    self.getSelectedOption = function(options, e) {
      var ret = null
      var selected = $(e.target).find(":selected").text().trim()
      options.forEach(function(c) {
        if(typeof c === 'string') {
          if(c == selected) { ret = c }
        } else if(c.name) {
          if(c.name == selected) { ret = c }
        } else {
          console.warn("Error getting selected option", options, selected)
        }
      })
      return ret
    }

    self.headers = opts.headers || [
      {
        field: "label",
        label: "Label",
        tag: {
          name: "text-input",
          options: {
            onchange: function(e,a) {
              console.log("CHANGED: ", a)
              a.record[a.field] = e.target.value
            }
          }
        }
      },
      {
        field: "field",
        label: "Field",
        tag: {
          name: "text-input",
          options: {
            onchange: function(e,a) {
              console.log("CHANGED: ", a)
              a.record[a.field] = e.target.value
            }
          }
        }
      },
      {
        field: "tag",
        label: "Preview"
      },
      {
        field: "layout",
        label: "Layout",
        tag: {
          name: "select-option",
          options: {
            records: self.names,
            selected: function(a) {
              a.record[a.field] = a.value
            },
            option_text: "name",
            option_value: "name"
          }
        }
      }
    ]

    self.record_buttons = opts.record_buttons || [
      { text: "Delete", fa: "trash", event: "component:delete" }
    ]

    self.fetch = function(cb) { cb(self.parent.form.components) }

    self.add = function(e) {
      var c = self.getSelectedOption(self.available,e)
      $(e.target).val('')
      var cmpt = $.extend({}, c, { layout: self.names[0] })
      console.log("adding: ", cmpt)
      self.parent.form.components.push(cmpt)
      self.parent.update()
    }

    self.on("component:delete", function(record, index) {
      console.log("removing...", index, self.parent.form.components[index])
      if(index) {
        self.parent.form.components.splice(index,1)
        self.parent.update()
      }
    })

    self.show = function(e) {
      e.preventDefault()
      self.update({ selected: e.item.component, editing: true })
    }

    self.changeLayout = function(e) {
      var component = e.item.component
      component.layout = self.getSelectedOption(self.names, e)
      self.parent.update()
    }

    self.showBorder = function(e) {
      $(e.target).css('border','1px solid red')
      $(e.target).find('.hoverable').show()
    }

    self.hideBorder = function(e) {
      $(e.target).css('border','')
      $(e.target).find('.hoverable').hide()
    }

    self.on('update', function() {
      self.names = getNames(self.parent.form)
    })
  </script>
</form-designer-components>
