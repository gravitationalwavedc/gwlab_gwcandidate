import React from 'react';
import { useFormikContext, getIn } from 'formik';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import SourceInputs from './SourceInputs';
import BinaryInputs from './BinaryInputs';

const CandidateForm = ({ index }) => {
    const { values } = useFormikContext();
    return <Tabs fill defaultActiveKey="source" className='border-bottom'>
        <Tab eventKey="source" title="Source">
            <Row className="mt-4">
                <Col><SourceInputs index={index}/></Col>
            </Row>
            {
                getIn(values, `candidates.${index}.source.isBinary`) &&
                <Row>
                    <Col><BinaryInputs index={index}/></Col>
                </Row>
            }
        </Tab>
        <Tab eventKey="search" title="Search">
            <Row className="mt-4">
                <div>Search Inputs</div>
            </Row>
        </Tab>
    </Tabs>;
};

export default CandidateForm;
