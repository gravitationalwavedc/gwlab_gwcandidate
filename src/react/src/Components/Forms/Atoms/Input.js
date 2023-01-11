import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const Input = ({title, name, type, ...rest}) => {
    const [field, {error, touched}] = useField(name);
    return <Form.Group controlId={ name }>
        {
            title && <Form.Label>{title}</Form.Label>
        }
        <Form.Control
            {...field}
            label={ name }
            type={ type } 
            isValid={touched && !error}
            isInvalid={!!error}
            {...rest}/>
        <Form.Control.Feedback type='invalid'>
            {error}
        </Form.Control.Feedback>
    </Form.Group>;
};


export default Input;

