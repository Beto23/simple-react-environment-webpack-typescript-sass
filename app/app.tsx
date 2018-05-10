import * as React from "react";
import { render } from "react-dom";

// common styles
import "./styles/common.scss";

export default class App extends React.Component<{}, any> {

    public render() {
        return (
            <h1 className="title">Hello React</h1>
        );
    }
}

render((
    <App />
), document.getElementById("app"));

module.hot.accept();
