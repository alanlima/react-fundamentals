import React, { Component } from 'react';
import Popular from './popular';
import Home from './home';
import Battle from './battle';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import Results from './results'

class App extends Component {
    render(){
        return (
            <BrowserRouter>
                <div className="container">
                    <Nav />
                    
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path='/popular' component={Popular} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/results' component={Results} />
                        <Route render={function(){
                            return <p>Not Found</p>;
                        }} />
                    </Switch>
                </div>
            </BrowserRouter>
            )
    }
}

module.exports = App;