<form-designer-raw>
  <textarea onchange={ cache } class="form-control textbox" rows="12">{ JSON.stringify(parent.form,null,2) }</textarea>
  <button show={ cached } onclick={ saveCache } class="btn btn-primary">Save Raw Changes</button>
  <button show={ cached } onclick={ resetCache } class="btn btn-default">Discard Changes</button>

  <style>
    .textbox {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
  </style>

  <script>
    var self = this
    self.cached = opts.cached

    self.cache = function(e) {
      self.cached = e.target.value
    }

    self.resetCache = function() {
      self.cached = null
    }

    self.saveCache = function() {
      try {
        var parsed = JSON.parse(self.cached)
        self.parent.update({ form: parsed })
        self.resetCache()
      } catch(err) {
        Alert({ title: "Invalid JSON", body: err, status: "danger" })
      }
    }
  </script>
</form-designer-raw>
