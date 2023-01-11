import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Switch from './Atoms/Switch';
import Input from './Atoms/Input';

const SourceInputs = ({ index }) => <>
    <Row>
        <Col>
            <Input
                title='Right Ascension'
                name={`candidates.${index}.source.rightAscension`}
                type='number'
            />
        </Col>
        <Col>
            <Input
                title='Declination'
                name={`candidates.${index}.source.declination`}
                type='number'
            />
        </Col>
        <Col>
            <Input
                title='Frequency'
                name={`candidates.${index}.source.frequency`}
                type='number'
            />
        </Col>
        <Col>
            <Input
                title='Frequency Path'
                name={`candidates.${index}.source.frequencyPath`}
            />
        </Col>
    </Row>
    <Row>
        <Col>
            <Switch
                title="Is binary?"
                name={`candidates.${index}.source.isBinary`}
                labelOn="Yes"
                labelOff="No"
                value={true}
            />
        </Col>
    </Row>
</>;

export default SourceInputs;
