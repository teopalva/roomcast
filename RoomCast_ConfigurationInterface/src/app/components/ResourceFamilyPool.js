var React = require('react');
var PoolHeader = require('./PoolHeader');
var PoolRow = require('./PoolRow');
var Mui = require('material-ui');
var Paper = Mui.Paper;

var ResourceFamilyPool = React.createClass({

    render: function(){

        var self=this;
        var rows=[];
        this.props.resources.forEach(function(resource){
            rows.push(<PoolRow resourceId={resource} channels={self.props.channels} />);
        });

        return (

            <div className="resource-family-pool">

                <Paper>

                    <table>

                        <thead>

                            <PoolHeader familyName={this.props.familyName} />

                        </thead>

                        <tbody>{rows}</tbody>

                    </table>

                </Paper>


            </div> );

    }

});

module.exports = ResourceFamilyPool;

