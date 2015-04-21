
var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var NutellaMixin = require('./NutellaMixin');
var AnimationMixin = require('./AnimationMixin');
var ColorPicker = require('./ColorPicker');

/**
 * @prop channelId
 * @prop channel
 * @prop selected
 * @prop onselectedChannel
 */
var Channel = React.createClass({

    mixins: [NutellaMixin, AnimationMixin],

    componentDidMount: function() {

    },

    /**
     * State
     * @returns selected: boolean
     *          side: 'front' or 'back'
     */
    getInitialState: function () {
        return  {
            selected: false,
            flipped: false,
            modifyField: null
        }
    },

    setModifyField: function(field) {
        console.log('setting', field);
        this.setState({
            modifyField: field
        });
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
            this.setModifyField(null);
        }

    },

    handleSelectChannel: function() {
        this.props.onSelectChannel(this.props.channelId);
    },

    handleModifyIcon: function() {
        this.setModifyField('icon');
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

        var colorPicker = null;
        var onTouchTapIcon = this.handleModifyIcon;

        var style = {
            backgroundImage: 'url(' + this.getUrlForAsset(this.props.channel.screenshot, 'screenshot') + ')',
            backgroundSize: '100% 100%'
        };

        var iconStyle = {
            backgroundColor: this.props.channel.icon
        };

        if(this.state.selected) {
            if (this.state.modifyField === 'icon') {
                colorPicker =
                    <ColorPicker ref='colorPicker'
                                 onPickColor={this.props.onPickColor}/>;
                onTouchTapIcon = null;
            }
        }

        var cardBack =
            <div className='card-back hidden-card' ref='cardBack'>

                <Paper className='channel'>

                    <div className='corner-icon flip-icon'> <i className="ion ion-android-settings" onTouchTap={this.flipCardBack} ></i> </div>

                    text

                </Paper>

            </div>;

        var catalogueCard =
            <div className='card-container hovering-layer catalogue-card-style' ref='cardContainer' >

                <div className='card' ref='card'>

                    <div className='card-front' ref='cardFront'>

                        <div className='corner-icon delete-icon' > <i className="fa fa-times" ref='cornerIcon' onTouchTap={this.handleDeleteCard}></i> </div>

                        <Paper className='channel' style={style} onTouchTap={this.handleSelectChannel} >

                            <div className='channel-div'>

                                <div className='channel-caption'>

                                    <div className='icon-name-wrapper'>

                                        <div className='channel-icon' ref='channelIcon' style={iconStyle} > </div>

                                        <div className='name-wrapper'>
                                            <p className='channel-name'> {this.props.channel.name} </p>
                                            <p className='channel-description'> description... </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </Paper>

                    </div>

                    {cardBack}

                </div>

            </div>;

        var detailCard =
            <div className='card-container detail-card-style' ref='cardContainer' >

                <div className='card' ref='card'>

                    <div className='card-front' ref='cardFront'>

                        {colorPicker}

                        <div className='corner-icon flip-icon' > <i className="ion ion-android-settings" ref='cornerIcon' onTouchTap={this.flipCard} ></i> </div>

                        <Paper className='channel' style={style} >

                            <div className='channel-div'>

                                <div className='channel-caption'>

                                    <div className='icon-name-wrapper'>

                                        <div className='channel-icon modifiable' ref='channelIcon' style={iconStyle} onTouchTap={onTouchTapIcon} > </div>

                                        <div className='name-wrapper'>
                                            <p className='channel-name'> {this.props.channel.name} </p>
                                            <p className='channel-description'> description... </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </Paper>

                    </div>

                    {cardBack}

                </div>

            </div>;

        return this.state.selected? detailCard : catalogueCard;

    }

});

module.exports = Channel;

