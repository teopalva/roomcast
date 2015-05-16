
var React = require('react');
var IdentitiesGrid = require('./IdentitiesGrid');

var AppIdPage = React.createClass({

    componentWillMount: function() {
        nutella.net.request('app_runs_list', 'req', function(response) {
            console.log('resp:', response);
        });

        this.setState({
            values: ['1', '2', '3']
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
        if(this.state.values.length == 0) {
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
