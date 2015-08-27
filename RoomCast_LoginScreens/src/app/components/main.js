
var React = require('react');
var Mui = require('material-ui');
var IdentitiesGrid = require('./IdentitiesGrid');

var BrokerPage = require('./BrokerPage');
var AppIdPage = require('./AppIdPage');
var RunIdPage = require('./RunIdPage');

var Main = React.createClass({

    componentDidMount: function() {
    },

    getInitialState: function () {
        return  {
            identities: [],
            page: 1,
            app_ids: undefined,
            app_id: undefined
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

    handleSwitchPage: function(page, params) {
        this.setPage(page);
        if(params) {
            if(params.app_ids) {
                this.setState({
                    app_ids: params.app_ids
                });
            }
            if(params.app_id) {
                this.setState({
                    app_id: params.app_id
                });
            }
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
                    values={this.state.app_ids} />;
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
