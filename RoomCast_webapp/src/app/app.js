
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

    document.location.href = 'roomcast://requestLogin';

    window.ReactLogin = function(broker, app_id, run_id) {
        window.nutella = NUTELLA.init(broker, app_id, run_id, 'main-interface');
        window.ReactMain = React.render(<Main />, document.body);
    };

})();
