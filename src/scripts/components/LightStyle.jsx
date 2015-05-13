'use strict';

var StyleSheet = require('react-style');

var LightStyle = StyleSheet.create({

  outerLineStyle: {
    fill: 'transparent',
    stroke: '#999',
    strokeWidth: '1px'
  },

  innerLineStyle: {
    stroke: '#999',
    strokeWidth: '1px',
    transition: 'stroke 200ms ease'
  },

  dataAreaStyle: {
    fill: '#9cf'
  },

  dataPointStyle: {
    fill: '#f9c',
    transition: 'opacity 200ms ease'
  },

  labelNameStyle: {
    fill: '#999',
    textAnchor: 'middle',
    fontSize: '1.5em',
    transition: 'fill, font-size 200ms ease'
  },

  labelValueStyle: {
    fill: '#9cf',
    textAnchor: 'middle',
    fontSize: '1.6em',
    transition: 'fill, font-size 200ms ease'
  }

});

module.exports = LightStyle;
