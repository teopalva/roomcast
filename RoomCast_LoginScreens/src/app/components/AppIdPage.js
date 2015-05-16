
var React = require('react');
var IdentitiesGrid = require('./IdentitiesGrid');

var AppIdPage = React.createClass({

    componentWillMount: function() {
        var self = this;
        nutella.net.request('runs_list', 'req', function(response) {
            var app_ids = [];
            for(var app_id in response) {
                if(response.hasOwnProperty(app_id)) {
                    app_ids.push(app_id);
                }
            }
            self.setState({
                values: app_ids
            });
        });
    },

    getInitialState: function () {
        return  {
            hasBeenSelected: false,
            values: []
        }
    },

    render: function () {
        var self = this;

        var titlesDivStyle = {
            height: window.innerHeight * (1/3)
        };

        var gridDivStyle = {
            height: window.innerHeight * (2/3)
        };

        var backgroundMessage = null;
        if(this.state.values.length === 0) {
            backgroundMessage = <p className='backgroundMessage' > No available apps </p>;
        }

        return (

            <div className='main-div' >

                <div className='titles-div' style={titlesDivStyle} >

                    <span className='title' > RoomCast login </span>
                    <span className='title' > app_id: </span>

                </div>

                <div className='grid-div' style={gridDivStyle} >

                    {backgroundMessage}
                    <IdentitiesGrid
                        identities={this.state.values}
                        type='app_id'
                        onSwitchPage={this.props.onSwitchPage} />

                </div>

            </div>

        );
    }

});

module.exports = AppIdPage;
