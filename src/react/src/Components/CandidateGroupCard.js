import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Link from 'found/Link';
import { HiDocumentText} from 'react-icons/hi';

const CandidateGroupCard = ({node, match, router}) => <Card className="gwlab-job-card">
    <Card.Body as={Container}>
        <Row>
            <Col md={4} className="border-right">
                <Card.Title>
                    {node.name} 
                </Card.Title>
                <Card.Subtitle className='text-truncate'>{node.description}</Card.Subtitle>
                <Card.Text>
                    {node.user}
                </Card.Text>
            </Col>
            <Col md={8}>
                <Card.Title>
                    {node.nCandidates} 
                </Card.Title>
            </Col>
        </Row>
    </Card.Body>
    <Card.Footer className="text-right">
        <Link 
            to={{pathname: `/gwcandidate/candidate-group/${node.id}/`}} 
            activeClassName="selected" 
            className="card-action"
            exact 
            match={match} 
            router={router}
        >
            <HiDocumentText className="mr-1 mb-1" />
            View
        </Link>
    </Card.Footer>
</Card>;

export default CandidateGroupCard;
