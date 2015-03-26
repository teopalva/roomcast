var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

var ResourcesPanel = require('./ResourcesPanel.js');
var ChannelsPanel = require('./ChannelsPanel');

var Main = React.createClass({

    componentDidMount: function() {
        var self = this;

        // Get current channels catalogue
        nutella.net.request('channels/retrieve', 'all', function (response) {
            self.handleUpdatedChannelsCatalogue(response);
        });

        nutella.net.request('mapping/retrieve', 'all', function(response) {
            self.handleUpdatedMapping(response);
        });
    },

    getInitialState: function() {
        return {
            selectedChannel: null,
            mapping: [],
            channelsCatalogue: {}
        };
    },

    handleSelection: function(selectedChannel) {
        this.setState({
            selectedChannel: selectedChannel
        });
    },

    handleUpdatedMapping: function(mapping) {
        this.setState({
            mapping: mapping
        });
    },

    handleUpdatedChannelsCatalogue: function(cat) {
        this.setState({
            channelsCatalogue: cat
        });
    },

    handleSaveChanges: function() {
        nutella.net.publish('mapping/update', this.state.mapping);
    },

    handleUndoChanges: function() {
        var self = this;
        nutella.net.request('mapping/retrieve', 'all', function(response) {
            self.handleUpdatedMapping(response);
        });
    },

    handleAddRow: function(family) {
        var mapping = this.state.mapping;
        var newMapping = [];
        mapping.forEach(function(f) {
            if(f.family === family) {
                f.items.push({name:'', channels:[]});
            }
            newMapping.push(f);
        });
        this.handleUpdatedMapping(newMapping);
    },

    render: function () {

        return (
            <div className='outer-div'>

                <ResourcesPanel
                    mapping={this.state.mapping}
                    onUpdatedMapping={this.handleUpdatedMapping}
                    channels={this.state.channelsCatalogue}
                    selectedChannel={this.state.selectedChannel}
                    onSelectedChannel={this.handleSelection}
                    onAddRow={this.handleAddRow} />

                <ChannelsPanel
                    ref={'channelsPanel'}
                    channels={this.state.channelsCatalogue}
                    selectedChannel={this.state.selectedChannel}
                    onSelectedChannel={this.handleSelection}
                    onSaveChanges={this.handleSaveChanges}
                    onUndoChanges={this.handleUndoChanges} />

            </div>
        );
    }

});

module.exports = Main;