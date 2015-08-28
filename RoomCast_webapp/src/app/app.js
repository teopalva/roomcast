
(function () {
    var React = require('react'),
        injectTapEventPlugin = require("react-tap-event-plugin"),
        Main = require('./components/main.js'); // Our custom react component

    //Needed for React Developer Tools
    window.React = React;

    window.getSelection().removeAllRanges();

    //Needed for onTouchTap
    //Can go away when react 1.0 release
    //Check this repo:
    //https://github.com/zilverline/react-tap-event-plugin
    injectTapEventPlugin();

    // Render the main app react component into the document body.
    // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
    //window.ReactMain = 'Main component';

    var iOS = (window.navigator.userAgent.match(/(iPad|iPhone)/g) ? true : false);
    var props;
    /*if(iOS) {
        window.ReactLogin = function(broker, app_id, run_id) {
            props = {params:[broker, app_id, run_id]};
            window.ReactMain = React.render(React.createElement(Main, props), document.body);
        };
        document.location.href = 'roomcast://requestLogin';
    } else {*/
        props = {params:['52.1.142.215', 't1', 'default']};
        window.ReactMain = React.render(React.createElement(Main, props), document.body);
    //}

})();
