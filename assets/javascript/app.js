window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new App.Routers.Router({
      $rootEl: $('#content'),
    });
    var navbarView = new App.Views.Navbar({
      router: router
    });
    $('#navbar').html(navbarView.render().$el);
    Backbone.history.start();
  }
};
