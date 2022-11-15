import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Input from './Atoms/Input';
import Select from './Atoms/Select';
import CheckGroup from './Atoms/CheckGroup';

const SearchInputs = ({ index }) => <React.Fragment>
    <Row>
        <Col>
            <Select
                title='Module'
                name={`candidates.${index}.search.module`}
                options={[
                    {label: 'Viterbi', value: 'viterbi'}
                ]}
            />
        </Col>
        <Col>
            <Select
                title='Source dataset'
                name={`candidates.${index}.search.sourceDataset`}
                options={[
                    {label: 'O1', value: 'o1'},
                    {label: 'O2', value: 'o2'},
                    {label: 'O3', value: 'o3'},
                    {label: 'O4', value: 'o4'}
                ]}
            />
        </Col>
        <Col>
            <CheckGroup
                title='Detectors'
                name={`candidates.${index}.search.detectors`}
                options={[
                    {label: 'H1', value: 'h1'},
                    {label: 'L1', value: 'l1'},
                    {label: 'V1', value: 'v1'},
                    {label: 'G1', value: 'g1'},
                    {label: 'K1', value: 'k1'}
                ]}
                inline
            />
        </Col>
    </Row>
    <Row>
        <Col>
            <Input
                title='Start time'
                name={`candidates.${index}.search.startTime`}
                type='number'
            />
        </Col>
        <Col>
            <Input
                title='End time'
                name={`candidates.${index}.search.endTime`}
                type='number'
            />
        </Col>
        <Col>
            <Input
                title='Detection statistic'
                name={`candidates.${index}.source.detectionStatistic`}
                type='number'
            />
        </Col>
    </Row>
</React.Fragment>;

export default SearchInputs;
