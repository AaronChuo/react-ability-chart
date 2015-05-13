'use strict';
/* global describe, it, jest, expect */

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../src/scripts/components/AbilityChart.jsx');

describe('ability chart', function() {

  var AbilityChart = require('../src/scripts/components/AbilityChart.jsx');
  var data = [
    {name: 'A', value: 7},
    {name: 'B', value: 5},
    {name: 'C', value: 3},
    {name: 'D', value: 9}
  ];
  var width = 500,
      height = 500;
  var chart = TestUtils.renderIntoDocument(
    <AbilityChart data={data} width={width} height={height} maxValue={10} />
  );

  it('should have a svg element', function() {
    var svg = TestUtils.scryRenderedDOMComponentsWithTag(chart, 'svg');
    expect(svg.length).toEqual(1);
  });

  describe('data translate', function() {

    var transData = chart.props.data[0];

    it('should add vertex into data', function() {
      expect(transData.vertex).toBeDefined();
      expect(typeof transData.vertex.x).toBe('number');
      expect(typeof transData.vertex.y).toBe('number');
    });

    it('should add data-point into data', function() {
      expect(transData.dataPoint).toBeDefined();
      expect(typeof transData.dataPoint.x).toBe('number');
      expect(typeof transData.dataPoint.y).toBe('number');
    });

    it('should add label position into data', function() {
      expect(transData.label).toBeDefined();
      expect(typeof transData.label.x).toBe('number');
      expect(typeof transData.label.y).toBe('number');
      expect(transData.valueLabel).toBeDefined();
      expect(typeof transData.valueLabel.x).toBe('number');
      expect(typeof transData.valueLabel.y).toBe('number');
    });

  });

  describe('chart render', function() {

    it('should have an outer line', function() {
      var outerLine = TestUtils.scryRenderedDOMComponentsWithClass(chart, 'outer-line');
      expect(outerLine.length).toEqual(1);
    });

    it('should have inner lines', function() {
      var innerLines = TestUtils.scryRenderedDOMComponentsWithClass(chart, 'inner-line');
      expect(innerLines.length).toEqual(data.length);
    });

    it('should have circles', function() {
      var circles = TestUtils.scryRenderedDOMComponentsWithClass(chart, 'data-point');
      expect(circles.length).toEqual(data.length);
    });

    it('should have labels', function() {
      var nameLabels = TestUtils.scryRenderedDOMComponentsWithClass(chart, 'name-label');
      var valueLabels = TestUtils.scryRenderedDOMComponentsWithClass(chart, 'value-label');
      expect(nameLabels.length).toEqual(data.length);
      expect(valueLabels.length).toEqual(data.length);
    });

    it('should have a data-area', function() {
      var dataArea = TestUtils.scryRenderedDOMComponentsWithClass(chart, 'data-area');
      expect(dataArea.length).toEqual(1);
    });

  });

  describe('when given amount of data is less than 3', function() {

    var data = [
      {name: 'A', value: 9},
      {name: 'B', value: 6}
    ];
    var chart = TestUtils.renderIntoDocument(
      <AbilityChart data={data} width={width} height={height} maxValue={10} />
    );

    it('should render Alert component', function() {
      var alert = TestUtils.scryRenderedDOMComponentsWithTag(chart, 'Alert');
      expect(alert.length).toEqual(1);
    });

  });

});
