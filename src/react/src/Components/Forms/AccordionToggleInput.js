import React, { useContext } from 'react';
import { useFormikContext, getIn } from 'formik';
import { AccordionContext } from 'react-bootstrap';
import Input from './Atoms/Input';


const AccordionToggleInput = ({ eventKey, name, emptyText }) => {
    const { values } = useFormikContext();
    const currentEventKey = useContext(AccordionContext);
    const isCurrentEventKey = currentEventKey === eventKey;

    const handleClick = e => e.stopPropagation();

    return <>
        {
            isCurrentEventKey
                ? <Input name={name} onClick={handleClick}/>
                : getIn(values, name) || emptyText
        }
    </>;
};

export default AccordionToggleInput;