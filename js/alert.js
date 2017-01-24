(function($) {
  function Alert(opts) {
    var color = opts.color || "info";
    var css = opts.css || { "position": "absolute", 'z-index': 9999, 'right': '10px' };
    var parent = opts.parent || "#main"
    var classes = opts.classes || "";
    var title = opts.title || "";
    var body = opts.body || "";
    var html = opts.html || "";
    var timeout = opts.timeout || 3000;

    this.el = $(opts.el || "<span>");
    this.el.addClass("alert alert-dismissable fade in alert-"+color);

    $("<button type='button' class='close' data-dismiss='alert'>&times;</button>").appendTo(this.el)

    if(css) { this.el.css(css) }
    if(classes) { this.el.addClass(classes) }
    if(title) { $("<h4></h4>").text(title).appendTo(this.el) }
    if(body) { $("<p></p>").text(body).appendTo(this.el) }
    if(html) { $(html).appendTo(this.el) }

    this.el.insertBefore( $(parent) );

    if(timeout) {
      setTimeout(function() {
        this.el.remove();
      }, timeout)
    }

    return this.el;
  }

  window.Alert = Alert;
})($);
