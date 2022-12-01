import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Link from 'found/Link';
import { HiDocumentText} from 'react-icons/hi';

const CandidateTableBody = ({node, match, router, ...rest}) => <Container {...rest}>
    <Row className="mb-4 align-items-center border-top border-bottom">
        <Col>
            <p className={node.name ? 'font-weight-bold' : 'font-italic'}>
                {node.name || 'Untitled Candidate'} 
            </p>
            <p className='text-truncate'>
                {node.description}
            </p>
        </Col>
        <Col>
            {`${node.source.frequency} Hz`} 
        </Col>
        <Col>
            {`Detection statistic: ${node.search.detectionStatistic}`}
        </Col>
        <Link 
            to={{pathname: '/gwcandidate/candidate/' + node.id + '/'}} 
            activeClassName="selected" 
            className="card-action"
            exact 
            match={match} 
            router={router}
        >
            <HiDocumentText className="mr-1 mb-1" />
            View
        </Link>
    </Row>
</Container>;

export default CandidateTableBody;
