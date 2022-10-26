import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Row, Col, Container } from 'react-bootstrap';
import Error404 from '../Error404';
import Parameters from '../Components/Results/Parameters';
import CandidateHeading from '../Components/Results/CandidateHeading';

const ViewCandidate = ({ data }) => {
    const candidateData = data.candidate || null;
    return <>
        {candidateData ? <>
            <CandidateHeading candidateData={candidateData}/>
            <Container className="form-container pb-5 pt-5" fluid>
                <Row>
                    <Col md={{span: 9, offset: 3}}>
                        <Parameters candidateData={candidateData}/>
                    </Col>
                </Row>
            </Container></> : 
            <Error404 message="Job not found" />}
    </>;
};

export default createFragmentContainer(ViewCandidate,
    {
        data: graphql`
            fragment ViewCandidate_data on Query @argumentDefinitions(
                candidateId: {type: "ID!"}
            ){
                candidate (id: $candidateId) {
                    id
                    jobId
                    user
                    name
                    description
                    ...Parameters_candidateData
                }
            }
        `,
    },
);

