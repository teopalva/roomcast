
var React = require('react');
var IdentitiesGrid = require('./IdentitiesGrid');

var AppIdPage = React.createClass({

    componentDidMount: function() {
    },

    getInitialState: function () {
        return  {
            hasBeenSelected: false
        }
    },

    render: function () {

        var titlesDivStyle = {
            height: window.innerHeight * (0.4)
        };

        var gridDivStyle = {
            height: window.innerHeight * (0.6)
        };

        var app_ids_grid = null;

        if(this.props.values) {
            var backgroundMessage = null;
            if(this.props.values.length === 0) {
                backgroundMessage = <p className='backgroundMessage' > No available apps </p>;
            }
            app_ids_grid = (
                <div className='grid-div' style={gridDivStyle} >

                    {backgroundMessage}
                    <IdentitiesGrid
                        identities={this.props.values}
                        type='app_id'
                        onSwitchPage={this.props.onSwitchPage} />

                </div>
            );
        } else {
            app_ids_grid = (
                <div className='grid-div' style={gridDivStyle}>
                </div>
            );
        }

        return (

            <div className='main-div' >

                <div className='titles-div' style={titlesDivStyle} >

                    <img src='assets/Logo_alpha.png' className='rc-logo' />
                    <span className='title' > application name: </span>

                </div>

                {app_ids_grid}

            </div>

        );
    }

});

module.exports = AppIdPage;
