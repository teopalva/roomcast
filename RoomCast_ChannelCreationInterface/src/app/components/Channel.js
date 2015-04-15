
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

    render: function() {

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

