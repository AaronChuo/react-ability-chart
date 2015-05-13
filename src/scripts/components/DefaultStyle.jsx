'use strict';

var StyleSheet = require('react-style');

var DefaultStyle = StyleSheet.create({

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

  nameLabelStyle: {
    fill: '#999',
    textAnchor: 'middle',
    fontSize: '1.5em',
    transition: 'fill, font-size 200ms ease'
  },

  valueLabelStyle: {
    fill: '#9cf',
    textAnchor: 'middle',
    fontSize: '1.6em',
    transition: 'fill, font-size 200ms ease'
  }

});

module.exports = DefaultStyle;
