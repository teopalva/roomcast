var React = require('react');
var Mui = require('material-ui');
var d3 = require('d3');
var GridLayer = require('./GridLayer');

/**
 * @prop groups
 * @prop playing
 */
var D3canvas = React.createClass({

    componentDidMount: function() {
        var self=this;



    },

    getInitialState: function() {
        return {

        };
    },

    render: function() {

        var svg = d3.select('body').append('svg');

        /*
        var _groups = [];

        */

        var data = [];
        for(var g in this.props.groups) {
            if(this.props.groups.hasOwnProperty(g)) {
                data.push({label: g});
            }
        }
        return (
            <GridLayer
                data={data} />
        );
    }


});

module.exports = D3canvas;