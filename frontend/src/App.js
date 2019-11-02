import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import { HomePage } from "./pages/home-page/homepage.component";
import { ConcertsPage } from "./pages/concerts-page/concerts-page.component";
import { ConcertDetailsPage } from "./pages/concert-details-page/concert-detail-page.component";
import { BlogPage } from "./pages/blog-page/blog-page.component";
import { PostDetailsPage } from "./pages/post-details-page/post-details-page.component";
import { EventsPage } from "./pages/events-page/events-page.component";
import { EventDetailsPage } from "./pages/event-details-page/event-details-page.component";
import { TicketsPage } from "./pages/tickets-page/tickets-page.component";
import { SignUpPage } from "./pages/signup-page/signup-page.component";

function App() {
  return (
    <div className="App">
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
