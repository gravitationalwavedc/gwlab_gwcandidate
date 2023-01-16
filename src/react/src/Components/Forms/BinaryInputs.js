import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Input from './Atoms/Input';

const BinaryInputs = ({ index }) => <React.Fragment>
    <Row>
        <Col>
            <Input
                type='number'
                title='Semi-major axis'
                name={`candidates.${index}.source.binary.semiMajorAxis`}
            />
        </Col>
        <Col>
            <Input
                type='number'
                title='Orbital phase'
                name={`candidates.${index}.source.binary.orbitalPhase`}
            />
        </Col>
        <Col>
            <Input
                type='number'
                title='Time of ascension'
                name={`candidates.${index}.source.binary.timeOfAscension`}
            />
        </Col>
    </Row>
    <Row>
        <Col>
            <Input
                type='number'
                title='Orbital period'
                name={`candidates.${index}.source.binary.orbitalPeriod`}
            />
        </Col>
        <Col>
            <Input
                type='number'
                title='Orbital eccentricity'
                name={`candidates.${index}.source.binary.orbitalEccentricity`}
            />
        </Col>
        <Col>
            <Input
                type='number'
                title='Argument of periapse'
                name={`candidates.${index}.source.binary.orbitalArgumentOfPeriapse`}
            />
        </Col>
    </Row>
</React.Fragment>;

export default BinaryInputs;
