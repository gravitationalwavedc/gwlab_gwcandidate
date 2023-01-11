import React, { useContext } from 'react';
import { useFormikContext, getIn } from 'formik';
import { AccordionContext } from 'react-bootstrap';
import Input from './Atoms/Input';


const AccordionToggleInput = ({ eventKey, name, errorName, emptyText }) => {
    const { values, errors } = useFormikContext();
    const currentEventKey = useContext(AccordionContext);
    const isCurrentEventKey = currentEventKey === eventKey;

    const handleClick = e => e.stopPropagation();

    return <>
        {
            isCurrentEventKey
                ? <Input name={name} placeholder={emptyText} onClick={handleClick}/>
                : <div className={getIn(errors, errorName) ? 'text-danger' : null}>
                    {getIn(values, name) || emptyText}
                </div>
        }
    </>;
};

export default AccordionToggleInput;