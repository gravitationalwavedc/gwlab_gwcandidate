import React from 'react';
import { MockPayloadGenerator } from 'relay-test-utils';
import { QueryRenderer, graphql } from 'react-relay';
import { render, waitFor, screen } from '@testing-library/react';
import MyCandidates from '../MyCandidates';

/* global environment, router */

describe('my candidates page', () => {

    const TestRenderer = () => (
        <QueryRenderer
            environment={environment}
            query={graphql`
                query MyCandidatesTestQuery (
                    $count: Int, 
                    $cursor: String,
                ) @relay_test_operation {
                    ...MyCandidates_data
                }
            `}
            variables={{
                count: 10,
            }}
            render={({ error, props }) => {
                if (props) {
                    return <MyCandidates data={props} match={{}} router={router}/>;
                } else if (error) {
                    return error.message;
                }
                return 'Loading...';
            }}
        />
    );

    const mockEmpty = {
        Query() {
            return {candidates: null};
        }
    };

    const mockReturn = {
        CandidateNode() {
            return {
                id: '1',
                name: 'TestCandidate',
                description: 'A test candidate',
                user: 'Buffy',
                source: {
                    frequency: 1
                },
                search: {
                    module: 'viterbi',
                    detectionStatistic: 1,
                    sourceDataset: 'o1'
                },
            };
        }
    };

    it('renders without data', async () => {
        expect.hasAssertions();
        render(<TestRenderer />);
        await waitFor(() => environment.mock.resolveMostRecentOperation( 
            operation => MockPayloadGenerator.generate(operation, mockEmpty)
        ));
        expect(screen.getByText('My candidates')).toBeInTheDocument();
        expect(screen.queryByText('No candidates to show.')).toBeInTheDocument();
        expect(screen.queryByText('TestCandidate')).not.toBeInTheDocument();
    });
    
    it('renders with data', async () => {
        expect.hasAssertions();
        render(<TestRenderer />);
        await waitFor(() => environment.mock.resolveMostRecentOperation( 
            operation => MockPayloadGenerator.generate(operation, mockReturn)
        ));
        expect(screen.getByText('My candidates')).toBeInTheDocument();
        expect(screen.queryByText('No candidates to show.')).not.toBeInTheDocument();
        expect(screen.queryByText('TestCandidate')).toBeInTheDocument();
    });
});
