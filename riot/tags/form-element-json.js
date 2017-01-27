riot.tag('form-element', '<div></div>', function(opts) {
  var self = this;

  var build = function(options) {
    var el = null;

    if(options.element) {
      el = document.createElement(options.element);

      if(options.columns) {
        el.className = el.className + " col-xs-"+options.columns.toString();
      }

      if(options.attributes) {
        for(var name in options.attributes) {
          el.setAttribute(name, options.attributes[name]);
        }
      }

      if(options.innerHTML) {
        el.innerHTML = options.innerHTML;
      }

      if(options.innerText) {
        el.innerText = options.innerText;
      }

      if(options.children) {
        options.children.forEach(function(child) {
          var c = build(child)
          if(c) {
            el.appendChild(c);
          }
        })
      }
    }

    return el;
  }

  self.updateContent = function() {
    var el = build(opts.element);

    if(el) {
      if(self.root.childNodes.length) {
        self.root.replaceChild(el, self.root.childNodes[0]);
      } else {
        self.root.appendChild(el);
      }
    } else {
      console.warn("Empty element", el, opts)
    }
  };

  self.on('update', function() {
    self.updateContent();
  })

  self.updateContent();
});
