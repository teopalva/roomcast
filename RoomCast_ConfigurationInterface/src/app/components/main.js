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
            self.nutellaRequestConfigs();
        });

    },

    /**
     * @state selectedChannel: the current selected channel from UI
     * @state configs: the list of configurations fetched from server
     * @state currentConfig: the current selected configuration, also called 'mapping'
     * @state channelsCatalogue: the list of available channels fetched from server
     */
    getInitialState: function() {
        return {
            selectedChannel: null,
            configs: [],
            currentConfigId: null,
            currentConfig: [],
            channelsCatalogue: {}
        };
    },

    nutellaRequestConfigs: function() {
        var self = this;
        nutella.net.request('configs/retrieve', 'all', function(response) {
            self.handleUpdatedConfigs(response);
            self.handleUpdatedCurrentConfigId(+Object.keys(response)[Object.keys(response).length - 1]);
            self.handleUpdatedCurrentConfig(response[Object.keys(response)[Object.keys(response).length - 1]].mapping)
        });
    },

    handleSelection: function(selectedChannel) {
        this.setState({
            selectedChannel: selectedChannel
        });
    },

    handleUpdatedConfigs: function(configs, publish) {
        var self = this;
        var callback = function() {
            if(publish) {
                nutella.net.publish('configs/update', self.state.configs);
            }
        };
        this.setState({
            configs: configs
        }, callback());
    },

    handleUpdatedCurrentConfigId: function(id) {
        this.setState({
            currentConfigId: id
        });
    },

    handleUpdatedCurrentConfig: function(config) {
        this.setState({
            currentConfig: config
        });
    },

    handleUpdatedChannelsCatalogue: function(cat) {
        this.setState({
            channelsCatalogue: cat
        });
    },

    handleSaveChanges: function() {
        var publish = true;
        this.saveLocalConfigs(publish);
    },

    handleUndoChanges: function() {
        this.nutellaRequestConfigs();
    },

    handleAddRow: function(family) {
        var mapping = this.state.currentConfig;
        var newMapping = [];
        mapping.forEach(function(f) {
            if(f.family === family) {
                f.items.push({name:'', channels:[]});
            }
            newMapping.push(f);
        });
        this.handleUpdatedCurrentConfig(newMapping);
    },

    /**
     * Synchronizes the local copy of the current mapping with the shared state configs
     * @param publish true if you also want to save the changes to the server
     */
    saveLocalConfigs: function(publish) {
        var configs = this.state.configs;
        configs[this.state.currentConfigId].mapping = this.state.currentConfig;
        if (publish) {
            this.handleUpdatedConfigs(configs, publish);
        } else {
            this.handleUpdatedConfigs(configs);
        }
    },

    handleChangeConfig: function(configId) {

        // update local configs copy
        this.saveLocalConfigs();

        // update current local configuration to selected one
        this.handleUpdatedCurrentConfigId(configId);
        this.handleUpdatedCurrentConfig(this.state.configs[configId].mapping)
    },

    render: function () {

        return (
            <div className='outer-div'>

                <ResourcesPanel
                    configs={this.state.configs}
                    mapping={this.state.currentConfig}
                    onUpdatedMapping={this.handleUpdatedCurrentConfig}
                    channels={this.state.channelsCatalogue}
                    selectedChannel={this.state.selectedChannel}
                    onSelectedChannel={this.handleSelection}
                    onAddRow={this.handleAddRow}
                    onChangeConfig={this.handleChangeConfig} />

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