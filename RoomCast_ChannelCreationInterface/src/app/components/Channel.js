
var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var NutellaMixin = require('./NutellaMixin');
var AnimationMixin = require('./AnimationMixin');

/**
 * @prop channelId
 * @prop channel
 * @prop selected
 * @prop onselectedChannel
 */
var Channel = React.createClass({

    mixins: [NutellaMixin, AnimationMixin],

    componentDidMount: function() {
        var self = this;

        /*
        // Style the icon in the corner of the card
        self.addCSSClass(self.refs.cornerIcon.getDOMNode(), 'hidden');
        this.refs.cardContainer.getDOMNode().onmouseover = function() {
            self.addCSSClass(self.refs.cornerIcon.getDOMNode(), 'shown');
        };

        this.refs.cardContainer.getDOMNode().onmouseout = function() {
            self.removeCSSClass(self.refs.cornerIcon.getDOMNode(), 'shown');
        };
*/
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
    },

    flipCard: function() {
        var self = this;
        this.setState({
            flipped: true
        });
        function callbackFlip() {
            self.addCSSClass(self.refs.cardFront.getDOMNode(), 'hidden-card');
            self.removeCSSClass(self.refs.cardBack.getDOMNode(), 'hidden-card');
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
            self.addCSSClass(self.refs.cardBack.getDOMNode(), 'hidden-card');
            self.removeCSSClass(self.refs.cardFront.getDOMNode(), 'hidden-card');
            self.flipY(self.refs.card.getDOMNode(), 90, 0, true);
        }
        this.flipY(this.refs.card.getDOMNode(), 180, 90, true, callbackFlip);
    },

    handleDeleteCard: function() {
        this.props.onDeleteCard(this.props.channelId);
    },

    addCSSClass: function(node, class_) {
        node.className += ' ' + class_;
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
            cornerIcon = <div className='corner-icon delete-icon' > <i className="fa fa-times" ref='cornerIcon' onTouchTap={this.handleDeleteCard}></i> </div>;
        }
        else {
            cardStyle = ' detail-card-style';
            cornerIcon = <div className='corner-icon flip-icon' > <i className="fa fa-info-circle" ref='cornerIcon' onTouchTap={this.flipCard} ></i> </div>;
        }

        var style = {
            backgroundImage: 'url(' + this.getUrlForAsset(this.props.channel.screenshot, 'screenshot') + ')',
            backgroundSize: '100% 100%'
        };

        return (

            <div className={'card-container' + cardStyle} ref='cardContainer' >

                <div className='card' ref='card'>

                    <div className={'card-front' } ref='cardFront'>

                        {cornerIcon}

                        <Paper className='channel' style={style} onTouchTap={onTouchTap} >

                            <div className='channel-div'>

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

                    <div className='card-back hidden-card' ref='cardBack'>
                        <Paper className='channel'>

                            <div className='corner-icon flip'> <i className="fa fa-info-circle" onTouchTap={this.flipCardBack} ></i> </div>

                            text

                        </Paper>

                    </div>

                </div>

            </div>


        );

    }

});

module.exports = Channel;

