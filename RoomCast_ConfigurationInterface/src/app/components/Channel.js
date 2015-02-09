var React = require('react');
var Mui = require('material-ui');
var d3 = require('d3');
var Paper = Mui.Paper;
var FlatButton = Mui.FlatButton;

var lastSelected=null;

/**
 * @prop id
 * @prop name
 * @prop imgPath
 * @prop onClick
 * @prop currentSelectedChannel
 */
var Channel = React.createClass({

    handleSelectedChannel: function() {

        var imgNode = this.refs.channelIcon.getDOMNode();

        if(lastSelected==imgNode) {

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
            lastSelected = imgNode;

            // style selected channel
            imgNode.style.border = '1px solid black';

            // show channel info
        }

    },

    render: function() {

        var pStyle = {
            paddingTop:'3px',
            marginBottom:'0'};

        return (
            <div className='channel-div' onClick={this.handleSelectedChannel}>
                <img className='channel-icon' ref='channelIcon' src={this.props.imgPath}> </img>
                <p style={pStyle}> {this.props.name} </p>
            </div>);

    }

});

module.exports = Channel;

