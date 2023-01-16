import React from 'react';
import { useFormikContext, getIn } from 'formik';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import SourceInputs from './SourceInputs';
import BinaryInputs from './BinaryInputs';
import SearchInputs from './SearchInputs';
import ViterbiInputs from './ViterbiInputs';
import Input from './Atoms/Input';

const CandidateForm = ({ index }) => {
    const { values } = useFormikContext();

    const renderOther = () => {
        switch (getIn(values, `candidates.${index}.search.module`)) {
        case 'viterbi':
            return <ViterbiInputs index={index}/>;
        }
    };

    return <>
        <Row>
            <Col><Input name={`candidates.${index}.description`} placeholder="A good description is specific, unique and memorable."/></Col>
        </Row>
        <Tabs fill defaultActiveKey="source" className='border-bottom'>
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
                    <Col><SearchInputs index={index}/></Col>
                </Row>
                <Row>
                    <Col>{renderOther()}</Col>
                </Row>
            </Tab>
        </Tabs>
    </>;
};

export default CandidateForm;
