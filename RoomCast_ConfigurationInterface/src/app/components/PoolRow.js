var React = require('react');
var Mui = require('material-ui');
var Channel = require('./Channel');
var ContextButton = require('./ContextButton');
var GlobalButton = require('./GlobalButton');
var ButtonInteractionsMixin = require('./ButtonInteractionsMixin');

var PoolRow = React.createClass({

    mixins: [ButtonInteractionsMixin],

    handleSelectedChannel: function(ch) {
        this.props.onSelectedChannel(ch);
    },

    handleAddedChannel: function(chId) {

        var newChannels = this.insertNewChannel(this.props.resourceWithChannels.channels, chId);
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

    /**
     * Deep copy data structure at this level with the local changes.
     * Has to be reimplemented at each level of the hierarchy.
     * @param newChannels
     */
    handleUpdatedChannel: function(newChannels) {

        // create new object for single resource
        var resourceMapping = {
            name: this.props.resourceWithChannels.name,
            channels: newChannels
        };

        // pass update upwards
        this.props.onUpdatedMapping(resourceMapping);
    },

    /**
     * Remove all the channels from this row.
     */
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