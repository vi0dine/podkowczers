import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import { Header } from "./components/header/Header.component";

import { HomePage } from "./pages/home-page/Homepage.component";
import { ConcertsPage } from "./pages/concerts-page/ConcertsPage.component";
import { ConcertDetailsPage } from "./pages/concert-details-page/ConcertDetailsPage.component";
import { BlogPage } from "./pages/blog-page/BlogPage.component";
import { PostDetailsPage } from "./pages/post-details-page/PostDetailsPage.component";
import { EventsPage } from "./pages/events-page/EventsPage.component";
import { EventDetailsPage } from "./pages/event-details-page/EventDetailsPage.component";
import { TicketsPage } from "./pages/tickets-page/TicketsPage.component";
import { SignUpPage } from "./pages/signup-page/SignUpPage.component";

function App() {
  return (
    <div className="App">
        <Header/>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/blog' component={BlogPage} />
            <Route path='/blog/:id' component={PostDetailsPage} />
            <Route exact path='/concerts' component={ConcertsPage} />
            <Route path='/concerts/:id' component={ConcertDetailsPage} />
            <Route exact path='/events' component={EventsPage} />
            <Route exact path='/events/:id' component={EventDetailsPage} />
            <Route path='/events/:id/tickets' component={TicketsPage} />
            <Route path='/signup' component={SignUpPage} />
        </Switch>
    </div>
  );
}

export default App;
