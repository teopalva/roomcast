
var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var NutellaMixin = require('./NutellaMixin');

/**
 * @prop channel
 */
var Channel = React.createClass({

    mixins: [NutellaMixin],

    componentDidMount: function() {

    },

    handleClick: function() {

    },

    getInitialState: function () {
        return  {
            selected: false
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.selected) {
            this.setState({
                selected: true
            });
        } else {
            this.setState({
                selected: false
            });
        }
    },

    render: function() {

        var cardStyle;

        if(this.state.selected) {
            cardStyle = 'catalogue-card-style';
        }
         else {
                cardStyle = 'zoomed-card-style';
        }

        var style = {
            backgroundImage: 'url(' + this.getUrlForAsset(this.props.channel.screenshot, 'screenshot') + ')',
            backgroundSize: '100% 100%'
        };

        return (
            <Paper className='channel' style={style} ref='channelRef' onTouchTap={this.props.handleClick} >

                <div className='channel-div' >

                    <div className='channel-caption'>

                        <div className='icon-name-wrapper'>

                            <img className='channel-icon'> </img>

                            <div className='name-wrapper'>
                                <p className='channel-name'> {this.props.channel.name} </p>
                                <p className='channel-description'> description... </p>
                            </div>

                        </div>

                    </div>

                </div>

            </Paper>);

    }

});

module.exports = Channel;

