<text-areas>
  <div class="row">
    <div class="col-xs-12">
      <span onclick={ add } class="pull-right text-primary fa fa-plus-circle"></span>
      <div each={ text,index in value }>
        <text-input if={ parent.headings } value={ text.heading } attributes={ { placeholder: "heading..." }} onchange={ parent.onchange }></text-input>
        <text-area value={ text.content } attributes={ { placeholder: "content..." }} onchange={ parent.onchange }></text-area>
        <span onclick={ parent.remove } class="pull-right text-danger fa fa-remove"></span>
      </div>
    </div>
  </div>

  <script>
    var self = this

    self.record = opts.record
    self.field = opts.field
    self.value = opts.value || [{ heading: "", content: "" }]
    self.headings = opts.headings || false

    self.add = function() {
      self.value.push({ heading: "", content: "" })
      self.record[self.field] = self.value
      $(self.record).trigger('change')
    }

    self.onchange = function(e) {
      if(e.target.tagName === "INPUT") {
        self.value[e.item.index].heading = e.target.value
      } else if(e.target.tagName === "TEXTAREA") {
        self.value[e.item.index].content = e.target.value
      }
      self.record[self.field] = self.value
      $(self.record).trigger('change')
    }

    self.remove = function(e) {
      self.value.splice(e.item.index,1)
      self.record[self.field] = self.value
      $(self.record).trigger('change')
    }
  </script>
</text-areas>
