var React = require('react');
var Mui = require('material-ui');
var d3 = require('d3');

var MainLayer = React.createClass({

    componentDidMount: function() {
        var self=this;

    },

    render: function() {


        var _groups = [];
        for(var g in this.props.groups) {
            _groups.push(this.props.groups[g]);
        }



        return (
            <div> {_groups} </div>
        );
    }


});

module.exports = MainLayer;