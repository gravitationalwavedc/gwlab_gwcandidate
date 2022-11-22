import React from 'react';
import { useFormikContext } from 'formik';
import Input from './Input';

const NumberInput = ({title, name, ...rest}) => {
    const { getFieldProps, setFieldValue } = useFormikContext();
    const { value } = getFieldProps(name);
    return <Input
        title={title}
        name={name}
        type='number'
        value={value === null ? '' : value}
        onChange={e => setFieldValue(name, e.target.value === '' ? null : parseFloat(e.target.value))}
        {...rest}
    />;
};

export default NumberInput;

