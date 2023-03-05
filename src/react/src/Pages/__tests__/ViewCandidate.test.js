import React from 'react';
import { MockPayloadGenerator } from 'relay-test-utils';
import { QueryRenderer, graphql } from 'react-relay';
import { render, waitFor, screen } from '@testing-library/react';
import ViewCandidate from '../ViewCandidate';

/* global environment */

describe('my candidates page', () => {

    const TestRenderer = () => (
        <QueryRenderer
            environment={environment}
            query={graphql`
                query ViewCandidateTestQuery ($candidateId: ID!) @relay_test_operation {
                    ...ViewCandidate_data @arguments(candidateId: $candidateId)
                }
            `}
            variables={{
                candidateId: 'Q2FuZGlkYXRlTm9kZTo2MzkyOGUxMDQ4MTY0NTI2ZWExZmVjNjQ=',
            }}
            render={({ error, props }) => {
                if (props) {
                    return <ViewCandidate data={props}/>;
                } else if (error) {
                    return error.message;
                }
                return 'Loading...';
            }}
        />
    );

    const mockEmpty = {
        Query() {
            return {candidate: null};
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
        expect(screen.getByText('Candidate not found')).toBeInTheDocument();
        expect(screen.queryByText('TestCandidate')).not.toBeInTheDocument();
    });
    
    it('renders with data', async () => {
        expect.hasAssertions();
        render(<TestRenderer />);
        await waitFor(() => environment.mock.resolveMostRecentOperation( 
            operation => MockPayloadGenerator.generate(operation, mockReturn)
        ));
        expect(screen.getByText('TestCandidate')).toBeInTheDocument();
    });
});
