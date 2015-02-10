var React = require('react');
var Mui = require('material-ui');
var Channel = require('./Channel');
var ContextButton = require('./ContextButton');
var GlobalButton = require('./GlobalButton');

var PoolRow = React.createClass({

    handleSelectedChannel: function(ch) {
        this.props.onSelectedChannel(ch);
    },

    handleAddedChannel: function(chId) {

        // insert new channel in order
        var channels = this.props.resourceWithChannels.channels;
        var newChannels = [];
        var found = false;
        for(var i=0; i<channels.length; i++) {
            if(+chId < +channels[i] && !found) {
                newChannels.push(chId);
                newChannels.push(channels[i]);
                found = true;
            } else {
                newChannels.push(channels[i]);
            }
        }
        if(!found) {
            newChannels.push(chId);
        }

        this.handleUpdatedChannel(newChannels);

    },

    handleRemovedChannel: function(chId) {

        // remove channel
        var channels = this.props.resourceWithChannels.channels;
        var newChannels = [];
        for(var ch in channels) {
            newChannels.push(channels[ch]);
        }
        for(var i = newChannels.length; i>=0; i--) {
            if(newChannels[i] === chId) {
                newChannels.splice(i, 1);
            }
        }

        // TODO remove style from removed

        // propagate upwards
        this.handleUpdatedChannel(newChannels);

    },

    handleUpdatedChannel: function(newChannels) {

        // create new object for single resource
        var resourceMapping = {
            name: this.props.resourceWithChannels.name,
            channels: newChannels
        };

        // pass update upwards
        this.props.onUpdatedMapping(resourceMapping);
    },

    handleRemovedChannels: function() {
        var newChannels = [];
        this.handleUpdatedChannel(newChannels);
    },

    render: function () {

        var self=this;

        // populate row of channels
        var channelsList = [];
        this.props.resourceWithChannels.channels.forEach(function (chId) {
            var itsChannel = self.props.channels[chId];
            if(itsChannel) {
                channelsList.push(<Channel
                    id={chId}
                    name={itsChannel.name}
                    imgPath={itsChannel.icon}
                    onSelectedChannel={self.handleSelectedChannel}
                    currentSelectedChannel={self.props.selectedChannel} />);
            }
        });

        // check if the selected channel is already present in this row
        var itsChannels = self.props.resourceWithChannels.channels;
        var isChannelAllowed = function(ch) {
            if(!self.props.selectedChannel) return;
            for(var i=0; i<itsChannels.length; i++){
                if(itsChannels[i]===self.props.selectedChannel) return true;
            }
            return false;
        };

        // set type of button based on context
        var button;
        if( this.props.selectedChannel ) {
            if( isChannelAllowed(this.props.selectedChannel) ) {
                button=<ContextButton
                    type='remove'
                    selectedChannel={self.props.selectedChannel}
                    onRemovedChannel={self.handleRemovedChannel} />;
            } else {
                button=<ContextButton
                    type='add'
                    selectedChannel={self.props.selectedChannel}
                    onAddedChannel={self.handleAddedChannel} />;
            }
        } else {
            button=<GlobalButton
                type='remove'
                onRemovedChannels={self.handleRemovedChannels} />;
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