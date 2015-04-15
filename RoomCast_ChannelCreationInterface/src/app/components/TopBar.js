
var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var RaisedButton = Mui.RaisedButton;

var TopBar = React.createClass({

    render: function() {

        return (
            <div className='top-bar'>

                <Paper>

                    <div className='channels-panel-save-buttons-div-outer' >
                        <div className='channels-panel-save-buttons-div-inner' >

                            <div className='div-button-container-final-button'>
                                <RaisedButton className='save-button' label='Save changes' secondary={true} onTouchTap={this.props.onSave} />
                            </div>

                            <div className='div-button-container-final-button'>
                                <RaisedButton className='undo-button' label='Undo changes' primary={true} onTouchTap={this.props.onUndo} />
                            </div>

                        </div>
                    </div>

                </Paper>

            </div>
        );

    }

});

module.exports = TopBar;

