<form-designer>
  <ul class="nav nav-tabs" role="tablist">
    <li each={ tab in tabs }><a onclick={ activate } href="#{ tab }">{ tab.charAt(0).toUpperCase()+tab.slice(1) }</a></li>
  </ul>

  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active">
      <form-designer-layout if={ active === 'layout' }></form-designer-layout>
      <form-designer-components if={ active === 'components' }></form-designer-components>
      <div if={ active === 'preview' } class="row">
        <div class="col-xs-9">
          <form class="form-horizontal">
            <form-designer-show each={ child in form.children } is_root={ true } form_title={ parent.form.name } section={ child } components={ parent.form.components }></form-designer-show>
          </form>
        </div>
        <div class="col-xs-3">
          Record:
          <pre>{ JSON.stringify(record,null,2) }</pre>
        </div>
      </div>
      <form-designer-raw if={ active === 'raw' }></form-designer-raw>
    </div>
  </div>

  <style>
    .pointer {
      cursor:pointer;
    }
  </style>

  <script>
    var self = this
    self.tabs = ["layout","components","preview","raw"]
    self.active = opts.active || "layout"
    self.form = opts.form
    self.record = opts.record || {}

    self.activate = function(e) {
      e.preventDefault()
      $(e.target).parent().siblings("li").removeClass("active")
      $(e.target).parent().addClass("active")
      self.update({ active: $(e.target).attr('href').replace('#','') })
    }

    self.add = function(e) {
      self.form.push(e.item.component)
      self.update()
    }

    self.on('update', function() {
      self.parent.form.form = self.form
    })

    $(self.record).on('change', function() {
      self.update()
    })
  </script>
</form-designer>
