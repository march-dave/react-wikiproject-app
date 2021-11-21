import React, { useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import History from './History';
import MarkdownEd from './MarkdownEd';
import View from './View';
import Diff from './Diff';
import Search from'./Search';
import SearchList from'./SearchList';
import './App.css';

function App() {
    return (
      <div className="App">
        <Search />
        <nav className="nav-container">
            <div className="nav-item nav-button"><Link to="/">Home</Link> </div>
            <div className="nav-item nav-button"><Link to="/history">History</Link> </div>
        </nav>

        <Switch>
        <Route exact path="/"> 
            <div className="contents">
                <MarkdownEd />
            </div>
        </Route>

        <Route path="/history"> <History/> </Route> 

        <Route path="/view/:id">
            <div>View</div>
            <div><View /></div>
        </Route>

        <Route path="/diff/:id">
            <div>Diff</div>
            <div><Diff /></div>
        </Route>

        <Route path="/searchList/:id">
            <div>Search</div>
            <div><SearchList /></div>
        </Route>

        </Switch>

      </div>
    )
  }

export default App;