import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import CandidateForm from './CandidateForm';
import { createCandidate } from './initialValues';
import AccordionToggleInput from './AccordionToggleInput';

const ListForm = () => {
    const { values, handleSubmit } = useFormikContext();
    return <FieldArray
        name='candidates'
        render={
            ({ push, remove }) => <>
                <Row>
                    <Col>
                        <Accordion>
                            {
                                values.candidates.map(({ id }, index) => (
                                    <Card key={id}>
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
                                                        emptyText={`Untitled Candidate ${id}`}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Button
                                                        onClick={
                                                            e => {
                                                                e.stopPropagation();
                                                                remove(index);
                                                            }
                                                        }
                                                        data-testid={`remove-candidate-button-${index}`}
                                                        className="float-right"
                                                    >
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={id}>
                                            <Card.Body>
                                                <CandidateForm index={index}/>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                ))
                            }
                        </Accordion>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Button
                            onClick={() => push(createCandidate())}
                            data-testid='add-candidate-button'
                        >
                            Add Candidate
                        </Button>
                    </Col>
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