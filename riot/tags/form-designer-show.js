<form-designer-show>
  <div>
    <h1 if={ opts.form_title }>{ opts.form_title }</h1>
    <div if={ is_row } class="row">
      <div class="col-xs-12" style="background-color:#bdc3c7;">
        <h6 class="text-center">{ section.name }</h6>
      </div>
    </div>
    <div each={ child in section.children }>
      <div class="col-xs-{ (12/(child.columns || 1)) }">
        <div each={ component in getComponents(child.name) } class="form-group">
          <form-component record={ record } field={ component.field } columns="3" tag={{ label: component.label, editable: false }}></form-component>
          <form-component record={ record } field={ component.field } columns="6" tag={ component.tag }></form-component>
          <form-component record={ record } field={ component.field } columns="3" tag={{ html: component.help || "" }}></form-component>
        </div>
      </div>
      <form-designer-show record={ record } is_row={ parent.is_root } section={ child }></form-designer-show-section>
    </div>
  </div>

  <script>
    var self = this

    self.record = opts.record || self.parent.record
    self.is_root = opts.is_root
    self.is_row = opts.is_row
    self.section = opts.section
    self.components = opts.components || self.parent.components

    self.getComponents = function(name) {
      return self.components.filter(function(cmpt) { return cmpt.layout === name })
    }
  </script>
</form-designer-show>
