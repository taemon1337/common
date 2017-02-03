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
          <span if={ info } onclick={ showInfo } class="pull-right fa fa-info-circle"></span>
          <form-component title={ component.field } record={ record } field={ component.field } columns={ cols(component,record,'left') || 3 } tag={{ label: component.label, editable: false }}></form-component>
          <form-component record={ record } field={ component.field } columns={ cols(component,record,'center') || 6 } tag={ component.tag }></form-component>
          <form-component record={ record } field={ component.field } columns={ cols(component,record,'right') || 3 } tag={{ html: component.help || "" }}></form-component>
        </div>
      </div>
      <form-designer-show info={ info } record={ record } is_row={ parent.is_root } section={ child }></form-designer-show-section>
    </div>
  </div>

  <script>
    var self = this

    self.record = opts.record || self.parent.record
    self.is_root = opts.is_root
    self.is_row = opts.is_row
    self.section = opts.section
    self.components = opts.components || self.parent.components
    self.info = opts.info || false

    self.getComponents = function(name) {
      return self.components.filter(function(cmpt) { return cmpt.layout === name })
    }

    self.cols = function(cmpt,rec,pos) {
      if(rec.tag && rec.tag.options && rec.tag.options.cols) {
        return rec.tag.options.cols[pos]
      } else if(cmpt.tag && cmpt.tag.options && cmpt.tag.options.cols) {
        return cmpt.tag.options.cols[pos]
      }
    }

    self.showInfo = function(e) {
      Popup({ title: e.item.component.name, body: "<pre>"+JSON.stringify(e.item.component,null,2)+"</pre>" })
    }
  </script>
</form-designer-show>
