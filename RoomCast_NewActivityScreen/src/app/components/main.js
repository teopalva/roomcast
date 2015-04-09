
var React = require('react');
var Mui = require('material-ui');
var IdentitiesGrid = require('./IdentitiesGrid');

var Main = React.createClass({

    componentDidMount: function() {
        var self = this;

        nutella.net.request('mapping/retrieve', 'all', function (response) {
            self.extractIdentitiesFromMapping(response);
        });

        nutella.net.subscribe('mapping/updated', function (message, channel, from_component_id, from_resource_id) {
            self.extractIdentitiesFromMapping(message);
        });

        nutella.net.subscribe('currentConfig/switched', function (message, channel, from_component_id, from_resource_id) {
            self.extractIdentitiesFromMapping(message);
        });

    },

    extractIdentitiesFromMapping: function(mapping) {
        var ids = [];
        mapping.forEach(function (f) {
            for (var i in f.items) {
                ids.push(f.items[i].name);
            }
        });
        this.setIdentities(ids);
    },

    getInitialState: function () {
        return  {
            identities: []
        }
    },

    setIdentities: function(ids) {
        this.setState({
            identities: ids
        });
    },

    render: function () {

        var titlesDivStyle = {
            height: window.innerHeight * (1/3)
        };

        var gridDivStyle = {
            height: window.innerHeight * (2/3)
        };

        return (

            <div className='main-div' >

                <div className='titles-div' style={titlesDivStyle} >

                    <span className='title' > New Activity! </span>
                    <span className='title' > Who are you? </span>

                </div>

                <div className='grid-div' style={gridDivStyle} >

                    <IdentitiesGrid
                        identities={this.state.identities} />

                </div>

            </div>

        );
    }

});

module.exports = Main;
