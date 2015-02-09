var React = require('react');
var ResourceFamilyPool = require('./ResourceFamilyPool');

var ResourcesPanel = React.createClass({

    handleSelectedChannel: function(ch) {
        this.props.onSelectedChannel(ch);
    },

    handleUpdatedMapping: function(mapping) {
        this.props.onUpdatedMapping(mapping);
    },

    render: function(){

        var self=this;
        var pools = [];
        // TODO add keys to array
        var channels = this.props.channels;
        this.props.mapping.forEach(function(family) {
            pools.push(<ResourceFamilyPool
                mapping={self.props.mapping}
                familyName={family.family}
                resourcesWithChannels={family.items}
                channels={channels}
                selectedChannel={self.props.selectedChannel}
                onSelectedChannel={self.handleSelectedChannel}
                onUpdatedMapping={self.handleUpdatedMapping} />
            );
        });

        return (
            <div className="resources-panel">

                {pools}

            </div> );
    }

});

module.exports = ResourcesPanel;

