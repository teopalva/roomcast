
var React = require('react');
var Mui = require('material-ui');
var TextField = Mui.TextField;
var RaisedButton = Mui.RaisedButton;

var BrokerPage = React.createClass({

    handleSetBroker: function() {
        var broker = this.refs.textFieldBroker.getValue();
        if(broker.length !== 0) {
            console.log('set broker', broker);
            // store in iPad
            this.props.onSwitchPage(2);
        } else {
            this.setErrorText('You must set a broker.');
        }
    },

    getInitialState: function () {
        return  {
            errorText: null
        }
    },

    setErrorText: function(value) {
        this.setState({
            errorText: value
        });
    },

    validateInput:  function() {
        var input = this.refs.textFieldBroker.getValue();
        if (input.length === 0) {
            this.setErrorText('You must set a broker.');
        } else {
            this.setErrorText(null);
        }
    },

    render: function () {
        var self = this;

        var titlesDivStyle = {
            height: window.innerHeight * (1/3)
        };

        var gridDivStyle = {
            height: window.innerHeight * (2/3)
        };

        return (

            <div className='main-div' >

                <div className='titles-div' style={titlesDivStyle} >

                    <span className='title' > RoomCast login </span>
                    <span className='title' > broker: </span>

                </div>

                <div className='broker-div titles-div' style={gridDivStyle} >

                    <div className='text-field-broker'>
                        <TextField
                            ref='textFieldBroker'
                            hintText={'broker IP address'}
                            multiLine={false}
                            errorText={this.state.errorText}
                            onChange={this.validateInput} />
                    </div>

                </div>

                <div className='submit-broker'>
                    <RaisedButton
                        label='Submit'
                        secondary={true}
                        onTouchTap={this.handleSetBroker} />
                </div>

            </div>

        );
    }

});

module.exports = BrokerPage;
