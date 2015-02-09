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

        // update sub-state
        //var resourceMapping = this.props.resourceWithChannels;


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

        resourceMapping = newChannels;

        // create new object for single resource
        var resourceMapping = {
         name: this.props.resourceWithChannels.name,
         channels: newChannels
         };

/*
         // insert in order into channels list
         var newChannels = this.props.resourceWithChannels.channels.slice(0);
         console.log(newChannels);
         for(var i=0; i<newChannels.length; i++) {
         if(chId < newChannels[i]) {
         continue;
         }
         newChannels.splice(i,0,chId);
         }
         */

        // pass update upwards
        this.props.onUpdatedMapping(resourceMapping);
    },

    render: function () {

        var self=this;
        var channelsList = [];

        /*
         this.props.channels.forEach(function (ch) {
         channelsList.push(<Channel name={ch.name} />);
         });
         */

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