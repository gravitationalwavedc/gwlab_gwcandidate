import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'found/Link';

const HomePage = ({ match, router }) => <Container fluid className="banner d-none d-sm-block">
    <Container>
        <Row>
            <Col xs={12}>
                <h1 className="title-display">GWCandidate</h1>
            </Col>
            <Col md={8} className="mb-4">
                <h5>
                    GWCandidate stores the candidates returned by continuous wave search codes such as Viterbi. <br />
                    The candidates are typically stored as a group, according to how they were generated. <br />
                    Select the desired group of candidates in order to run followup scripts on them.
                </h5>
            </Col>
        </Row>
        <Row>
            <Col>
                <Link as={Button} to='/gwcandidate/candidate-groups/' exact match={match} router={router}>
                    View Candidate Groups
                </Link>
            </Col>
        </Row>
    </Container>
</Container>;


export default HomePage;
