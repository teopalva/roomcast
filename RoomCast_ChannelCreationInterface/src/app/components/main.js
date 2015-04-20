
var React = require('react');
var Channel = require('./Channel');
var CataloguePage = require('./CataloguePage');
var DetailPage = require('./DetailPage');
//var PageSliderMixin = require('./PageSliderMixin');
//var Router = require('./Router');

var Main = React.createClass({

    //mixins: [PageSliderMixin],

    componentWillMount: function() {
        var self = this;

        try {
            // Get current channels catalogue
            nutella.net.request('channels/retrieve', 'all', function (response) {
                self.setChannels(response);

                nutella.net.subscribe('channels/updated', function (message, channel, from_component_id, from_resource_id) {
                    self.setChannels(message);
                });

                /*
                 // Add routing
                 //var channels = self.getChannels();
                 Router.addRoute('', function () {
                 self.slidePage(
                 <CataloguePage
                 key='home'
                 channels={self.getChannels()}
                 onSave={self.handleSave}
                 onUndo={self.handleUndo}/>
                 );
                 }.bind(self));
                 Router.addRoute('detail', function () {
                 self.slidePage(
                 <DetailPage
                 channel={self.state.channels[self.state.selectedChannel]}/>
                 );
                 }.bind(self));
                 Router.start();
                 */

            });

        } catch(e) {
            console.error(e, e.trace());
        }

    },

    getInitialState: function () {
        return  {
            channels: [],
            selectedChannel: null,
            page: 'catalogue'
        }
    },

    setChannels: function(channels, publish) {
        var self = this;
        var callback = function() {
            if(publish) {
                nutella.net.publish('channels/update', self.state.channels);
            }
        };
        this.setState({
            channels: channels
        }, callback());
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
        this.saveLocalCatalogue(true);
    },

    handleUndo: function() {
        var self = this;
        console.log('undo');
        nutella.net.request('channels/retrieve', 'all', function (response) {
            self.setChannels(response);
        });
        this.setSelectedChannel(null);
    },

    handleSelectedChannel: function(selectedChannel) {
        this.setSelectedChannel(selectedChannel);
    },

    handleExitSelection: function() {
        this.setState({
            selectedChannel: null
        });
        if(this.refs.channelSelected) {
            if(this.refs.channelSelected.state.flipped) {
                this.refs.channelSelected.flipCardBack();
            }
        }
    },

    handleDeleteCard: function(id) {
        var channels = this.state.channels;
        delete channels[id];
        this.setChannels(channels);
    },

    handleAddCard: function() {

        var channels = this.state.channels;
        var newChannelId = 1;

        // Find max id
        if(channels.length !== 0) {
            var ids = [];
            for (var c in channels) {
                if (channels.hasOwnProperty(c)) {
                    ids.push(+c);
                }
            }
            newChannelId = Math.max.apply(null, ids) + 1;
        }

        // Save current catalogue
        this.saveLocalCatalogue();

        channels[newChannelId] = {
            "name": " ",
            "icon": "",
            "screenshot": "roomcast-default-channel.png",
            "description": "",
            "url": "",
            "type": ""
        };

        this.setChannels(channels);
    },

    /**
     * Synchronizes the local copy of the catalogue
     * @param publish true if you also want to save the changes to the server
     */
    saveLocalCatalogue: function(publish) {
        var channels = this.state.channels;
        if (publish) {
            this.setChannels(channels, publish);
        } else {
            this.setChannels(channels);
        }
    },

    getChannels: function() {
        var self = this;
        var channels = this.state.channels;
        var reactChannels = [];

        // Show from last in db (most recent)
        if(channels.length !== 0) {
            var ids = [];
            for (var c in channels) {
                if (channels.hasOwnProperty(c)) {
                    ids.push(+c);
                }
            }

            function sortNumber(a, b) {
                return b - a;
            }

            ids.sort(sortNumber);

            ids.forEach(function(id) {
                if (channels.hasOwnProperty(id)) {
                    var ref = 'channel';
                    var sel = self.state.selectedChannel === id ? 'Selected' : '';
                    reactChannels.push(
                        <div className="col-size">
                            <Channel
                                ref={ref+sel}
                                channelId={id}
                                channel={channels[id]}
                                selected={self.state.selectedChannel === id}
                                onSelectChannel={self.handleSelectedChannel}
                                onDeleteCard={self.handleDeleteCard} />
                        </div>);
                }
            });
        }
        return reactChannels;
    },

    render: function () {
        var self = this;

        var channels = this.getChannels();

        var page;
        switch (this.state.page) {
            case 'catalogue':
                page = <CataloguePage
                    channels={channels}
                    isSelected={this.state.selectedChannel != null}
                    onSave={this.handleSave}
                    onUndo={this.handleUndo}
                    onExitSelection={this.handleExitSelection}
                    onAddCard={this.handleAddCard} />;
                break;
            case 'detail':
                page = <DetailPage
                    channel={this.state.channels[this.state.selectedChannel]} />;
        }

        return page;
    }

});

module.exports = Main;
