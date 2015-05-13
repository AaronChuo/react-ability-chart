'use strict';

var EventMixin = {
  _hoverHandler: function() {
    this.setState({
      hovered: true
    });
  }
};

module.exports = EventMixin;
