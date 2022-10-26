import React from 'react';
import {createPaginationContainer, graphql} from 'react-relay';
import { Button, Container, Col, Form, InputGroup, Navbar, Row } from 'react-bootstrap';
import { HiOutlineSearch } from 'react-icons/hi';
import Link from 'found/Link';
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
            <h4 className="pt-5 pt-md-5 mb-0">
                My candidates
            </h4>
            <Row>
                <Col>
                    { data.candidates.edges.length > 0 ? <CandidateTable
                        data={data.candidates} 
                        match={match}
                        router={router}
                        hasMore={relay.hasMore()}
                        loadMore={loadMore}
                    /> : <EmptyTableMessage />}
                </Col>
            </Row>
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

