import React from 'react';
import { MockPayloadGenerator } from 'relay-test-utils';
import { QueryRenderer, graphql } from 'react-relay';
import { render, waitFor, screen } from '@testing-library/react';
import MyCandidateGroups from '../MyCandidateGroups';

/* global environment, router */

describe('my candidate groups page', () => {

    const TestRenderer = () => (
        <QueryRenderer
            environment={environment}
            query={graphql`
                query MyCandidateGroupsTestQuery (
                    $count: Int, 
                    $cursor: String,
                ) @relay_test_operation {
                    ...MyCandidateGroups_data
                }
            `}
            variables={{
                count: 10,
            }}
            render={({ error, props }) => {
                if (props) {
                    return <MyCandidateGroups data={props} match={{}} router={router}/>;
                } else if (error) {
                    return error.message;
                }
                return 'Loading...';
            }}
        />
    );

    const mockEmpty = {
        Query() {
            return {candidateGroups: null};
        }
    };

    const mockReturn = {
        CandidateGroupNode() {
            return {
                id: '1',
                name: 'TestCandidateGroup',
                description: 'A test candidate group',
                user: 'Buffy',
                nCandidates: 1,
            };
        }
    };

    it('renders without data', async () => {
        expect.hasAssertions();
        render(<TestRenderer />);
        await waitFor(() => environment.mock.resolveMostRecentOperation( 
            operation => MockPayloadGenerator.generate(operation, mockEmpty)
        ));
        expect(screen.getByText('My candidate groups')).toBeInTheDocument();
        expect(screen.queryByText('No candidates to show.')).toBeInTheDocument();
        expect(screen.queryByText('TestCandidateGroup')).not.toBeInTheDocument();
    });
    
    it('renders with data', async () => {
        expect.hasAssertions();
        render(<TestRenderer />);
        await waitFor(() => environment.mock.resolveMostRecentOperation( 
            operation => MockPayloadGenerator.generate(operation, mockReturn)
        ));
        expect(screen.getByText('My candidate groups')).toBeInTheDocument();
        expect(screen.queryByText('No candidates to show.')).not.toBeInTheDocument();
        expect(screen.queryByText('TestCandidateGroup')).toBeInTheDocument();
    });
});
