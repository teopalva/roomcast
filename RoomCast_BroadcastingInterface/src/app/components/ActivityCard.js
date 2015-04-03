
var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var d3 = require('d3');

var ActivityCard = React.createClass({

    handleTouchCard: function(e) {
        var self = this;

        // TODO move after counter
        nutella.net.publish('currentConfig/update', +this.props.configId);

    },

    componentDidMount: function() {
        var self= this;

        // TODO touchstart
        d3.selectAll('.activity-card').on('mousedown', function() {

            var svg = d3.select(this)
                .select('.card-svg')
                .append('svg')
                .style({
                    width: self.props.cardStyle['width'],
                    height: self.props.cardStyle['height']
                });

            svg.append('circle')
                .attr({
                    cx: self.props.cardStyle['width'] / 2,
                    cy: self.props.cardStyle['height'] / 2,
                    r: '50px'
                })
                .style({
                    fill: 'red'
                });

        });

        d3.selectAll('.activity-card').on('mouseup', function() {
            d3.selectAll('.activity-card')
                .select('.card-svg')
                .select('svg')
                .remove();
        });


    },

    componentWillReceiveProps: function() {
        if(+this.props.currentConfigId === +this.props.configId) {
            this.setState({
                isSelected: true
            });
        }

    },

    getInitialState: function () {
        return  {
            isSelected: false
        }
    },

    render: function () {

        var selectedCardStyle = {
            //backgroundColor: '#00bcd4',
            color: 'white'
        };

        // Copy
        var cardStyle = {};
        for(var p_ in this.props.cardStyle) {
            cardStyle[p_] = this.props.cardStyle[p_];
        }

        var className='activity-card';

        // Add properties if selected
        if(this.state.isSelected) {
            className += ' activity-card-selected';
            for(var p in selectedCardStyle) {
                cardStyle[p] = selectedCardStyle[p];
            }

        }

        // onTouchTap={this.handleTouchCard}

        return (

            <Paper className={className} style={cardStyle}  >

                <div className='card-svg'> </div>

                <div className='card-name'>

                    <span> {this.props.configName} </span>

                </div>



            </Paper>);
    }

});

module.exports = ActivityCard;
