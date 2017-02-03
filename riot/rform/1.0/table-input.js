<table-input>
  <table class="table table-striped table-condensed">
    <thead>
      <tr>
        <th each={ header,index in headers }>
          <span title="Remove Column" onclick={ delColumn } class="fa fa-remove text-danger pull-right"></span>
          <span onfocusout={ changed } class="editable" id={ header.field } contenteditable>{ header.field }</span>
        </th>
        <th></th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td colspan={ headers.length }>
          <span title="Add Row" onclick={ addRow } class="fa fa-plus pointer"></span>
          <span title="Add Column" onclick={ addColumn } class="fa fa-columns pointer"></span>
        </td>
      </tr>
    </tfoot>
    <tbody>
      <tr each={ record,index in value }>
        <td each={ hdr in headers }>
          <span data-index={ index } onfocusout={ changed } class="editable" contenteditable>{ record[hdr.field] }</span>
        </td>
        <td>
          <span title="Remove row" onclick={ delRow } class="fa fa-remove text-danger"></span>
        </td>
      </tr>
    </tbody>
  </table>

  <style>
    .editable {
      font-size:10px;
      width:100%;
      display:block;
    }
    .pointer {
      cursor: pointer;
    }
  </style>

  <script>
    var self = this
    var parse = function(o) {
      if(o.value) {
        return o.value
      } else if(o.record && o.field) {
        return o.record[o.field] || []
      } else {
        return []
      }
    }

    self.record = opts.record
    self.field = opts.field
    self.value = opts.parse ? opts.parse(opts) : parse(opts)

    self.headers = opts.headers || []

    self.changed = function(e) {
      if(e.item.header) {
        var old = e.item.header.field
        e.item.header.field = e.target.innerText
        if(e.item.header.field !== old) {
          self.value.forEach(function(record) {
            record[e.target.innerText] = record[old]
            delete record[old]
          })
        }
      } else if(e.item.hdr) {
        var record = self.value[parseInt(e.target.getAttribute('data-index'))]
        record[e.item.hdr.field] = e.target.innerText
      } else {
        console.warn("Could not update cell: ", e.item)
      }
      self.record[self.field] = self.value
      $(self.record).trigger('change')
    }

    self.delRow = function(e) {
      self.value.splice(e.item.index,1)
      self.record[self.field] = self.value
      $(self.record).trigger('change')
    }

    self.delColumn = function(e) {
      self.headers.splice(e.item.index,1)
      self.value.forEach(function(val) {
        delete val[e.item.header.field]
      })
      self.record[self.field] = self.value
      $(self.record).trigger('change')
    }

    self.addRow = function() {
      var row = {}
      self.headers.forEach(function(hdr,col) {
        row[hdr.field] = hdr.default || ["value",self.value.length,col].join('-')
      })
      self.value.push(row)
      self.record[self.field] = self.value
      self.update()
      $(self.record).trigger('change')
    }

    self.addColumn = function() {
      var len = self.headers.length
      var h = self.headers[0] || { field: "header" }
      var hdr = $.extend({}, h, { field: h.field+len })
      self.headers.push(hdr)
      self.value.forEach(function(val) {
        val[hdr.field] = hdr.default || "value-"+len
      })
      self.record[self.field] = self.value
      self.update()
      $(self.record).trigger('change')
    }
  </script>
</table-input>
