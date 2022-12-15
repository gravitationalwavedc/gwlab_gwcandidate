import React from 'react';
import {createPaginationContainer, graphql} from 'react-relay';
import { Container, Col, Row } from 'react-bootstrap';
import EmptyTableMessage from '../Components/EmptyTableMessage';
import CandidateGroupList from '../Components/CandidateGroupList';

const RECORDS_PER_PAGE = 100;

const MyCandidateGroups = ({data, match, router, relay}) => {
    const loadMore = () => {
        if (relay.hasMore()) {
            relay.loadMore(RECORDS_PER_PAGE);
        }
    };

    return (
        <Container >
            <h4 className="pt-5 pt-md-5 mb-0">
                My candidate groups
            </h4>
            <Row>
                <Col>
                    {
                        data.candidateGroups && data.candidateGroups.edges.length > 0 
                            ? <CandidateGroupList
                                data={data.candidateGroups} 
                                match={match}
                                router={router}
                                hasMore={relay.hasMore()}
                                loadMore={loadMore}
                            />
                            : <EmptyTableMessage />
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default createPaginationContainer(MyCandidateGroups,
    {
        data: graphql`
            fragment MyCandidateGroups_data on Query {
                candidateGroups (
                    first: $count,
                    after: $cursor,
                ) @connection(key: "MyCandidateGroups_candidateGroups") {
                    edges {
                        node {
                            id
                            name
                            description
                            user
                            nCandidates
                        }
                    }
                  }
            }
        `,
    },
    {
        direction: 'forward',
        query: graphql`
            query MyCandidateGroupsForwardQuery(
                $count: Int!,
                $cursor: String,
            ) {
              ...MyCandidateGroups_data
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

