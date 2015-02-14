var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var ChannelInfo = require('./ChannelInfo');
var ChannelsList = require('./ChannelsList');
var RaisedButton = Mui.RaisedButton_;
var Dialog = Mui.Dialog_;
var FlatButton = Mui.FlatButton;

var ChannelsPanel = React.createClass({

    handleSaveChanges: function() {
        this.props.onSavedChanges();
    },

    handleUndoChanges: function() {
        console.log('undo!');
    },

    enableUndoDialog: function() {
        this.refs.undoDialog.show();
    },

    disableUndoDialog: function() {
        this.refs.undoDialog.dismiss();
    },

    handleSelectedChannel: function(ch) {
        this.props.onSelectedChannel(ch);
    },

    enableSaveDialog: function() {
        this.refs.saveDialog.show();
    },

    disableSaveDialog: function() {
        this.refs.saveDialog.dismiss();
    },


    render: function() {

        var customActionsSave = [
            React.createElement(FlatButton, {
                key: 2,
                label: "Confirm",
                secondary: true,
                onTouchTap: this.handleSaveChanges}),
            React.createElement(FlatButton, {
                key: 1,
                label: "Cancel",
                primary: true,
                onTouchTap: this.disableSaveDialog})
        ];

        var customActionsUndo = [
            React.createElement(FlatButton, {
                key: 2,
                label: "Confirm",
                secondary: true,
                onTouchTap: this.handleUndoChanges}),
            React.createElement(FlatButton, {
                key: 1,
                label: "Cancel",
                primary: true,
                onTouchTap: this.disableUndoDialog})
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
                        selectedChannel={this.props.selectedChannel}
                        channels={this.props.channels} />

                    <ChannelsList
                        channels={this.props.channels}
                        onSelectedChannel={this.handleSelectedChannel}
                        selectedChannel={this.props.selectedChannel} />

                    <div className='channels-panel-save-buttons-div-outer' >

                        <div className='channels-panel-save-buttons-div-inner' >

                            <div className='div-button-container-final-button'>
                                <RaisedButton className='save-button' label='Save changes' saveButton={true} onTouchTap={this.enableSaveDialog} />
                            </div>

                            <div className='div-button-container-final-button'>
                                <RaisedButton className='undo-button' label='Undo changes' undoButton={true} onTouchTap={this.enableUndoDialog} />
                            </div>

                        </div>

                    </div>

                </Paper>

                <Dialog ref='saveDialog' actions={customActionsSave} > Do you want to save this configuration? </Dialog>
                <Dialog ref='undoDialog' actions={customActionsUndo} > Do you want to reload the starting configuration? </Dialog>

            </div> );
    }

});

module.exports = ChannelsPanel;

