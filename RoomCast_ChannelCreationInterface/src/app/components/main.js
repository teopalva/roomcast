
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

    getChannels: function() {
        var channels = [];
        for (var ch in this.state.channels) {
            if (this.state.channels.hasOwnProperty(ch)) {
                var ref = 'channel';
                var sel = this.state.selectedChannel === ch? 'Selected' : '';
                channels.push(
                    <div className="col-size">
                        <Channel
                            ref={ref+sel}
                            channelId={ch}
                            channel={this.state.channels[ch]}
                            selected={this.state.selectedChannel === ch}
                            onSelectChannel={this.handleSelectedChannel} />
                    </div>);
            }
        }
        return channels;
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
                    onExitSelection={this.handleExitSelection} />;
                break;
            case 'detail':
                page = <DetailPage
                    channel={this.state.channels[this.state.selectedChannel]} />;
        }

        return page;
    }

});

module.exports = Main;
