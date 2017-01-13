<bootswatch-selector>
  <a class="dropdown-toggle" href="#" data-toggle="dropdown">
    <span class="glyphicon glyphicon-cog"></span>
    <span class="caret"></span>
  </a>
  <ul class="dropdown-menu">
    <li each={ theme in themes }>
      <a onclick={ setTheme } class={ theme === $.bootswatch.theme ? "bg-primary" : "" } href="/set/theme/{ theme }">{ theme }</a>
    </li>
  </ul>

  <script>
    this.themes = opts.themes || $.bootswatch.themes

    this.setTheme = function(e) {
      e.preventDefault()
      $.bootswatch.setTheme(e.item.theme)
    }
  </script>
</bootswatch-selector>
