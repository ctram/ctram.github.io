App.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'front'
  },

  front: function () {
    var frontView = new App.Views.Front();
    this._swapView(frontView);
  },


  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;

    this.$rootEl.html(view.render().$el);
  }
});
