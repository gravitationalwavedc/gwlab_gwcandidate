import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Input from './Atoms/Input';

const ViterbiInputs = ({ index }) => <React.Fragment>
    <Row>
        <Col>
            <Input
                title='Coherence time'
                name={`candidates.${index}.other.coherenceTime`}
                type='number'
            />
        </Col>
        <Col>
            <Input
                title='likelihood'
                name={`candidates.${index}.other.likelihood`}
                type='number'
            />
        </Col>
        <Col>
            <Input
                title='Score'
                name={`candidates.${index}.other.score`}
                type='number'
            />
        </Col>
        <Col>
            <Input
                title='Threshold'
                name={`candidates.${index}.other.threshold`}
                type='number'
            />
        </Col>
    </Row>
</React.Fragment>;

export default ViterbiInputs;
