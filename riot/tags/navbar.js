<navbar>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">DFS</a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li each={ tab in tabs }>
            <a class="{ '#/'+tab.href === window.location.hash ? 'active' : '' }" href="#/{ tab.href }">{ tab.text }</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li data-is="bootswatch-selector"></li>
          <li if={ user }>
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <span class="fa fa-user"></span>
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li if={ logout }><a onclick={ logout } href="#">Sign Out</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <script>
    this.user = opts.user
    this.logout = opts.logout
    this.tabs = typeof opts.tabs === 'object' ? opts.tabs : opts.tabs.split(',').map(function(t) { return { text: t.charAt(0).toUpperCase()+t.slice(1), href: t }});
  </script>
</navbar>
