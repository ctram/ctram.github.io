App.Views.Front = Backbone.CompositeView.extend({
  initialize: function () {

  },

  template: new EJS({url: 'assets/templates/front.ejs'}),

  events: {

  },

  render: function () {
    var content = this.template.render();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
