var React = require('react');
var Mui = require('material-ui');
var d3 = require('d3');
var Channel = require('./Channel');

/**
 * @prop groups
 * @prop playing
 */
var ChannelSelector = React.createClass({

    componentDidMount: function() {

    },

    getInitialState: function() {
        return {

        };
    },

    render: function() {

        var channels = [];
        for (ch in this.props.channels) {
            if (this.props.channels.hasOwnProperty(ch)) {
                channels.push(
                    <div>
                        <Channel
                            channel={this.props.channels[ch]} />
                    </div>);
            }
        }

        return (

            <div className='channel-selector' >

            {channels}

            </div>

        );
    }


});

module.exports = ChannelSelector;