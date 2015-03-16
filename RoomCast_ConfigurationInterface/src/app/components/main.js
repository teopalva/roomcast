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

    render: function () {

        return (
            <div className='outer-div'>

                <ResourcesPanel
                    mapping={this.state.mapping}
                    onUpdatedMapping={this.handleUpdatedMapping}
                    channels={this.state.channelsCatalogue}
                    selectedChannel={this.state.selectedChannel}
                    onSelectedChannel={this.handleSelection} />

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

var MAPPING = [

    {
        family: 'iPad',
        items: [
            {
                name: 'iPad1',
                channels: ['01','02']
            },
            {
                name: 'iPad2',
                channels: ['01','02','03','04','05']
            },
            {
                name: 'iPad3',
                channels: ['01']
            },
            {
                name: 'iPad4',
                channels: ['01','02','03','04','05','06']
            },
            {
                name: 'iPad5',
                channels: ['01','02']
            }
        ]
    },
    {
        family: 'Mac',
        items: [
            {
                name: 'mac1',
                channels: ['01','02']
            },
            {
                name: 'mac2',
                channels: ['01']
            },
            {
                name: 'mac3',
                channels: ['01','02']
            }
        ]
    }
];

/*
var CHANNELS = {
    '01': {name: 'Admin', icon: '', screenshot: './assets/channels/Roomquake/Admin.png', description: 'description: first channel'},
    '02': {name: 'AggregateView', icon: '', screenshot: './assets/channels/Roomquake/AggregateView.png',  description: ''},
    '03': {name: 'Seismograph1', icon: '', screenshot: './assets/channels/Roomquake/Seismograph1.png',  description: ''},
    '04': {name: 'Seismograph2', icon: '', screenshot: './assets/channels/Roomquake/Seismograph2.png',  description: ''},
    '05': {name: 'Seismograph3', icon: '', screenshot: './assets/channels/Roomquake/Seismograph3.png',  description: ''},
    '06': {name: 'Seismograph4', icon: '', screenshot: './assets/channels/Roomquake/Seismograph4.png',  description: ''},
    '07': {name: 'StudentsForms', icon: '', screenshot: './assets/channels/Roomquake/StudentsForms.png',  description: ''}
};
*/