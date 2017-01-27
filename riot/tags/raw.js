<raw>
  <span></span>

  <script>
    this.updateContent = function() {
      var formatter = opts.formatter || function(content) { return content; };
        
      if(opts.template) {
        this.root.innerHTML = formatter(opts.template.replace(/\$content/g, opts.content));
      } else if(opts.content_type === "list" || opts.content_type === "dict") {
        this.root.innerHTML = formatter(JSON.stringify(opts.content));
      } else {
        this.root.innerHTML = formatter(opts.content);
      }
    }
    this.on('update', function() {
      this.updateContent()
    })

    this.updateContent()
  </script>
</raw>
