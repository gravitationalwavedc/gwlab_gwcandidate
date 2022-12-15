import React from 'react';
import {Col, Row, Container} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { graphql, commitMutation } from 'react-relay';
import initialValues from '../Components/Forms/initialValues';
import ListForm from '../Components/Forms/ListForm';
import validationSchema from '../Components/Forms/validationSchema';
import CandidatesTitle from '../Components/Forms/CandidatesTitle';
import { harnessApi } from '../index';

const submitMutation = graphql`
    mutation NewCandidatesMutation($input: NewCandidatesMutationInput!) {
        newCandidates(input: $input) {
            result {
                groupId
            }
        }
    }
`;

const NewCandidates = ({ router }) => {
    const handleSubmit = (values) => {
        const jobId = null;
        const candidates = values.candidates.map(
            ({id, name, description, ...candidate}) => ({
                ...candidate,
                name: name || null,
                description: description || null,
                jobId: jobId
            })
        );
        var variables = {
            input: {
                name: values.name,
                description: values.description,
                candidates: candidates
            }
        };

        commitMutation(harnessApi.getEnvironment('gwcandidate'), {
            mutation: submitMutation,
            variables: variables,
            onCompleted: (response, errors) => {
                if (!errors) {
                    router.replace('/gwcandidate/candidates/');
                }
            },
        });
        
    };

    return <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)}
    >
        <Container>
            <Form>
                <Row className="form-title-row">
                    <Col style={{minHeight: '110px'}}>
                        <CandidatesTitle />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListForm />
                    </Col>
                </Row>
            </Form>
        </Container>
    </Formik>;
};

export default NewCandidates;