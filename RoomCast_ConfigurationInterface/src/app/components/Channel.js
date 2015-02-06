var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var FlatButton = Mui.FlatButton;

var Channel = React.createClass({
    render: function(){

        return (
            <div className='channelDiv'>
                <img className='channelIcon' src='./assets/icon/channel_icon.png'> </img>
                <p> {this.props.name} </p>
            </div>);

    }

});

module.exports = Channel;

