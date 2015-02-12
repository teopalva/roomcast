var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var ChannelInfo = require('./ChannelInfo');
var ChannelsList = require('./ChannelsList');
var RaisedButton = Mui.RaisedButton;
var Dialog = Mui.Dialog;
var FlatButton = Mui.FlatButton;

var ChannelsPanel = React.createClass({

    handleSaveChanges: function() {
        this.props.onSavedChanges();
    },

    handleUndoChanges: function() {
        // TODO implement
        console.log('Undo!');
    },

    handleSelectedChannel: function(ch) {
        this.props.onSelectedChannel(ch);
    },

    enableDialog: function() {
        this.refs.dialog.show();
    },

    disableDialog: function() {
        this.refs.dialog.hide();
    },


    render: function() {

        var dialogActions = [
            <FlatButton
                label='cancel'
                secondary={true}
                onTouchTap={this.disableDialog} />,
            <FlatButton
                label='confirm'
                primary={true}
                onTouchTap={this.handleSaveChanges} />
        ];

        return (
            <div className="channels-panel">

                <Paper className='channels-panel-paper'>

                    <div className='channels-catalogue-title-div-outer'>
                        <div className='channels-catalogue-title-div-middle'>
                            <div className='channels-catalogue-title-div-inner'>
                                <p> Channels Catalogue </p>
                            </div>
                        </div>
                    </div>

                    <ChannelInfo
                        selectedChannel={this.props.selectedChannel} />

                    <ChannelsList
                        channels={this.props.channels}
                        onSelectedChannel={this.handleSelectedChannel}
                        selectedChannel={this.props.selectedChannel} />

                    <div className='channels-panel-save-buttons-div-outer' >

                        <div className='channels-panel-save-buttons-div-inner' >

                            <div className='div-button-container-final-button'>
                                <RaisedButton label='Save changes' secondary={true} onTouchTap={this.enableDialog} />
                            </div>

                            <div className='div-button-container-final-button'>
                                <RaisedButton label='Undo changes' primary={true} onTouchTap={this.handleUndoChanges} />
                            </div>

                        </div>

                    </div>

                </Paper>

                <Dialog ref='dialog' actions={dialogActions} > </Dialog>

            </div> );
    }

});

module.exports = ChannelsPanel;

