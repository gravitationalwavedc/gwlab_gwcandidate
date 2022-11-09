import React from 'react';
import {Col, Row, Container} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import initialValues from '../Components/Forms/initialValues';
import ListForm from '../Components/Forms/ListForm';

const NewCandidate = () => (
    <Formik
        initialValues={initialValues}
    >
        <Container fluid>
            <Form>
                <Row>
                    <Col md={{offset:2, span:8}} style={{minHeight: '110px'}}>
                            Title
                    </Col>
                </Row>
                <Row>
                    <Col md={{offset:2, span:8}}>
                        <ListForm />
                    </Col>
                </Row>
            </Form>
        </Container>
    </Formik>
);

export default NewCandidate;