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
                channel: this
            };
            this.props.onSelectedChannel(newSelected);

            // show channel info
            // TODO
        }

    },

    render: function() {

        var pStyle = {
            paddingTop:'3px',
            marginBottom:'0'};

        var imgStyle = null;
        var selectedStyle = {
            border: '1px solid black'
        };
        var deselectedStyle = {
            border: null
        };

        // style channels in channels list
        if(this.props.belongsTo==='channels') {
            if(this.props.respectiveSelected) {
                imgStyle = selectedStyle;
            } else {
                imgStyle = deselectedStyle;
            }
        }
/*
        // style channels in resources list
        if(this.props.belongsTo==='resources') {
            if(this.props.resourcesSelected) {
                imgStyle = selectedStyle;
            } else {
                imgStyle = deselectedStyle;
            }
        }
*/
        //console.log(this.getDOMNode());

        // style channels in resources list
        if(this.props.belongsTo==='resources') {
            var currentSelected = this.props.currentSelectedChannel;
            if(currentSelected && (currentSelected.channel == this) && currentSelected.id===this.props.id) {
                imgStyle = selectedStyle;
            } else {
                imgStyle = deselectedStyle;
            }
        }

        return (
            <div className='channel-div' onClick={this.handleSelectedChannel}>
                <img className='channel-icon' ref='channelIcon' style={imgStyle} src={this.props.imgPath}> </img>
                <p style={pStyle}> {this.props.name} </p>
            </div>);

    }

});

module.exports = Channel;

