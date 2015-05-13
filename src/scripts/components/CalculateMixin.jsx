'use strict';

var CalculateMixin = {
  scalePosition: function(base, center, scale) {
    return {
      x: center.x + base.x * (scale || 1),
      y: center.y + base.y * (scale || 1)
    };
  },

  setRange: function(value, min, max) {
    if(value > max) {
      value = max;
    } else if(value < min) {
      value = min;
    }
    return value;
  },

  getPointByProportion: function(percent, totalLength, beginPoint, endPoint) {
    var r = totalLength * percent,
        s = totalLength - r;
    return {
      x: (r * endPoint.x + s * beginPoint.x) / totalLength,
      y: (r * endPoint.y + s * beginPoint.y) / totalLength
    };
  }
};

module.exports = CalculateMixin;
