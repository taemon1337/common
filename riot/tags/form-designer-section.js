<form-designer-section>
  <div class="col-xs-{ (12/(section.columns || 1)) }" style="border:1px solid red;min-height:25px;">
    <span class="pull-right">
      <div class="btn-toolbar">
        <div class="btn-group">
          <span onclick={ shrink } title="shrink width" class="fa fa-chevron-left"></span>
          <span onclick={ expand } title="expand width" class="fa fa-chevron-right"></span>
        </div>
        <div class="btn-group">
          <span onclick={ addChild } title="Add child section" class="fa fa-plus"></span>
          <span onclick={ edit } title="Edit section" class="fa fa-edit"></span>
          <span if={ !is_root } onclick={ remove } title="Remove section" class="fa fa-trash"></span>
        </div>
      </div>
    </span>
    <h1 class="text-center text-info">{ section.name }</h1>

    <div if={ section.children.length } style="padding:1px;">
      <form-designer-section each={ child,idx in section.children } section={ child } index={ idx }></form-designer-section>
    </div>
  </div>

  <style>
    .fa { cursor: pointer; }
  </style>

  <script>
    var self = this
    var columns = [1,2,3,4,6]

    self.is_root = opts.is_root || false
    self._index = opts.index || 0
    self.section = opts.section || {}

    self.addChild = function(e) { 
      self.section.children.push({ columns: 1, name: self.section.name+"."+(self.section.children.length+1), children: [] })
      self.update()
    }

    self.shrink = function(e) {
      var ci = columns.indexOf(self.section.columns)
      if(ci < columns.length-1) {
        self.section.columns = columns[ci+1]
      }
      self.update()
    }

    self.expand = function() {
      var ci = columns.indexOf(self.section.columns)
      if(ci > 0) {
        self.section.columns = columns[ci-1]
      }
      self.update()
    }

    self.edit = function() {
      var popup = Popup({
        body: "<input type='text' value='"+self.section.name+"'>"
      })
      popup.one('save', function(ee,input) {
        self.section.name = input.value
        self.update()
      })
    }

    self.remove = function(e) {
      var a = confirm("Are you sure you want to remove section " + self.section.name + "?")
      if(a) {
        self.parent.trigger("remove:child", self._index)
      }
    }

    self.on("remove:child", function(idx) {
      console.log("REMOVING CHILD: ", idx)
      self.section.children.splice(idx, 1)
      self.parent.update()
    })
  </script>
</form-designer-section>
