
var React = require('react');
var Mui = require('material-ui');
var FloatingActionButton = Mui.FloatingActionButton;

var Player = React.createClass({

    componentDidMount: function() {

    },

    componentWillUnmount: function() {
        console.log('UNMOUNTING player ' + this.props.name);
    },

    getInitialState: function () {
        return  {
            playing: true
        }
    },

    componentWillReceiveProps: function(props) {
        this.setState({playing: props.playing});
    },

    render: function () {

        var playerStyle = null;
        var buttonStyle = null;
        if(!this.state.playing) {
            playerStyle = {
                opacity: 0,
                zIndex: 50,
                pointerEvents: 'none'
            };
            buttonStyle = {
                zIndex: 50
            };
        } else {
            playerStyle = {
                opacity: 1,
                zIndex: 200,
                pointerEvents: 'all'
            };
            buttonStyle = {
                zIndex: 210
            };
        }

        return (

            <div className='player' style={playerStyle} >

                <div className='back-button' style={buttonStyle} >
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