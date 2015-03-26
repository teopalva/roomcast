var React = require('react');
var ResourceFamilyPool = require('./ResourceFamilyPool');
var ConfigurationsPanel = require('./ConfigurationsPanel');

var ResourcesPanel = React.createClass({

    handleSelectedChannel: function(ch) {
        this.props.onSelectedChannel(ch);
    },

    handleUpdatedMapping: function(familyMapping) {

        // create new object to update complete data structure (RESOURCES)
        var mapping = [];
        this.props.mapping.forEach(function(family) {
            if(family.family===familyMapping.family) {
                mapping.push(familyMapping);
            } else {
                mapping.push({
                    family: family.family,
                    items: family.items
                });
            }
        });

        this.props.onUpdatedMapping(mapping);
    },

    handleAddRow: function(family) {
        this.props.onAddRow(family);
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
                onUpdatedMapping={self.handleUpdatedMapping}
                onAddRow={self.handleAddRow} />
            );
        });

        return (
            <div className="resources-panel">

                <ConfigurationsPanel/>

                {pools}

            </div> );
    }

});

module.exports = ResourcesPanel;

