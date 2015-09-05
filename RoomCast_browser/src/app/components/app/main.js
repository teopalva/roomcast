
var React = require('react');
var Channel = require('./Channel');
var Mui = require('material-ui');
var FloatingActionButton = Mui.FloatingActionButton;
var RightNav = require('./material-ui/right-nav.jsx');
var NUTELLA = require('nutella_lib');
var IdentitySelector = require('../identity-selector/main');

var Main = React.createClass({

    componentDidMount: function() {
        var self = this;

        window.nutella = NUTELLA.init(self.props.params.broker, self.props.params.app_id, self.props.params.run_id, 'app', function(connected) {
            if(connected) {

                if(!self.state.rid) {
                    self.handleUpdatedBackgroundMessage('No identity set');
                }

                // Get current channels catalogue
                nutella.net.request('channels/retrieve', 'all', function (response) {
                    self.handleUpdatedChannelsCatalogue(response);

                    // TODO check that rid is within current available rids: if rids changed, catch error and ask for new one
                    // If at startup info on id is already in state
                    if(self.state.rid) {
                        // Get current assigned channels (mapping)
                        nutella.net.request('mapping/retrieve', 'all', function (response) {
                            self.updateChannelsForRid(response, self.state.rid);
                        });
                    }

                    // Subscribe for future changes
                    nutella.net.subscribe('mapping/updated', function (message, from) {
                        self.updateChannelsForRid(message, self.state.rid);
                    });
                    nutella.net.subscribe('currentConfig/switched', function (message, from) {
                        //self.updateChannelsForRid(message, self.state.rid);// TODO
                        console.log('LOG');
                        console.log('self:' , self);
                        self.setState({rid: null, modal: 'activity'});
                        console.warn('switch config', message);
                    });
                    nutella.net.subscribe('channels/updated', function (message, from) {
                        nutella.net.request('mapping/retrieve', 'all', function (response) {
                            self.handleUpdatedChannelsCatalogue(message, function() {
                                self.updateChannelsForRid(response, self.state.rid);
                            });
                        });
                    });
                });

            }
        });

    },

    /**
     * Manages the modal sidebar right after state change
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
        for(var i=0; i<myChannelsId.length; i++) {
            var id = myChannelsId[i];
            if(self.state.channelsCatalogue[+id] !== undefined) {
                myChannels.push(self.state.channelsCatalogue[+id]);
            }
        }
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
            backgroundMessage: null,
            modal: null
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

    handleUpdatedChannelsCatalogue: function(cat, callback) {
        if(callback) {
            this.setState({
                channelsCatalogue: cat
            }, callback);
        } else {
            this.setState({
                channelsCatalogue: cat
            });
        }
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
    },

    handleSetRid: function(rid) {
        console.log('setting...', rid);
        this.handleSelectedResource(rid);
    },

    handleLogout: function() {
        //this.handleSelectedResource(null);
        this.props.onSwitchPage(1);
    },

    promptIdentitySelector: function(mode) {
        return (
            <IdentitySelector
            params = {this.props.params}
            onSetRid = {this.handleSetRid}
            mode = {mode}/>);
    },

    componentWillUnmount: function() {
        console.log('unmounting');
    },

    render: function() {

        if(!this.state.rid) {
            if(this.state.modal === 'activity') {
                return this.promptIdentitySelector('activity');
            }
            return this.promptIdentitySelector('id');
        }

        var self = this;
        var channels = [];
        for (var ch in this.state.channels) {
            if (this.state.channels.hasOwnProperty(ch)) {
                channels.push(
                    <div className="col-1-3" key={ch} >
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

        var touchDivStyle = {
            width: '80px',
            height: '60px',
            position: 'fixed',
            bottom: 0,
            right: 0
        };

        return (

            <div className='outerDiv'>

                {backgroundMessage}

                <div className="grid"> {channels} </div>

                <div style={touchDivStyle} onTouchTap={this.handleControlButton} >
                    <i className="controlButton icon ion-android-lock"  ></i>
                </div>

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