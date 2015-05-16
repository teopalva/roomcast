
var React = require('react');
var Mui = require('material-ui');
var IdentitiesGrid = require('./IdentitiesGrid');

var BrokerPage = require('./BrokerPage');
var AppIdPage = require('./AppIdPage');
var RunIdPage = require('./RunIdPage');

var Main = React.createClass({

    componentDidMount: function() {
        var self = this;

        nutella.net.request('mapping/retrieve', 'all', function (response) {
            self.extractIdentitiesFromMapping(response);
        });

        nutella.net.subscribe('mapping/updated', function (message, from) {
            self.extractIdentitiesFromMapping(message);
        });

        nutella.net.subscribe('currentConfig/switched', function (message, from) {
            self.extractIdentitiesFromMapping(message);
        });

    },

    getInitialState: function () {
        return  {
            identities: [],
            page: 1,
            app_id: null
        }
    },

    setIdentities: function(ids) {
        this.setState({
            identities: ids
        });
    },

    setPage: function(page) {
        this.setState({
            page: page
        });
    },

    handleSwitchPage: function(page, value) {
        this.setPage(page);
        if(value) {
            this.setState({
                app_id: value
            });
        }
    },

    render: function () {

        var page = null;
        switch(this.state.page) {
            case 1:
                page = <BrokerPage
                    onSwitchPage={this.handleSwitchPage} />;
                break;
            case 2:
                page = <AppIdPage
                    onSwitchPage={this.handleSwitchPage}
                    values={[]} />;
                break;
            case 3:
                page = <RunIdPage
                    onSwitchPage={this.handleSwitchPage}
                    app_id={this.state.app_id}
                    values={[]} />;
                break;
            default:
        }

        return page;
    }

});

module.exports = Main;
