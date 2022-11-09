import React from 'react';
import { useFormikContext, FieldArray, getIn } from 'formik';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import CandidateForm from './CandidateForm';
import initialValues from './initialValues';

const ListForm = () => {
    const { values } = useFormikContext();
    const defaultData = initialValues.candidates[0];
    return <React.Fragment>
        <FieldArray
            name='candidates'
            render={
                ({ push, remove }) => <>
                    <Accordion>
                        {
                            values.candidates.map((_, index) => (
                                <Card key={index}>
                                    <Accordion.Toggle
                                        as={Card.Header}
                                        eventKey={index.toString()}
                                        className="border"
                                        data-testid='candidate'
                                    >
                                        <Row>
                                            <Col>
                                                <div>{getIn(values, `candidates.${index}.source.frequency`)}</div>
                                            </Col>
                                            <Col>
                                                <Button
                                                    onClick={() => remove(index)}
                                                    data-testid={`remove-candidate-button-${index}`}
                                                    className="float-right"
                                                >
                                                    Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={index.toString()}>
                                        <Card.Body>
                                            <CandidateForm index={index}/>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            ))
                        }
                    </Accordion>
                    <Button
                        onClick={() => push(defaultData)}
                        data-testid='add-candidate-button'
                    >
                        Add Candidate
                    </Button>
                </>
            }
        />
    </React.Fragment>;
};

export default ListForm;