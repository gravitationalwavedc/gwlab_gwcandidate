import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Switch from './Atoms/Switch';
import NumberInput from './Atoms/NumberInput';

const SourceInputs = ({ index }) => <>
    <Row>
        <Col>
            <NumberInput
                title='Right Ascension'
                name={`candidates.${index}.source.rightAscension`}
            />
        </Col>
        <Col>
            <NumberInput
                title='Declination'
                name={`candidates.${index}.source.declination`}
            />
        </Col>
        <Col>
            <NumberInput
                title='Frequency'
                name={`candidates.${index}.source.frequency`}
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
