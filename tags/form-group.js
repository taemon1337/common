<form-group>
  <div class="form-group">
    <label class="control-label { columns.left || 'col-xs-3' }">{ label }</label>
    <div class="{ columns.center || 'col-xs-5' }">
      <yield />
    </div>
    <div class="help-block { columns.right || 'col-xs-4' }">{ help }</div>
  </div>

  <script>
    this.label = opts.label || ''
    this.help = opts.help || ''
    this.columns = opts.columns || { left: "col-xs-3", center: "col-xs-5", right: "col-xs-4" }
  </script>
</form-group>

