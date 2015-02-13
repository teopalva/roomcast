var React = require('react');
var Mui = require('material-ui');
var d3 = require('d3');
var Paper = Mui.Paper;

var lastSelected=null;

/**
 * @prop id
 * @prop name
 * @prop imgPath
 * @prop onSelectedChannel
 * @prop currentSelectedChannel
 * @prop belongsTo
 */
var Channel = React.createClass({

    handleSelectedChannel: function() {

        var self = this;
        var imgNode = this.refs.channelIcon.getDOMNode();

        /**
         * Returns true if the clicked channel, has the same id, belongs to the channels list and the user is coming from the resources pool.
         * @param id
         * @param belongsTo
         * @returns {boolean}
         */
        var isRespectiveChannel = function(id, belongsTo) {
            return id === self.props.id && belongsTo === 'resources' && self.props.belongsTo === 'channels';
        };

        if(lastSelected && (lastSelected[0] == imgNode || isRespectiveChannel(lastSelected[1], lastSelected[2]))) {

            // remove style from all channels
            d3.selectAll('.channel-icon').style('border', null);

            // set not selected
            this.props.onSelectedChannel(null);

            // reset last selected
            lastSelected = null;

        } else {

            // remove style from all channels
            d3.selectAll('.channel-icon').style('border', null);

            // set selected channel (state)
            this.props.onSelectedChannel(this.props.id);

            // save last selected DOM element
            lastSelected = [imgNode, this.props.id, this.props.belongsTo];

            // style selected channel
            imgNode.style.border = '1px solid black';

            // style respective channel
            console.log(d3.selectAll('.channel-from-list'));

            // show channel info
            // TODO
        }

        // if click on channel from resources pool, propagate info to channels list
        if(this.props.belongsTo==='resources') {
            this.props.onSelectedChannel(this.props.id);
        }

    },

    render: function() {

        var pStyle = {
            paddingTop:'3px',
            marginBottom:'0'};

        var selectedStyle = {
            border: '1px solid black'
        };

        var deselectedStyle = {
            border: null
        };

        var imgStyle = null;

        return (
            <div className='channel-div' onClick={this.handleSelectedChannel}>
                <img className='channel-icon' ref='channelIcon' style={imgStyle} src={this.props.imgPath}> </img>
                <p style={pStyle}> {this.props.name} </p>
            </div>);

    }

});

module.exports = Channel;

