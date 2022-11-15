import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Input from './Atoms/Input';

const BinaryInputs = ({ index }) => <React.Fragment>
    <Row>
        <Col>
            <Input
                title='Semi-major axis'
                name={`candidates.${index}.source.binary.semiMajorAxis`}
                type='number'
            />
        </Col>
        <Col>
            <Input
                title='Orbital phase'
                name={`candidates.${index}.source.binary.orbitalPhase`}
                type='number'
            />
        </Col>
        <Col>
            <Input
                title='Time of ascension'
                name={`candidates.${index}.source.binary.timeOfAscension`}
                type='number'
            />
        </Col>
    </Row>
    <Row>
        <Col>
            <Input
                title='Orbital period'
                name={`candidates.${index}.source.binary.orbitalPeriod`}
                type='number'
            />
        </Col>
        <Col>
            <Input
                title='Orbital eccentricity'
                name={`candidates.${index}.source.binary.orbitalEccentricity`}
                type='number'
            />
        </Col>
        <Col>
            <Input
                title='Argument of periapse'
                name={`candidates.${index}.source.binary.argumentOfPeriapse`}
                type='number'
            />
        </Col>
    </Row>
</React.Fragment>;

export default BinaryInputs;
