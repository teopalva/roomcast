
var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var iOSMixin = require('./iOSMixin');

var IdentityCard = React.createClass({

    mixins: [iOSMixin],

    componentDidMount: function() {
        var self= this;
        this._colorSelected = '#00bcd4';

    },

    getInitialState: function () {
        return  {
            isSelected: false
        }
    },

    handleSelectedIdentity: function() {
        var self = this;

        if(!this.props.hasBeenSelected) {

            this.props.onSelectedIdentity(true);

            // Show selection
            this.setState({
                isSelected: true
            });

            var callback = function() {
                if(self.props.type === 'app_id') {
                    var actionParameters = {
                        app_id: self.props.name
                    };
                    self.iOScall('storeLoginValues', actionParameters);
                    self.props.onSwitchPage(3, self.props.name);
                } else {
                    if(self.props.type === 'run_id') {
                        actionParameters = {
                            run_id: self.props.name
                        };
                        self.iOScall('storeLoginValues', actionParameters);
                        self.iOScall('login');
                    }
                }
            };
            setTimeout(callback, 500);
        }

    },

    render: function () {

        var selectedCardStyle = {
            backgroundColor: this._colorSelected,
            color: 'white'
        };

        // Copy
        var cardStyle = {};
        for(var p_ in this.props.cardStyle) {
            cardStyle[p_] = this.props.cardStyle[p_];
        }

        var className='identity-card';

        // Add properties if selected
        if(this.state.isSelected) {
            className += ' identity-card-selected';
            for(var p in selectedCardStyle) {
                cardStyle[p] = selectedCardStyle[p];
            }

        }

        return (

            <Paper className={className} style={cardStyle} onTouchTap={this.handleSelectedIdentity}  >

                <div className='card-name'>

                    <span> {this.props.name} </span>

                </div>

            </Paper>);
    }

});

module.exports = IdentityCard;
