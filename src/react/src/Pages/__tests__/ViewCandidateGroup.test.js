import React from 'react';
import { MockPayloadGenerator } from 'relay-test-utils';
import { QueryRenderer, graphql } from 'react-relay';
import { render, waitFor, screen } from '@testing-library/react';
import ViewCandidateGroup from '../ViewCandidateGroup';

/* global environment, router */

describe('my candidates page', () => {

    const TestRenderer = () => (
        <QueryRenderer
            environment={environment}
            query={graphql`
                query ViewCandidateGroupTestQuery ($candidateGroupId: ID!) @relay_test_operation {
                    ...ViewCandidateGroup_data @arguments(candidateGroupId: $candidateGroupId)
                }
            `}
            variables={{
                candidateGroupId: 'Q2FuZGlkYXRlR3JvdXBOb2RlOjYzOTI5ZThjMTE5ZWRhNzlhYTNhNzMyOQ==',
            }}
            render={({ error, props }) => {
                if (props) {
                    return <ViewCandidateGroup data={props} match={{}} router={router}/>;
                } else if (error) {
                    return error.message;
                }
                return 'Loading...';
            }}
        />
    );

    const mockEmpty = {
        Query() {
            return {candidateGroup: null};
        }
    };

    const mockCandidate = {
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


    const mockReturn = {
        CandidateGroupNode() {
            return {
                id: '1',
                name: 'TestCandidateGroup',
                description: 'A test candidate group',
                user: 'Buffy',
                candidates: {
                    edges: [
                        {
                            node: {
                                mockCandidate,
                            }
                        }
                    ]
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
        expect(screen.getByText('Candidate group not found')).toBeInTheDocument();
        expect(screen.queryByText('TestCandidateGroup')).not.toBeInTheDocument();
    });
    
    it('renders with data', async () => {
        expect.hasAssertions();
        render(<TestRenderer />);
        await waitFor(() => environment.mock.resolveMostRecentOperation( 
            operation => MockPayloadGenerator.generate(operation, mockReturn)
        ));
        expect(screen.getByText('TestCandidateGroup')).toBeInTheDocument();
    });
});
