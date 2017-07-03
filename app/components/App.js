import React, { Component } from 'react';
import Popular from 'components/popular';
import Home from 'components/home';
import Battle from 'components/battle';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from 'components/nav';
import Results from 'components/results'

class App extends Component {
    render(){
        return (
            <BrowserRouter>
                <div className="container">
                    <Nav />
                    
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path='/popular/:langId?' component={Popular} />
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