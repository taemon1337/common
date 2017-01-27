riot.tag('form-element', '<div></div>', function(opts) {
  var self = this;

  var hover = {
    on: function() { $(this).css('border','1px solid red') },
    off: function() { $(this).css('border','') },
    show: function() { $(this).find('.hover').show() },
    hide: function() { $(this).find('.hover').hide() }
  }

  var assignAttributes = function(el, o) {
    if(o.text) {
      $(el).text(o.text);
    }
    if(o.html) {
      $(el).html(o.html);
    }
    if(o.attributes) {
      for(var key in o.attributes) {
        $(el).attr(key, o.attributes[key]);
      }
    }
  }

  var build_input = function(o) {
    switch(o.type) {
      case "textarea":
        return $("<textarea class='form-control' rows='4'></textarea>");
      default:
        return $("<input type='text' class='form-control'>");
    }
  }

  var build_form_group = function(o) {
    var group = $("<div class='form-group'></div>");
    var wrap = $("<div class='col-xs-8'></div>");
    var label = $("<label class='control-label col-xs-4'></label>");
    label.text(o.label || o.text || o.name).appendTo(group);
    var input = build_input(o);
    assignAttributes(input[0], o)
    input.appendTo(wrap);
    wrap.appendTo(group);
    return group;
  }

  var build_children = function(o, root) {
    var div = $("<div></div>");
    (o.children || o.columns).forEach(function(column) {
      var child = build_element( column );
      if(root) {
        $(child).hover(hover.on, hover.off);
        $(child).on('click', function() { self.parent.parent.trigger('form-element:edit', o) });
      }
      $(div).append( child );
    });
    return div;
  }

  var build_columns = function(o) {
    var col = "col-xs-"+(12/o.columns.length).toString()
    return build_children(o).children().addClass(col);
  }

  var build_element = function(o, root) {
    switch(o.type) {
      case "input":
        return build_form_group(o);
      case "textarea":
        return build_form_group(o);
      case "columns":
        return build_columns(o);
      case "children":
        return build_children(o, root);
      default:
        var el = document.createElement(o.type);
        assignAttributes(el, o);
        return [el];
    }
  }

  self.build = function(o, root) {
    var el = build_element(o, root)[0];
    if(el) {
      if(self.root.childNodes.length) {
        self.root.replaceChild(el, self.root.childNodes[0]);
      } else {
        self.root.appendChild(el);
      }
    } else {
      console.warn("Empty element", el, opts)
    }
    return el;
  }

  self.on('edit', function() {
    
  })

  self.on('update', function() {
    self.build(opts, true);
  })

  self.build(opts, true);
});
