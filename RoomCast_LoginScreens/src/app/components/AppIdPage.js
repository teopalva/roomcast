
var React = require('react');
var IdentitiesGrid = require('./IdentitiesGrid');

var AppIdPage = React.createClass({

    componentDidMount: function() {
        var self = this;
    },

    getInitialState: function () {
        return  {
            hasBeenSelected: false,
            values: this.props.values
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

        var app_ids_grid = null;

        if(this.state.values) {
            var backgroundMessage = null;
            if(this.state.values.length === 0) {
                backgroundMessage = <p className='backgroundMessage' > No available apps </p>;
            }

            app_ids_grid = (
                <div className='grid-div' style={gridDivStyle} >

                    {backgroundMessage}
                    <IdentitiesGrid
                        identities={this.state.values}
                        type='app_id'
                        onSwitchPage={this.props.onSwitchPage} />

                </div>
            );
        } else {

            backgroundMessage = <p className='backgroundMessage' > An error occurred </p>;
            app_ids_grid = (
                <div className='grid-div' style={gridDivStyle} >
                    {backgroundMessage}
                </div>
            );

        }

        return (

            <div className='main-div' >

                <div className='titles-div' style={titlesDivStyle} >

                    <span className='title' > RoomCast login </span>
                    <span className='title' > app_id: </span>

                </div>

                {app_ids_grid}

            </div>

        );
    }

});

module.exports = AppIdPage;
