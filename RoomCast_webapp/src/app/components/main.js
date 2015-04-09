
var React = require('react');
var Channel = require('./Channel');
var Mui = require('material-ui');
var FloatingActionButton = Mui.FloatingActionButton;
var RightNav = require('./material-ui/right-nav.jsx');

var Main = React.createClass({

    componentDidMount: function() {
        var self = this;

        /*
        var iOS = (window.navigator.userAgent.match(/(iPad|iPhone)/g) ? true : false);
        if(iOS) {
            console.log('iOS version');

        } else {
            console.log('Browser version');
        }
        */
        if(!self.state.rid) {
            self.handleUpdatedBackgroundMessage('No identity set');
        }

        try {

            // Get current channels catalogue
            nutella.net.request('channels/retrieve', 'all', function (response) {
                self.handleUpdatedChannelsCatalogue(response);

                // Fetch from iOS device
                var url = 'roomcast' + '://' + 'getResourceIdentity';
                document.location.href = url;

                // TODO check that rid is within current available rids
                if(self.state.rid) {
                    // Get current assigned channels (mapping)
                    nutella.net.request('mapping/retrieve', 'all', function (response) {
                        self.updateChannelsForRid(response, self.state.rid);
                    });
                }

                // Subscribe for future changes
                nutella.net.subscribe('mapping/updated', function (message, channel, from_component_id, from_resource_id) {
                    self.updateChannelsForRid(message, self.state.rid);
                });
                nutella.net.subscribe('currentConfig/switched', function (message, channel, from_component_id, from_resource_id) {
                    //self.updateChannelsForRid(message, self.state.rid);
                    // TODO show identity screen on iPad
                    var url = 'roomcast' + '://' + 'promptNewActivityScreen';
                    document.location.href = url;
                    console.warn('switch config', message);
                });
                nutella.net.subscribe('channels/updated', function (message, channel, from_component_id, from_resource_id) {
                    self.handleUpdatedChannelsCatalogue(message);
                });
            });


        } catch(e) {
            console.warn('Nutella error -> fetching from fake data');
            self.updateChannelsForRid(MAPPING, self.state.rid);
        }

    },

    /**
     * Manages the modal sidebar after right after state change
     */
    componentWillReceiveProps: function() {
        // TODO modal disabled on start - remove?
        var self = this;
        if(!this.state.rid) {
            this.refs.rightNav.open();
            this.refs.rightNav.setState({
                modal: true
            });
            // Force update menu with resources
            nutella.net.request('mapping/retrieve', 'all', function (response) {
                self.handleUpdatedMapping(response);
            });
        } else {
            this.refs.rightNav.setState({
                modal: false
            });
        }
    },

    updateChannelsForRid: function(message, rid) {

        var self = this;
        var myChannelsId = [];
        var myChannels = [];
        message.forEach(function (f) {
            for (var i in f.items) {
                var item = f.items[i];
                if (item.name === rid) {
                    myChannelsId = item.channels;
                    break;
                }
            }
        });
        myChannelsId.forEach(function (id) {
            myChannels.push(self.state.channelsCatalogue[id]);
        });
        if (myChannels.length === 0) {
            self.handleUpdatedBackgroundMessage('No available channels');
            if(!self.state.rid) {
                self.handleUpdatedBackgroundMessage('No identity set');
            }
        } else {
            self.handleUpdatedBackgroundMessage(null);
        }
        this.handleUpdatedChannels(myChannels);
    },

    getInitialState: function() {
        return {
            rid: null,
            channels: [],
            mapping: [],
            channelsCatalogue: {},
            backgroundMessage: null
        };
    },

    handleUpdatedRid: function(rid) {
        this.setState({
            rid: rid
        });
    },

    handleUpdatedChannels: function(channels) {
        this.setState({
            channels: channels
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

    handleUpdatedBackgroundMessage: function(m) {
        this.setState({
            backgroundMessage: m
        });
    },

    handleControlButton: function() {
        var self = this;
        this.refs.rightNav.toggle();
        if(this.refs.rightNav.state.open === false) {
            nutella.net.request('mapping/retrieve', 'all', function (response) {
                self.handleUpdatedMapping(response);
            });
        }
    },

    handleSelectedResource: function(rid) {
        var self = this;
        this.handleUpdatedRid(rid);
        nutella.net.request('mapping/retrieve', 'all', function (response) {
            self.updateChannelsForRid(response, rid);
        });
    },

    handleItemTap: function(menuItem) {
        this.handleSelectedResource(menuItem.id);

        // Store in iOS
        var actionParameters = {
            'rid': menuItem.id
        };
        var jsonString = (JSON.stringify(actionParameters));
        var escapedJsonParameters = escape(jsonString);
        var url = 'roomcast' + '://' + 'setResourceIdentity' + "#" + escapedJsonParameters;
        document.location.href = url;
    },

    handleLogout: function() {
        this.handleSelectedResource(null);

        // Logout from iOS
        var url = 'roomcast' + '://' + 'logout';
        document.location.href = url;
    },

    render: function() {

        var self = this;
        var channels = [];
        for (ch in this.state.channels) {
            if (this.state.channels.hasOwnProperty(ch)) {
                channels.push(
                    <div className="col-1-3">
                        <Channel
                            channel={this.state.channels[ch]} />
                    </div>);
            }
        }

        var menuItems = [];
        this.state.mapping.forEach(function (f) {
                for (var i in f.items) {
                menuItems.push({
                        id: f.items[i].name,
                        text: f.items[i].name,
                        currentSelected: f.items[i].name === self.state.rid
                    }
                );
            }
        });

        console.log(this.state.mapping);
        console.log(menuItems);

        var backgroundMessageStyle = {
            position: 'fixed',
            left: '0',
            bottom: '50%',
            width: '100%',
            fontSize: '2.5vw',
            textAlign: 'center',
            color: '#9197a3',
            fontWeight: '300'

        };

        var backgroundMessage = null;
        if(this.state.backgroundMessage) {
            backgroundMessage = <p style={backgroundMessageStyle} > {this.state.backgroundMessage} </p>;
        }

        var canLogout = true;
        if(!this.state.rid) {
            canLogout = false;
        }

        return (

            <div className='outerDiv'>

                {backgroundMessage}

                <div className="grid"> {channels} </div>

                <FloatingActionButton className='controlButton'
                                      iconClassName="muidocs-icon-action-grade"
                                      secondary={true}
                                      onTouchTap={this.handleControlButton} />

                <RightNav ref='rightNav'
                          docked={false}
                          modal={false}
                          menuItems={menuItems}
                          onItemTap={this.handleItemTap}
                          canLogout={canLogout}
                          onLogout={this.handleLogout} />
            </div>

        );
    }


});

module.exports = Main;

/*
var CHANNELS = {
    '01': {name: 'Admin', icon: '', screenshot: './assets/channels/Roomquake/Admin.png', description: 'description: first channel', url: 'http://matteopalvarini.com/viz/Project3'},
    '02': {name: 'AggregateView', icon: '', screenshot: './assets/channels/Roomquake/AggregateView.png',  description: '', url:'http://google.it'},
    '03': {name: 'Seismograph1', icon: '', screenshot: './assets/channels/Roomquake/Seismograph1.png',  description: '', url:'roomquake.seismometer://'},
    '04': {name: 'Seismograph2', icon: '', screenshot: './assets/channels/Roomquake/Seismograph2.png',  description: '', url:'http://d3js.org'},
    '05': {name: 'Seismograph3', icon: '', screenshot: './assets/channels/Roomquake/Seismograph3.png',  description: '', url:'roomquake.seismometer://'},
    '06': {name: 'Seismograph4', icon: '', screenshot: './assets/channels/Roomquake/Seismograph4.png',  description: '', url:'roomquake.seismometer://'},
    '07': {name: 'StudentsForms', icon: '', screenshot: './assets/channels/Roomquake/StudentsForms.png',  description: '', url:'http://uic.edu'}
};
*/

var MAPPING = [{
    "family": "iPad",
    "items": [{
        "name": "iPad1",
        "channels": ["01", "02", "03", "04", "05", "06", "07"]
    }, {
        "name": "iPad2",
        "channels": []
    }, {
        "name": "iPad3",
        "channels": ["01", "02", "04", "07"]
    }, {
        "name": "iPad4",
        "channels": ["01", "02", "03", "04", "05", "06", "07"]
    }, {
        "name": "iPad5",
        "channels": ["01", "02", "04", "07"]
    }]
}, {
    "family": "Mac",
    "items": [{
        "name": "mac1",
        "channels": ["01", "02"]
    }, {
        "name": "mac2",
        "channels": ["01"]
    }, {
        "name": "mac3",
        "channels": ["01", "02"]
    }]
}];