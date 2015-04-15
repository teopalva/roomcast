
var React = require('react');
var Channel = require('./Channel');
var CataloguePage = require('./CataloguePage');
var DetailPage = require('./DetailPage');

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
            selectedChannel: null,
            page: 'catalogue'
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

    /**
     * @param page 'catalogue' or 'detail'
     */
    setPage: function(page) {
        this.setState({
            page: page
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
                            channel={this.state.channels[ch]}
                            selected={this.state.selectedChannel === ch} />
                    </div>);
            }
        }

        var page;
        switch (this.state.page) {
            case 'catalogue':
                page = <CataloguePage
                   channels={channels}
                   onSave={this.handleSave}
                   onUndo={this.handleUndo} />;
                break;
            case 'detail':
                page = <DetailPage />;
        }

        return page;
    }

});

module.exports = Main;
