import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Container } from 'react-bootstrap';
import Error404 from '../Error404';
import CandidateHeading from '../Components/Results/CandidateHeading';
import CandidateTableBody from '../Components/CandidateTableBody';

const ViewCandidateGroup = ({ data, match, router }) => {
    const candidateGroupData = data.candidateGroup || null;
    const candidateData = candidateGroupData.candidates;
    return candidateGroupData 
        ? <>
            <CandidateHeading candidateData={candidateGroupData}/>
            <Container className='mt-2'>
                {
                    candidateData.edges.map(({ node }) => <CandidateTableBody
                        key={node.id}
                        node={node}
                        match={match}
                        router={router}
                    />)
                }
            </Container>
        </>
        : <Error404 message="Candidate group not found"/>;
};

export default createFragmentContainer(ViewCandidateGroup,
    {
        data: graphql`
            fragment ViewCandidateGroup_data on Query @argumentDefinitions(
                candidateGroupId: {type: "ID!"}
            ){
                candidateGroup (id: $candidateGroupId) {
                    id
                    user
                    name
                    description
                    lastUpdated
                    candidates {
                        edges {
                            node {
                                id
                                name
                                description
                                search {
                                    module
                                    detectionStatistic
                                }
                                source {
                                    frequency
                                }
                            }
                        }
                    }
                }
            }
        `,
    },
);

