import React from 'react';
import {Route, RedirectException} from 'found';
import {graphql} from 'react-relay';
import {harnessApi} from './index';
import Loading from './Components/Loading';
import HomePage from './Pages/HomePage';
import MyCandidates from './Pages/MyCandidates';
import MyCandidateGroups from './Pages/MyCandidateGroups';
import ViewCandidate from './Pages/ViewCandidate';
import NewCandidates from './Pages/NewCandidates';
import ViewCandidateGroup from './Pages/ViewCandidateGroup';

const handleRender = ({Component, props}) => {
    if (!Component || !props)
        return <Loading/>;

    if (!harnessApi.hasAuthToken())
        throw new RedirectException('/auth/?next=' + props.match.location.pathname);
  
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
                    query Routes_Candidates_Query(
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
            <Route
                path="candidate-groups"
                query={graphql`
                    query Routes_CandidateGroups_Query(
                      $count: Int!,
                      $cursor: String,
                    ) {
                      ...MyCandidateGroups_data
                    }
                `}
                prepareVariables={() => ({
                    count: 100,
                })}
                environment={harnessApi.getEnvironment('gwcandidate')}
                Component={MyCandidateGroups}
                render={handleRender}/>
            <Route
                path="candidate/:candidateId/"
                environment={harnessApi.getEnvironment('gwcandidate')}
                Component={ViewCandidate}
                query={graphql`
                    query Routes_ViewCandidate_Query ($candidateId: ID!){
                      ...ViewCandidate_data @arguments(candidateId: $candidateId)
                    }
                `}
                prepareVariables={(params) => ({
                    candidateId: params.candidateId
                })}
                render={handleRender}
            />
            <Route
                path="candidate-group/:candidateGroupId/"
                environment={harnessApi.getEnvironment('gwcandidate')}
                Component={ViewCandidateGroup}
                query={graphql`
                    query Routes_ViewCandidateGroup_Query ($candidateGroupId: ID!){
                      ...ViewCandidateGroup_data @arguments(candidateGroupId: $candidateGroupId)
                    }
                `}
                prepareVariables={(params) => ({
                    candidateGroupId: params.candidateGroupId
                })}
                render={handleRender}
            />
            <Route
                path="new-candidates"
                environment={harnessApi.getEnvironment('gwcandidate')}
                Component={NewCandidates}
                render={handleRender}
            />
        </Route>
    );
}

export default getRoutes;
