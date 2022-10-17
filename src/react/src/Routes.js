import React from 'react';
import {Route} from 'found';
import {graphql} from 'react-relay';
import {harnessApi} from './index';
import Loading from './Components/Loading';
import HomePage from './Pages/HomePage';
import MyCandidates from './Pages/MyCandidates';
import ViewCandidate from './Pages/ViewCandidate';

const handleRender = ({Component, props}) => {
    if (!Component || !props)
        return <Loading/>;

    // if (!harnessApi.hasAuthToken())
    //     throw new RedirectException('/auth/?next=' + props.match.location.pathname);
  
    return <Component data={props} {...props}/>;
};

function getRoutes() {
    return (
        <Route>
            <Route
                Component={HomePage}
                render={handleRender}/>
            <Route
                path="candidates"
                query={graphql`
                    query Routes_JobList_Query(
                      $count: Int!,
                      $cursor: String,
                    ) {
                      ...MyCandidates_data
                    }
                `}
                prepareVariables={() => ({
                    count: 100,
                })}
                environment={harnessApi.getEnvironment('gwcandidate')}
                Component={MyCandidates}
                render={handleRender}/>
        </Route>
    );
}

export default getRoutes;
