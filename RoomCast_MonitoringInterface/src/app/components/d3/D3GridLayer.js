var d3 = require('d3');

var D3GridLayer = {};

/*D3GridLayer.grid = d3.layout.grid()
    .points()
    .size([window.innerWidth - 20,
        window.innerHeight - 20])
    .padding([0,0]);

 D3GridLayer.grid = d3.layout.grid()
 .nodeSize([D3GridLayer.radius*2,D3GridLayer.radius*2])
 .padding([20,20]);*/

D3GridLayer.create = function(node, props, state) {
    var svg = d3.select(node).append('svg')
        .attr('class', 'gridLayerSvg')
        .attr('width', props.width)
        .attr('height', props.height)
        .style('display', 'block')
        .style('margin', 'auto');

    svg.append('g')
        .attr('class', 'groups');

    this.update(node, props, state);

};

D3GridLayer.update = function(node, props, state) {

    var width = d3.select('.gridLayerSvg')[0][0].getBoundingClientRect().width;
    var height = d3.select('.gridLayerSvg')[0][0].getBoundingClientRect().height;

    D3GridLayer.grid = d3.layout.grid()
        .bands()
        .size([width, height])
        .padding([0.1,0.1]);

    this._draw(node, state.data);
};

D3GridLayer.destroy = function(node) {
    console.log('destroying ' + node);
};

D3GridLayer._draw = function(node, data) {
    /*
    var g = d3.selectAll('.groups')

    var group = g.selectAll('group')
        .data(data, function(gr) {
            return gr.name;
        });

    group.enter().append('circle')
        .attr('class', 'group');

    group
    */

    var g = d3.selectAll('.groups');
    var grid = D3GridLayer.grid;

    var group = g.selectAll('.group')
        .data(grid(data));

    D3GridLayer.radius = Math.min(D3GridLayer.grid.nodeSize()[0], D3GridLayer.grid.nodeSize()[1]) /2;

    // Create circle for each group
    group.enter().append('circle')
        .attr('class', 'group')
        .attr('r', D3GridLayer.radius - 5)
        .attr("transform", function(d) {
            return "translate(" + (d.x + grid.nodeSize()[0] / 2) + "," + (d.y + grid.nodeSize()[1] / 2) + ")";
        });

    // Create label for each group
    group.enter().append('text')
        .attr("transform", function(d) {
            return "translate(" + (d.x + grid.nodeSize()[0] / 2) + "," + (d.y + grid.nodeSize()[1] / 2) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d){return d.label});

    group.transition();

    group.exit().transition()
        .remove();




};

module.exports = D3GridLayer;