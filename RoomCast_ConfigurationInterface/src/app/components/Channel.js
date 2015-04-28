var React = require('react');
var Mui = require('material-ui');
var d3 = require('d3');
var Paper = Mui.Paper;

/**
 * @prop id
 * @prop name
 * @prop imgPath
 * @prop onSelectedChannel
 * @prop currentSelectedChannel
 * @prop belongsTo
 */
var Channel = React.createClass({

    /**
     * Manages the interactions with the channels.
     */
    handleSelectedChannel: function() {

        var self = this;
        var imgNode = this.refs.channelIcon.getDOMNode();
        var currentSelected = this.props.currentSelectedChannel;

        /**
         * Returns true if the clicked channel, has the same id, belongs to the channels list and the user is coming from the resources pool.
         * @param id
         * @param belongsTo
         * @returns {boolean}
         */
        var isRespectiveChannel = function(id, belongsTo) {
            return id === self.props.id && belongsTo === 'resources' && self.props.belongsTo === 'channels';
        };

        if(currentSelected && currentSelected.id===this.props.id && (currentSelected.imgNode == imgNode || isRespectiveChannel(currentSelected.id, currentSelected.belongsTo))) {

            // set not selected
            this.props.onSelectedChannel(null);

        } else {

            // set selected channel (state)
            var newSelected = {
                id: this.props.id,
                belongsTo: this.props.belongsTo,
                imgNode: imgNode,
                channel: this,
                channelData: this.props.channelData
            };
            this.props.onSelectedChannel(newSelected);
        }

    },

    render: function() {

        var iconStyle = {
            backgroundColor: this.props.channelData.icon
        };

        // style channels in channels list
        if(this.props.belongsTo==='channels') {
            if(this.props.respectiveSelected) {
                iconStyle.border = '3px solid black';
            } else {
            }
        }

        // style channels in resources list
        if(this.props.belongsTo==='resources') {
            var currentSelected = this.props.currentSelectedChannel;
            if(currentSelected && (currentSelected.channel == this) && currentSelected.id===this.props.id) {
                iconStyle.border = '3px solid black';
            } else {
            }
        }

        var broker = query_parameters.broker, runId = 'RoomQuake', imgType = 'screenshot_rect';

        return (
            <div className='channel-item' onClick={this.handleSelectedChannel}>
                <div className='channel-icon' ref='channelIcon' style={iconStyle} > </div>
                <span> {this.props.name} </span>
            </div>);

    }

});

module.exports = Channel;

