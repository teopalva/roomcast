var React = require('react');
var PoolHeader = require('./PoolHeader');
var PoolRow = require('./PoolRow');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var ButtonInteractionsMixin = require('./ButtonInteractionsMixin');

var ResourceFamilyPool = React.createClass({

    mixins: [ButtonInteractionsMixin],

    handleSelectedChannel: function(ch) {
        this.props.onSelectedChannel(ch);
    },

    handleRemovedAllChannels: function() {
        var self=this;

        /*
         var i = 0;
         this.props.resourcesWithChannels.forEach(function() {
         console.log(self.refs['poolRow' + self.props.familyName + i]);
         self.refs['poolRow' + self.props.familyName + i].handleRemovedChannels();
         i++;
         });
         */

        var familyItems=[];
        this.props.resourcesWithChannels.forEach(function(res) {
            familyItems.push({
                name: res.name,
                channels: []
            });
        });
        this.handleUpdatedFamily(familyItems);

    },

    handleAddedChannelToPool: function(chId) {
        var self=this;
        var familyItems=[];
        this.props.resourcesWithChannels.forEach(function(res) {
            var newChannels = self.insertNewChannel(res.channels, chId);
            familyItems.push({
                name: res.name,
                channels: newChannels
            });
        });
        this.handleUpdatedFamily(familyItems);
    },

    handleRemovedChannelFromPool: function(chId) {

        var familyItems=[];
        this.props.resourcesWithChannels.forEach(function(res) {
            // remove channel
            var channels = res.channels;
            var newChannels = [];
            for (var ch in channels) {
                newChannels.push(channels[ch]);
            }
            for (var i = newChannels.length; i >= 0; i--) {
                if (newChannels[i] === chId) {
                    newChannels.splice(i, 1);
                }
            }

            var item = {
                name: res.name,
                channels: newChannels
            };

            // TODO remove style from removed

            familyItems.push(item);
        });

        this.handleUpdatedFamily(familyItems);

    },

    handleUpdatedFamily: function(familyItems) {
        var familyMapping = {
            family: this.props.familyName,
            items: familyItems
        };
        this.props.onUpdatedMapping(familyMapping);
    },

    /**
     * Handle updates at row level and push them upwards.
     * @param resourceMapping
     */
    handleUpdatedMapping: function(resourceMapping) {

        // create new object for single family of resources
        var familyItems = [];
        this.props.resourcesWithChannels.forEach(function(item) {
            if(item.name===resourceMapping.name) {
                familyItems.push(resourceMapping);
            } else {
                familyItems.push({
                    name: item.name,
                    channels: item.channels
                });
            }
        });
        var familyMapping = {
            family: this.props.familyName,
            items: familyItems
        };

        this.props.onUpdatedMapping(familyMapping);

    },

    render: function(){

        var self=this;
        var rows=[];
        var i = 0;
        this.props.resourcesWithChannels.forEach(function(resource) {
            rows.push(<PoolRow
                    mapping={self.props.mapping}
                    resourceWithChannels={resource}
                    channels={self.props.channels}
                    selectedChannel={self.props.selectedChannel}
                    onSelectedChannel={self.handleSelectedChannel}
                    onUpdatedMapping={self.handleUpdatedMapping} />
            );
            i++;
        });

        return (

            <div className="resource-family-pool">

                <Paper>

                    <table>

                        <thead>

                            <PoolHeader familyName={this.props.familyName}
                                selectedChannel={self.props.selectedChannel}
                                onRemovedAllChannels={this.handleRemovedAllChannels}
                                onAddedChannelToPool={this.handleAddedChannelToPool}
                                onRemovedChannelFromPool={this.handleRemovedChannelFromPool} />

                        </thead>

                        <tbody> {rows} </tbody>

                    </table>

                </Paper>


            </div> );

    }

});

module.exports = ResourceFamilyPool;

