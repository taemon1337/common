<riot-tag-table>
  <table class="table">
    <thead>
      <tr>
        <th each={ hdr in headers }>{ hdr.label || hdr.field.toUpperCase() }</th>
        <th if={ records.length && record_buttons.length }></th>
      </tr>
    </thead>
    <tbody>
      <tr each={ record,i in records } data-index={ i }>
        <td each={ hdr in headers }>
          <form-component value={ record[hdr.field] } record={ record } field={ hdr.field } tag={ parent.findtag(record,hdr) }></form-component>
        </td>
        <td if={ records.length && record_buttons.length }>
          <record-buttons buttons={ parent.record_buttons } record={ record } onclick={ buttonClick }></record-buttons>
        </td>
      </tr>
    </tbody>
  </table>

  <script>
    var self = this

    self.headers = opts.headers || []
    self.records = opts.records || []
    self.record_buttons = opts.record_buttons || []

    self.findtag = function(record,header) {
      var f = header.field
      if(record[f] && record[f].tag) {
        return record[f].tag
      } else if(header.tag) {
        return header.tag
      } else if(record.tag) {
        return record.tag
      } else {
        console.warn("Could not find tag!", record, header)
      }
    }

    self.buttonClick = function(e) {
      e.preventDefault()
      var a = $(e.target).parent()
      var tr = $(e.target).parents('tr')
      self.parent.trigger(a.data('event'), e.item.record, tr.data('index'))
    }
  </script>
</riot-tag-table>
