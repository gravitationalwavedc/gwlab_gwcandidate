import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const CandidateHeading = ({ candidateData }) => {
    console.log(candidateData);
    return (
        <Container fluid className="pt-5">
            <Row>
                <Col md={{span: 9, offset: 3}} xs={12}>
                    <h1 className="mb-0">{candidateData.name}</h1>
                    <h5 className="mb-0">{candidateData.description}</h5>
                </Col>
            </Row>
        </Container>
    );
};

export default CandidateHeading;
