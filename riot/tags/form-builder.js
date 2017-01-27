<form-builder>
  <div class="btn-toolbar">
    <div class="btn-group">
      <button title="Add form group" type="button" class="btn btn-default">
        <span class="fa fa-plus"></span>
      </button>
    </div>
  </div>

  <div class="form-horizontal">
    <form-element type="children" children={ form }></form-element>
  </div>

  <script>
    var self = this
    var example_form = [
      {
        type: "children",
        children: [
          {
            type: "h1",
            text: "Example Form"
          }
        ]
      },
      {
        type: "columns",
        columns: [
          {
            type: "input",
            label: "Case Title",
            name: "case.title",
            attributes: {
              placeholder: "case title..."
            },
          },
          {
            type: "input",
            label: "Case Number",
            name: "case.number",
            attributes: {
              placeholder: "case number..."
            },
          }
        ]
      },
      {
        type: "columns",
        columns: [
          {
            type: "input",
            label: "DFS Agent",
            name: "examiner.name",
            attributes: {
              placeholder: "name..."
            },
          },
          {
            type: "input",
            label: "Case Agent",
            name: "case.agent",
            attributes: {
              placeholder: "case agent..."
            },
          }
        ]
      }
    ]

    self.form = opts.form || example_form
    self.fields = opts.fields || {}
  </script>
</form-builder>
