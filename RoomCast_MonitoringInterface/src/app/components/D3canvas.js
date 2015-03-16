var React = require('react');
var Mui = require('material-ui');
var d3 = require('d3');

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

        var _groups = [];
        for(var g in this.props.groups) {
            _groups.push(this.props.groups[g]);
        }

        return (
            <div> {_groups} </div>
        );
    }


});

module.exports = D3canvas;