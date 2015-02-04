var React = require('react');
var ResourceFamilyPool = require('./ResourceFamilyPool');

var ResourcesPanel = React.createClass({
    render: function(){

        var pools = [];
        // TODO add keys to array
        var channels = this.props.channels;
        this.props.resources.forEach(function(family){
            pools.push(<ResourceFamilyPool familyName={family.family} resources={family.items} channels={channels} />);
        });

        return (
            <div className="resources-panel">

                {pools}

            </div> );
    }

});

module.exports = ResourcesPanel;

