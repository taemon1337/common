(function ($) {
	'use strict';

  var Bootswatch = function(opts) {
    opts = opts || {};
    if(!(this instanceof Bootswatch)) {
      return new Bootswatch(opts);
    }

    this.base = opts.base || "css/bootswatch/";
    this.filename = opts.filename || "/bootstrap.min.css";
    this.theme = opts.theme || null;
    this.link = opts.link || null;
    this.themes = opts.themes || ["cerulean","cosmo","cyborg","darkly","flatly","journal","lumen","paper","readable","sandstone","simplex","slate","spacelab","superhero","united","yeti"];
  }

  Bootswatch.prototype = {
    start: function(name) {
      this.theme = name || this.getRandomTheme();
      var lnk = this.makeLink(this.theme);
      document.getElementsByTagName("head")[0].appendChild(lnk);
      this.link = lnk;
    },
    setTheme: function(name) {
      try {
        var lnk = this.makeLink(name);
        document.getElementsByTagName("head")[0].insertBefore(lnk, this.link);
        this.link.disabled = true; // must disabled old theme
        this.link = lnk;
        this.theme = name
        sessionStorage.setItem("bootswatch-theme", name)
      } catch(err) {
        console.warn("ERROR", err);
      }
    },
    makeLink: function(name) {
      var l = document.createElement("link");
      l.setAttribute("rel","stylesheet");
      l.setAttribute("type","text/css");
      l.setAttribute("href",this.base+name+this.filename);
      return l;
    },
    getRandomTheme: function() {
      return this.themes[Math.floor(Math.random()*this.themes.length)];
    }
  };

  $.Bootswatch = Bootswatch;
  $.bootswatch = $.Bootswatch({ base: "/common/css/bootswatch/" });
  $.bootswatch.start(sessionStorage.getItem("bootswatch-theme"));
})($);
