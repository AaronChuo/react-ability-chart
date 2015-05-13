'use strict';

var React = require('react');
var d3 = require('d3');
//var Alert = require('components/Alert');
var CalculateMixin = require('./CalculateMixin.jsx');
var EventMixin = require('./EventMixin.jsx');
var DefaultStyle = require('./DefaultStyle.jsx');
var LightStyle = require('./FantasyStyle.jsx');
var FantasyStyle = require('./FantasyStyle.jsx');

var AbilityChart = React.createClass({

  displayName: 'AbilityChart',

  mixins: [
    CalculateMixin,
    EventMixin
  ],

  propTypes: {
    //settings
    title: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    dy: React.PropTypes.number,
    data: React.PropTypes.array.isRequired,
    maxValue: React.PropTypes.number.isRequired,
    showDataPoint: React.PropTypes.oneOf(['always', 'hover', 'none']),
    showNameLabel: React.PropTypes.bool,
    showValueLabel: React.PropTypes.bool,
    
    //styles
    colorTheme: React.PropTypes.oneOf(['default', 'light', 'fantasy']),
    outerLineColor: React.PropTypes.string,
    innerLineColor: React.PropTypes.string,
    dataAreaColor: React.PropTypes.string,
    dataPointColor: React.PropTypes.shape({
      default: React.PropTypes.string,
      hover: React.PropTypes.string
    }),
    labelNameColor: React.PropTypes.shape({
      default: React.PropTypes.string,
      hover: React.PropTypes.string
    }),
    labelValueColor: React.PropTypes.shape({
      default: React.PropTypes.string,
      hover: React.PropTypes.string
    }),

    //animate
    animated: React.PropTypes.bool,
    outerLineAnimate: React.PropTypes.func,
    innerLineAnimate: React.PropTypes.func,
    dataAreaAnimate: React.PropTypes.func,
    dataPointAnimate: React.PropTypes.func,
    labelNameAnimate: React.PropTypes.func,
    labelValueAnimate: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      width: 300,
      height: 300,
      dy: 11,
      circleRadius: 3,
      showDataPoint: 'hover',
      showNameLabel: true,
      showValueLabel: true,
      colorTheme: 'default',
      animated: true
    };
  },

  _calcPoints: function(radius, center) {
    var angle, percent, r, s, currentValue,
        base = {},
        vertex = {},
        label = {},
        valueLabel = {},
        dataPoint = {};
    
    for(var i = 0; i < this.props.data.length; i++) {
        angle = (2 * Math.PI / this.props.data.length * i) + (-Math.PI / 2);
        base.x = radius * Math.cos(angle);
        base.y = radius * Math.sin(angle);
        
        // calculate vertex
        vertex = this.scalePosition(base, center, 1);
        //vertex.y = base.y + this.center.y;
        
        // calculate position of name label
        label = this.scalePosition(base, center, 1.4);
        //label.x = base.x * 1.4 + this.center.x;
        //label.y = base.y * 1.4 + this.center.y;
        
        // calculate position of value label
        valueLabel = this.scalePosition(base, center, 1.12);
        //valueLabel.x = base.x * 1.12 + this.center.x;
        //valueLabel.y = base.y * 1.12 + this.center.y;
        
        // value validation (0 <= value <= maxValue)
        currentValue = this.setRange(this.props.data[i].value, 0, this.props.maxValue);
        // if(currentValue > this.props.maxValue) {
        //   currentValue = this.props.maxValue;
        // } else if(currentValue < 0) {
        //   currentValue = 0;
        // }

        // calculate data point
        percent = currentValue / this.props.maxValue;
        dataPoint = this.getPointByProportion(percent, radius, center, vertex);
        // r = this.radius * percent,
        // s = this.radius - r;
        // dataPoint.x = (r * vertex.x + s * this.center.x) / this.radius;
        // dataPoint.y = (r * vertex.y + s * this.center.y) / this.radius;
        
        // append calculated points to data
        this.props.data[i].vertex = {x: vertex.x, y: vertex.y};
        this.props.data[i].label = {x: label.x, y: label.y};
        this.props.data[i].valueLabel = {x: valueLabel.x, y: valueLabel.y};
        this.props.data[i].dataPoint = {x: dataPoint.x, y: dataPoint.y};
    }
  },

  _getOuterLinePath: function(vertexes) {
    var path;     
    for(var i = 0; i < vertexes.length; i++) {
        if(i === 0) {
            path = 'M ';
        } else {
            path += ' L ';
        }
        path += vertexes.x + ' ' + vertexes.y;
    }
    path += ' Z';

    return path;
  },

  _getDataAreaPath: function(dataPoints) {
    var path;
    for(var i = 0; i < dataPoints.length; i++) {
        if(i === 0) {
            path = 'M ';
        } else {
            path += ' L ';
        }
        path += dataPoints[i].x + ' ' + dataPoints[i].y;
    }
    path += ' Z';
    
    return path;
  },

  _setColorTheme: function(themeName) {
    var style;
    switch(themeName) {
      default:
      case 'default':
        style = DefaultStyle;
        break;
      case 'light':
        style = LightStyle;
        break;
      case 'fantasy':
        style = FantasyStyle;
        break;
    }
    return style;
  },

  _setStyle: function() {

  },

  _styleChart: function() {

  },

  render: function() {
    var groupNodes = [],
        radius = Math.min(this.props.width, this.props.height) / 4,
        center = {
          x: this.props.width / 2,
          y: this.props.height / 2
        };

    var style = this._setColorTheme(this.props.colorTheme);

    this._calcPoints(radius, center);

    if(this.props.data.length < 3) {
      // return (
      //   <Alert width={this.props.width}
      //          height={this.props.height}
      //          text="This chart need at least 3 data" />
      // );
    } else {
      var vertexes = [],
          dataPoints = [];

      var dataPointNode,
          nameLabelNode,
          valueLabelNode;

      groupNodes = this.props.data.map( (d, i) => {

        vertexes.push(d.vertex);
        dataPoints.push(d.dataPoint);

        //
        if(this.props.showDataPoint !== 'none') {
          dataPointNode = <circle className="data-point"
                                  cx={d.dataPoint.x}
                                  cy={d.dataPoint.y}
                                  r={this.props.circleRadius}
                                  style={style.dataPointStyle}>
                          </circle>;
        }

        //
        if(this.props.showNameLabel) {
          nameLabelNode = <text className="name-label"
                                transform={"translate(" + d.label.x + "," + d.label.y + ")"}
                                dy={this.props.dy}
                                style={style.nameLabelStyle}>
                            {d.name}
                          </text>;
        }

        //
        if(this.props.showValueLabel) {
          valueLabelNode = <text className="value-label"
                                 transform={"translate(" + d.valueLabel.x + "," + d.valueLabel.y + ")"}
                                 dy={this.props.dy}>
                           </text>;
        }

        return (
          <g key={i} onMouseOver={this._hoverHandler}>
            <line className="inner-line"
                  x1={center.x}
                  y1={center.y}
                  x2={d.vertex.x}
                  y2={d.vertex.y}
                  style={style.innerLineStyle}>
            </line>
            {dataPointNode}
            {nameLabelNode}
            {valueLabelNode}
          </g>
        );
      });

      return (
        <div className="ability-chart">
          <svg width={this.props.width} height={this.props.height}>
            <g>
              <text>{this.props.title}</text>
              <path className="outer-line" 
                    d={this._getOuterLinePath(vertexes)}></path>
              <path className="data-area" 
                    d={this._getDataAreaPath(dataPoints)}></path>
              {groupNodes}
            </g>
          </svg>
        </div>
      );
    }
  }

});

module.exports = AbilityChart;
