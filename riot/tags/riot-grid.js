<riot-grid>
  <h3 if={ title }>{ title }</h3>

  <div class="row">
    <div each={ record in records } class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <div class="panel panel-default">
        <div class="panel-heading">
          <div class="pull-right">
            <record-buttons buttons={ parent.record_buttons } record={ record }></record-buttons>
          </div>
          <h3 class="panel-title">
            <a href="#">{ record.title || record.name || record._id }</a>
          </h3>
        </div>
        <div class="panel-body">
          { record.description }
        </div>
      </div>
    </div>
  </div>

  <style>
    .glyphicon {
      cursor: pointer;
    }
  </style>

  <script>
    var self = this
    this.records = opts.records || []
    this.record_buttons = opts.record_buttons || []
    this.fetch = opts.fetch || function(cb) { cb([]) }

    this.reload = function() {
      if(self.fetch) {
        var icon = $(this.root).find(".fa-refresh")
        $(icon).removeClass("fa-refresh").addClass("fa-spinner fa-spin");
        self.fetch(function(records) {
          self.update({ records: records })
          $(icon).removeClass("fa-spinner fa-spin").addClass("fa-refresh");
        })
      }
    }

    this.on('mount', function() {
      this.reload()
    })
  </script>
</riot-grid>
