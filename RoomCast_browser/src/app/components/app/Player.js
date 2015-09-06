
var React = require('react');
var Mui = require('material-ui');
var FloatingActionButton = Mui.FloatingActionButton;

var Player = React.createClass({

    componentDidMount: function() {
    },

    getInitialState: function () {
        return  {
            playing: true
        }
    },

    render: function () {

        var playerStyle = null;
        if(!this.state.playing) {
            playerStyle = {opacity:0};
        }

        return (

            <div className='player' style={playerStyle} >

                <div className='back-button' >
                    <FloatingActionButton
                        secondary={true}
                        mini={true}
                        onTouchTap={this.props.onBackButton} >

                        <i className="icon ion-plus-round" ></i>

                    </FloatingActionButton>
                </div>

                <iframe className='channel-frame' src={this.props.url} > </iframe>

            </div>

        );
    }

});

module.exports = Player;