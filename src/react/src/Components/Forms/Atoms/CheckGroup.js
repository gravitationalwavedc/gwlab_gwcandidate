import React from 'react';

import { Form, Row, Col } from 'react-bootstrap';
import { useFormikContext, getIn } from 'formik';

const CheckGroup = ({ title, name, options, ...rest }) => {
    const { handleChange, touched, errors, values} = useFormikContext();

    return <React.Fragment>
        <Form.Label className='my-0 pb-2'>{title}</Form.Label>
        <Row>
            <Col>
                {options.map(({label, value}) =>
                    <Form.Check
                        custom
                        id={name + label}
                        key={name + label}
                        label={label}
                        type="checkbox"
                        name={name}
                        value={value}
                        onChange={handleChange}
                        isValid={getIn(touched, name) && !getIn(errors, name)}
                        isInvalid={!!getIn(errors, name)}
                        checked={ getIn(values, name).indexOf(value) !== -1}
                        {...rest}
                    />
                )}
            </Col>
        </Row>
    </React.Fragment>;};

export default CheckGroup;
