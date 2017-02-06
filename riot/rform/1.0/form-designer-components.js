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
        name: "text-input",
        field: "field.name",
        label: "Text Label",
        tag: {
          name: "text-input",
          options: {
            attributes: {
              placeholder: "..."
            }
          }
        }
      },
      {
        name: "text-area",
        field: "field.name",
        label: "Paragraph",
        tag: {
          name: "text-area",
          options: {
            attributes: {
              placeholder: "..."
            }
          }
        }
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
      },
      {
        name: "table-input",
        field: "items",
        cols: {
          left: 3,
          center: 9,
          right: "0 hidden"
        },
        tag: {
          name: "table-input",
          options: {
            headers: [
              {
                field: "title",
                label: "Title",
                tag: {
                  name: "text-input",
                  options: {}
                }
              },
              {
                field: "desc",
                label: "Description",
                tag: {
                  name: "text-input",
                  options: {}
                }
              }
            ]
          }
        }
      },
      {
        name: "text-areas",
        field: "paragraphs",
        label: "Paragraphs",
        tag: {
          name: "text-areas",
          options: {
            cols: { left: 2, center: 10, right: "0 hidden" }
          }
        }
      },
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
              a.record[a.field] = e.target.value
            }
          }
        }
      },
      {
        field: "tag",
        label: "Preview",
        tag: {
          name: "select-option",
          options: {
            records: self.available,
            option_text: "name",
            option_value: "name",
            parse: function(o) {
              return o.record && o.field ? o.record[o.field].name : ""
            },
            selected: function(a) {
              self.available.forEach(function(cmpt) {
                if(cmpt.name === a.value) {
                  a.record[a.field] = cmpt.tag
                }
              })
            }
          }
        }
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
      { text: "Edit", fa: "pencil", event: "component:edit" },
      { text: "Delete", fa: "trash", event: "component:delete" }
    ]

    self.fetch = function(cb) { cb(self.parent.form.components) }

    self.add = function(e) {
      var c = self.getSelectedOption(self.available,e)
      $(e.target).val('')
      var cmpt = $.extend({}, c, { layout: self.names[0] })
      self.parent.form.components.push(cmpt)
      self.parent.update()
    }

    self.on("component:delete", function(record, index) {
      self.parent.form.components.splice(index,1)
      self.parent.update()
    })

    self.on('component:edit', function(record, index) {
      var popup = Popup({
        title: "Edit Component",
        rows: 10,
        content: JSON.stringify(record.tag,null,2)
      })

      $(popup).on('save', function(e,body) {
        try {
          var tmp = JSON.parse( body.value )
          if(tmp) {
            record.tag = tmp
            self.update()
          }
        } catch(err) {
          Alert({ status: "danger", title: "Invalid JSON", body: err })
          self.trigger('component:edit', record, index)
        }
      })
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
