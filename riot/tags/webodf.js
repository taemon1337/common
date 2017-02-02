<webodf>
  <div id="{ id }" style="width:100%;height:100%;margin:0px;padding:0px;"></div>

  <script>
    var self = this
    self.id = opts.id || "editor-"+Math.random().toString().replace(".","")
    self.file = opts.file
    self.editor = opts.editor || null

    self.on('mount', function() {
      Wodo.createTextEditor(self.id, {
        allFeaturesEnabled: true,
        userData: {}
      }, function(err, editor) {
        if(err) {
          console.warn("Error Creating Text Editor: ", err)
        } else {
          self.editor = editor
          self.editor.openDocumentFromUrl(self.file.file, function(err) {
            if(err) {
              console.log("Error opening document from url " + self.file.file, err)
            } else {
              window.editor = self.editor
              Alert({
                title: "Success! Loaded "+self.file.name,
                color: "success",
                classes: "col-xs-3"
              })
            }
          })
        }
      })
    })
  </script>
</webodf>
