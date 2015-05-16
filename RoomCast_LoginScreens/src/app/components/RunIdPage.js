
var React = require('react');
var IdentitiesGrid = require('./IdentitiesGrid');

var RunIdPage = React.createClass({

    componentWillMount: function() {
        nutella.net.request('app_runs_list', 'req', function(response) {
            console.log('resp:', response);
        });

        this.setState({
            values: ['1', '2', '3', '4', '5']
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
            backgroundMessage = <p className='backgroundMessage' > No available runs </p>;
        }

        return (

            <div className='main-div' >

                <div className='titles-div' style={titlesDivStyle} >

                    <span className='title' > RoomCast login </span>
                    <span className='title' > run_id: </span>

                </div>

                <div className='grid-div' style={gridDivStyle} >

                    {backgroundMessage}
                    <IdentitiesGrid
                        identities={this.state.values}
                        type='run_id' />

                </div>

            </div>

        );
    }

});

module.exports = RunIdPage;
