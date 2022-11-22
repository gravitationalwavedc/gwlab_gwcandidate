import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NumberInput from './Atoms/NumberInput';

const BinaryInputs = ({ index }) => <React.Fragment>
    <Row>
        <Col>
            <NumberInput
                title='Semi-major axis'
                name={`candidates.${index}.source.binary.semiMajorAxis`}
            />
        </Col>
        <Col>
            <NumberInput
                title='Orbital phase'
                name={`candidates.${index}.source.binary.orbitalPhase`}
            />
        </Col>
        <Col>
            <NumberInput
                title='Time of ascension'
                name={`candidates.${index}.source.binary.timeOfAscension`}
            />
        </Col>
    </Row>
    <Row>
        <Col>
            <NumberInput
                title='Orbital period'
                name={`candidates.${index}.source.binary.orbitalPeriod`}
            />
        </Col>
        <Col>
            <NumberInput
                title='Orbital eccentricity'
                name={`candidates.${index}.source.binary.orbitalEccentricity`}
            />
        </Col>
        <Col>
            <NumberInput
                title='Argument of periapse'
                name={`candidates.${index}.source.binary.orbitalArgumentOfPeriapse`}
            />
        </Col>
    </Row>
</React.Fragment>;

export default BinaryInputs;
