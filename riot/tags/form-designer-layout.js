<form-designer-layout>
  <div class="row">
    <div class="col-xs-6">
      <h1>Define the layout</h1>
    </div>
    <div class="col-xs-6">
      <div class="pull-right btn-toolbar" style="margin-top:15px;">
        <div class="btn-group">
          <button onclick={ add } class="btn btn-sm btn-default" type="button">Add Section</button>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div each={ section,idx in parent.form.children }>
      <form-designer-section is_root={ true } section={ section } index={ idx }></form-designer-section>
    </div>
  </div>

  <style>
    .pointer { 
      cursor: pointer;
    }
  </style>

  <script>
    var self = this

    self.add = function() {
      var root = self.parent.form.children[0]
      root.children.push({ columns: 1, name: root.children.length+1, children: [] })
      self.parent.update()
    }
  </script>
</form-designer-layout>
