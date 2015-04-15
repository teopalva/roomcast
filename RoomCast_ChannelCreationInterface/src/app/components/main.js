
var React = require('react');
var Mui = require('material-ui');
var Channel = require('./Channel');
var Paper = Mui.Paper;
var TopBar = require('./TopBar');

var Main = React.createClass({

    componentDidMount: function() {
        var self = this;

        // Get current channels catalogue
        nutella.net.request('channels/retrieve', 'all', function (response) {
            self.setChannels(response);

            nutella.net.subscribe('channels/updated', function (message, channel, from_component_id, from_resource_id) {
                self.setChannels(message);
            });

        });

    },

    getInitialState: function () {
        return  {
            channels: [],
            selectedChannel: null
        }
    },

    setChannels: function(channels) {
        this.setState({
            channels: channels
        });
    },

    setSelectedChannel: function(selectedChannel) {
        this.setState({
            selectedChannel: selectedChannel
        });
    },

    handleSave: function() {
        console.log('save');
    },

    handleUndo: function() {
        console.log('undo');
    },

    render: function () {
        var self = this;

        var channels = [];
        for (var ch in this.state.channels) {
            if (this.state.channels.hasOwnProperty(ch)) {
                channels.push(
                    <div className="col-1-3">
                        <Channel
                            channel={this.state.channels[ch]} />
                    </div>);
            }
        }

        return (

            <div>

                <TopBar
                    onSave={this.handleSave}
                    onUndo={this.handleUndo} />

                <div className="grid"> {channels} </div>

            </div>

        );
    }

});

module.exports = Main;
