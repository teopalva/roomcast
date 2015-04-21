
var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;

var ColorCell = React.createClass({

    componentWillMount: function() {

    },

    handlePickColor: function() {
        this.props.onPickColor(this.props.color);
    },

    render: function() {

        var style = {
            height: this.props.size[1],
            width: this.props.size[0],
            backgroundColor: this.props.color
        };

        return (

            <div className='color-cell' style={style} onTouchTap={this.handlePickColor} > </div>

        );

    }

});

module.exports = ColorCell;
