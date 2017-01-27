<form-element>
  <div if={ ["columns","children","input","textarea"].indexOf(opts.type) === -1 } class="col-xs-12">
    <span class="content"></span>
  </div>

  <div if={ ["input","textarea"].indexOf(opts.type) !== -1 } class="form-group">
    <label class='control-label col-xs-4'>{ opts.label || opts.text || opts.name }</label>
    <div class="content col-xs-8"></div>
  </div>

  <div if={ children.length } class="row">
    <div each={ child in children }>
      <form-element type={ child.type } text={ child.text } label={ child.label } children={ child.children } columns={ child.columns }></form-element>
    </div>
  </div>

  <div if={ columns.length } class="row">
    <div each={ child in columns } class="col-xs-{ cols }">
      <form-element type={ child.type } text={ child.text } label={ child.label } children={ child.children } columns={ child.columns } attributes={ child.attributes }></form-element>
    </div>
  </div>

  <script>
    var self = this
    self.children = opts.children || []
    self.columns = opts.columns || []
    self.cols = 12/self.columns.length
    self.html = opts.html || ''

    var buildInput = function(o) {
      switch(o.type) {
        case "textarea":
          return $("<textarea class='form-control' rows='4'></textarea>")
        default:
          return $("<input type='text' class='form-control'>")
      }
    }

    var assignAttributes = function(el, o) {
      if(o.text) {
        $(el).text(o.text)
      }
      if(o.html) {
        $(el).html(o.html)
      }
      if(o.attributes) {
        for(var key in o.attributes) {
          $(el).attr(key, o.attributes[key])
        }
      }
      return $(el)
    }

    var buildElement = function(o) {
      switch(o.type) {
        case "children":
          return ""
        case "columns":
          return ""
        case "input":
          return assignAttributes(buildInput(o),o)
        case "textarea":
          return assignAttributes(buildInput(o),o)
        default:
          return assignAttributes(document.createElement(o.type),o)
      }
    }

    self.updateContent = function() {
      var el = buildElement(opts)
      if(el) {
        var cnt = $(this.root).find('.content')
        console.log("EL: ", el, cnt)
        cnt.html( $(el))
      }
    }

    self.on('update', function() { self.updateContent() })
    self.on('mount', function() { self.updateContent() })
  </script>
</form-element>
