
var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var NutellaMixin = require('./NutellaMixin');
var AnimationMixin = require('./AnimationMixin');

/**
 * @prop channel
 */
var Channel = React.createClass({

    mixins: [NutellaMixin, AnimationMixin],

    componentDidMount: function() {

    },

    handleClick: function() {

    },

    /**
     * State
     * @returns selected: boolean
     *          side: 'front' or 'back'
     */
    getInitialState: function () {
        return  {
            selected: false,
            flipped: false
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.selected) {
            this.setState({
                selected: true
            });
        } else {
            this.setState({
                selected: false
            });
        }
    },

    handleSelectChannel: function() {
        this.props.onSelectChannel(this.props.channelId);
        console.log('click');
        //document.location.href = '#detail';

    },

    flipCard: function() {
        var self = this;
        this.setState({
            flipped: true
        });
        function callbackFlip() {
            self.addCSSClass(self.refs.cardFront.getDOMNode(), ' hidden');
            self.removeCSSClass(self.refs.cardBack.getDOMNode(), 'hidden');
            self.flipY(self.refs.card.getDOMNode(), 90, 180, false);
        }
        this.flipY(this.refs.card.getDOMNode(), 0, 90, false, callbackFlip);
    },

    flipCardBack: function() {
        var self = this;
        this.setState({
            flipped: false
        });
        function callbackFlip() {
            self.addCSSClass(self.refs.cardBack.getDOMNode(), ' hidden');
            self.removeCSSClass(self.refs.cardFront.getDOMNode(), 'hidden');
            self.flipY(self.refs.card.getDOMNode(), 90, 0, true);
        }
        this.flipY(this.refs.card.getDOMNode(), 180, 90, true, callbackFlip);
    },

    addCSSClass: function(node, class_) {
        node.className += class_;
    },

    removeCSSClass: function(node, class_) {
        var regex = new RegExp("(?:^|\\s)" + class_ + "(?!\\S)", "g");
        node.className = node.className.replace(regex, '');
    },

    render: function() {

        var cardStyle;
        var onTouchTap;
        var cornerIcon;

        if(!this.state.selected) {
            cardStyle = ' catalogue-card-style';
            cardStyle += ' hovering-layer';
            onTouchTap = this.handleSelectChannel;
            cornerIcon = <div className='corner-icon'> <i className="fa fa-times"></i> </div>;
        }
        else {
            cardStyle = ' detail-card-style';
            cornerIcon = <div className='corner-icon'> <i className="fa fa-info-circle" onTouchTap={this.flipCard} ></i> </div>;
        }

        var style = {
            backgroundImage: 'url(' + this.getUrlForAsset(this.props.channel.screenshot, 'screenshot') + ')',
            backgroundSize: '100% 100%'
        };

        return (

            <div className={'card-container' + cardStyle}>

                <div className={'card'} ref='card'>

                    <div className='card-front' ref='cardFront'>

                        <Paper className={'channel' } style={style} onTouchTap={onTouchTap} >

                            <div className='channel-div'>

                                {cornerIcon}

                                <div className='channel-caption'>

                                    <div className='icon-name-wrapper'>

                                        <img className='channel-icon'> </img>

                                        <div className='name-wrapper'>
                                            <p className='channel-name'> {this.props.channel.name} </p>
                                            <p className='channel-description'> description... </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </Paper>

                    </div>

                    <div className='card-back hidden' ref='cardBack'>
                        <Paper className='channel'>
                            <div className='corner-icon'> <i className="fa fa-info-circle" onTouchTap={this.flipCardBack} ></i> </div>;

                            text

                        </Paper>

                    </div>

                </div>

            </div>


        );

    }

});

module.exports = Channel;

