import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import moment from 'moment';


const CandidateHeading = ({ candidateData }) => {
    const { name, description, lastUpdated } = candidateData;
    const updated = moment.utc(lastUpdated, 'YYYY-MM-DD HH:mm:ss UTC').local().format('llll');
    return (
        <Container fluid className="pt-5">
            <Row>
                <Col md={{span: 9, offset: 3}} xs={12}>
                    <h1 className="mb-0">{name}</h1>
                    <h5 className="mb-0">{description}</h5>
                    <p className="mb-0">
                        Last updated: {updated}
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default CandidateHeading;
