import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends Component {
    render(){
        return (
        <div>
            Hello World Training
        </div>);
    }
}

ReactDOM.render(
    <App />, 
    document.getElementById('app'));