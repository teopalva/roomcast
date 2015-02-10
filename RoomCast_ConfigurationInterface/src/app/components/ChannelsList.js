var React = require('react');
var Mui = require('material-ui');
var Channel = require('./Channel');

var ChannelsList = React.createClass({

    handleSelectedChannel: function(ch) {

        // set selected channel
        this.props.onSelectedChannel(ch);

        // style selected channel

        // show channel info
    },

    render: function() {

        var channels = [];
        var chs = this.props.channels;
        var keys = Object.keys(chs).sort();
        for(var i = 0; i < keys.length; i++) {
            var key = keys[i];
            channels.push(<Channel
                id={key}
                name={chs[key].name}
                imgPath={chs[key].icon}
                onSelectedChannel={this.handleSelectedChannel}
                currentSelectedChannel={this.props.selectedChannel} />);
        }

        return (
            <div className='channels-list-div'>
                {channels}
            </div>);

    }

});

module.exports = ChannelsList;

