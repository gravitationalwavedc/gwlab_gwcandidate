import React from 'react';
import {createPaginationContainer, graphql} from 'react-relay';
import { Container, Col } from 'react-bootstrap';
import EmptyTableMessage from '../Components/EmptyTableMessage';
import CandidateTable from '../Components/CandidateTable';

const RECORDS_PER_PAGE = 100;

const MyCandidates = ({data, match, router,relay}) => {
    const loadMore = () => {
        if (relay.hasMore()) {
            relay.loadMore(RECORDS_PER_PAGE);
        }
    };

    return (
        <Container >
            <Col>
                <h4 className="pt-5 mb-2">
                    My candidates
                </h4>
            </Col>
            { 
                data.candidates && data.candidates.edges.length > 0 
                    ? <CandidateTable
                        data={data.candidates} 
                        match={match}
                        router={router}
                        hasMore={relay.hasMore()}
                        loadMore={loadMore}
                    /> 
                    : <EmptyTableMessage />
            }
        </Container>
    );
};

export default createPaginationContainer(MyCandidates,
    {
        data: graphql`
            fragment MyCandidates_data on Query {
                candidates (
                    first: $count,
                    after: $cursor,
                ) @connection(key: "MyCandidates_candidates") {
                    edges {
                        node {
                            id
                            name
                            description
                            user
                            source {
                                frequency
                            }
                            search {
                                module
                                detectionStatistic
                                sourceDataset
                            }
                        }
                    }
                  }
            }
        `,
    },
    {
        direction: 'forward',
        query: graphql`
            query MyCandidatesForwardQuery(
                $count: Int!,
                $cursor: String,
            ) {
              ...MyCandidates_data
            }
        `,
        getConnectionFromProps(props) {
            return props.data && props.data.candidates;
        },

        getFragmentVariables(previousVariables, totalCount) {
            return {
                ...previousVariables,
                count: totalCount
            };
        },

        getVariables(props, {count, cursor}) {
            return {
                count,
                cursor,
            };
        }
    }
);

