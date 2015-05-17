
var React = require('react');
var Mui = require('material-ui');
var TextField = Mui.TextField;
var RaisedButton = Mui.RaisedButton;

var BrokerPage = React.createClass({

    componentWillMount: function() {
        this.updateDimensions();
    },

    componentDidMount: function() {
        window.addEventListener("resize", this.updateDimensions);
    },

    componentWillUnmount: function() {
        window.removeEventListener("resize", this.updateDimensions);
    },

    updateDimensions: function() {
        this.setState({innerHeight: window.innerHeight});
    },

    handleSetBroker: function() {
        var self = this;
        var broker = this.refs.textFieldBroker.getValue();
        if(broker.length !== 0) {

            // Start nutella
            window.nutella = NUTELLA.init(broker, null, null, 'login-screens', function() {
                self.setErrorText('Invalid broker.');
                self.props.onSwitchPage(1);
            });

            // Store
            window.ReactMain.login.broker = broker;
            this.props.onSwitchPage(2);

        } else {
            this.setErrorText('You must set a broker.');
        }
    },

    getInitialState: function () {
        return  {
            errorText: null,
            innerHeight: window.innerHeight
        }
    },

    setErrorText: function(value) {
        this.setState({
            errorText: value
        });
    },

    validateInput:  function() {
        var input = this.refs.textFieldBroker.getValue();
        console.log(input);
        if (input.length === 0) {
            this.setErrorText('You must set a broker.');
        } else {
            this.setErrorText(null);
        }
    },

    render: function () {
        var self = this;

        var titlesDivStyle = {
            height: this.state.innerHeight * (1/3)
        };

        var gridDivStyle = {
            height: this.state.innerHeight * (2/3)
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
