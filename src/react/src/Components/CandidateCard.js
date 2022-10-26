import React from 'react';
import { Card } from 'react-bootstrap';
import Link from 'found/Link';
import { HiDocumentText} from 'react-icons/hi';

const CandidateCard = ({node, match, router}) =>{
    console.log(node);
    return <Card className="gwlab-job-card">
        <Card.Body>
            <Card.Title>
                {node.name} 
            </Card.Title>
            <Card.Subtitle>{node.description}</Card.Subtitle>
            <Card.Text>
                {node.user}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-right">
            <Link 
                to={{pathname: '/gwcandidate/candidate/' + node.id + '/'}} 
                activeClassName="selected" 
                className="card-action"
                exact 
                match={match} 
                router={router}>
                <HiDocumentText className="mr-1 mb-1" />
                    View
            </Link>
        </Card.Footer>
    </Card>;};

export default CandidateCard;
