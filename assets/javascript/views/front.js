App.Views.Front = Backbone.CompositeView.extend({
  initialize: function () {

  },

  template: JST['front'],

  events: {

  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
