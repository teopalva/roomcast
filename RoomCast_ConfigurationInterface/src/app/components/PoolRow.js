var React = require('react');
var Mui = require('material-ui');
var Channel = require('./Channel');
var ContextButton = require('./ContextButton');
var GlobalButton = require('./GlobalButton');

var PoolRow = React.createClass({

    handleSelectedChannel: function(ch) {
        this.props.onSelectedChannel(ch);
    },

    render: function () {

        var self=this;
        var channelsList = [];

        /*
         this.props.channels.forEach(function (ch) {
         channelsList.push(<Channel name={ch.name} />);
         });
         */

        this.props.resourceWithChannels.channels.forEach(function (chName) {
            var itsChannel = self.props.channels[chName];
            if(itsChannel) {
                channelsList.push(<Channel
                    name={chName}
                    imgPath={itsChannel.icon}
                    onSelectedChannel={self.handleSelectedChannel}
                    currentSelectedChannel={self.props.selectedChannel} />);
            }
        });

        var itsChannels = self.props.resourceWithChannels.channels;
        var isChannelAllowed = function(ch) {
            if(!self.props.selectedChannel) return;
            for(var i=0; i<itsChannels.length; i++){
                if(itsChannels[i]===self.props.selectedChannel) return true;
            }
            return false;
        };

        var button;
        if( this.props.selectedChannel ) {
            if( isChannelAllowed(this.props.selectedChannel) ) {
                button=<ContextButton type='remove' />;
            } else {
                button=<ContextButton type='add' />;
            }
        } else {
            button=<GlobalButton type='remove' />;
        }

        var tdButtonStyle = {
            'textAlign': 'center'
        };

        return (

            <tr className='pool-row'>

                <td> {this.props.resourceWithChannels.name} </td>
                <td> {channelsList} </td>
                <td style={tdButtonStyle}> {button} </td>

            </tr>);

    }
});

module.exports = PoolRow;