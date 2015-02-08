var React = require('react');
var ResourceFamilyPool = require('./ResourceFamilyPool');

var ResourcesPanel = React.createClass({

    handleSelectedChannel: function(ch) {
        this.props.onSelectedChannel(ch);
    },

    render: function(){

        var self=this;
        var pools = [];
        // TODO add keys to array
        var channels = this.props.channels;
        this.props.resources.forEach(function(family) {
            pools.push(<ResourceFamilyPool
                familyName={family.family}
                resourcesWithChannels={family.items}
                channels={channels}
                selectedChannel={self.props.selectedChannel}
                onSelectedChannel={self.handleSelectedChannel} />
            );
        });

        return (
            <div className="resources-panel">

                {pools}

            </div> );
    }

});

module.exports = ResourcesPanel;

