import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { JobList } from './JobList';
import { JobView } from './JobView';
import { KeelServiceClient } from './api/keel_pb_service';

interface AppState {
    showSidebar?: boolean
}

export default class App extends React.Component<{}, AppState> {
    protected readonly client: KeelServiceClient;

    constructor(p: {}) {
        super(p)
        this.state = {};

        let url = `${window.location.protocol}//${window.location.host}`;
        console.log("server url", url);
        this.client = new KeelServiceClient(url);
    }

    render() {
        return <Router>
            <Switch>
                <Route path="/job">
                    <JobView client={this.client} jobName={window.location.pathname.substring("/job/".length)} />
                </Route>
                <Route path="/">
                    <JobList client={this.client} />
                </Route>
            </Switch>
        </Router >
    }
}

