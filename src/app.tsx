import * as React from "react";
import { render } from 'react-dom';

import './app.scss';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello from ReactTS</h1>
            </div>
        );
    }
}

render(<App />, document.getElementById('app')); 
