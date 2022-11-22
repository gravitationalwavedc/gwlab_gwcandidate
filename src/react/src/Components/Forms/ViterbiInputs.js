import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NumberInput from './Atoms/NumberInput';

const ViterbiInputs = ({ index }) => <React.Fragment>
    <Row>
        <Col>
            <NumberInput
                title='Coherence time'
                name={`candidates.${index}.search.other.viterbi.coherenceTime`}
            />
        </Col>
        <Col>
            <NumberInput
                title='likelihood'
                name={`candidates.${index}.search.other.viterbi.likelihood`}
            />
        </Col>
        <Col>
            <NumberInput
                title='Score'
                name={`candidates.${index}.search.other.viterbi.score`}
            />
        </Col>
        <Col>
            <NumberInput
                title='Threshold'
                name={`candidates.${index}.search.other.viterbi.threshold`}
            />
        </Col>
    </Row>
</React.Fragment>;

export default ViterbiInputs;
