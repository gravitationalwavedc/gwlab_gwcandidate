import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import CandidateForm from './CandidateForm';
import { createCandidate } from './initialValues';
import AccordionToggleInput from './AccordionToggleInput';
import CSVUpload from './CSVUpload';
import { HiXCircle } from 'react-icons/hi';

const ListForm = () => {
    const { values, handleSubmit } = useFormikContext();
    return <FieldArray
        name='candidates'
        render={
            ({ push, remove }) => <>
                <Row className="pb-3">
                    <Col md="auto">
                        <Button
                            onClick={() => push(createCandidate())}
                            data-testid='add-candidate-button'
                            variant="outline-primary"
                        >
                            Add Candidate
                        </Button>
                    </Col>
                    <Col md="auto">
                        <CSVUpload text='Upload candidates from CSV' buttonProps={{variant: 'tertiary'}}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Accordion>
                            {
                                values.candidates.map(({ id }, index) => (
                                    <Card key={id} className="gwlab-job-card">
                                        <Accordion.Toggle
                                            as={Card.Header}
                                            eventKey={id}
                                            className="border"
                                            data-testid='candidate'
                                        >
                                            <Row>
                                                <Col>
                                                    <AccordionToggleInput
                                                        eventKey={id}
                                                        name={`candidates.${index}.name`}
                                                        errorName={`candidates.${index}`}
                                                        emptyText={`Untitled Candidate ${id}`}
                                                    />
                                                </Col>
                                            </Row>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={id}>
                                            <Card.Body>
                                                <CandidateForm index={index}/>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Footer className="text-right">
                                            <Button
                                                onClick={
                                                    e => {
                                                        e.stopPropagation();
                                                        remove(index);
                                                    }
                                                }
                                                data-testid={`remove-candidate-button-${index}`}
                                                className="m-0 p-0"
                                                variant="tertiary"
                                            >
                                                <HiXCircle />
                                                Delete
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                ))
                            }
                        </Accordion>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Button
                            onClick={handleSubmit}
                            className='float-right'
                        >
                            Create Candidates
                        </Button>
                    </Col>
                </Row>
            </>
        }
    />;
};

export default ListForm;