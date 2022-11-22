import React from 'react';
import { HiOutlinePencil, HiOutlineCheck, HiOutlineX} from 'react-icons/hi';
import EdiText from 'react-editext';
import { useFormikContext } from 'formik';

const EditButton = () => <React.Fragment><HiOutlinePencil /> edit</React.Fragment>;
const SaveButton = () => <HiOutlineCheck/>;
const CancelButton = () => <HiOutlineX/>;

const CandidatesTitle = () => {
    const { values, errors, setFieldValue } = useFormikContext();
    return <React.Fragment>
        <EdiText 
            type="text" 
            name="name"
            value={values.name}
            viewProps={{className: 'h1'}}
            onSave={(value) => setFieldValue('name', value)}
            hint="You can use letters, numbers, underscores, and hyphens."
            editButtonContent={<EditButton/>}
            editButtonClassName="edit-button"
            saveButtonContent={<SaveButton />}
            saveButtonClassName="save-button"
            cancelButtonContent={<CancelButton />}
            cancelButtonClassName="cancel-button"
            hideIcons
            editOnViewClick
            submitOnUnfocus
            submitOnEnter
        />
        {errors.name && 
          <p className="text-danger small">
              Invalid name. You can use letters, numbers, underscores, and hyphens.
          </p>}
        <EdiText 
            type="text" 
            name="description"
            value={values.description}
            onSave={(value) => setFieldValue('description', value)}
            editButtonContent={<EditButton/>}
            editButtonClassName="edit-button"
            saveButtonContent={<SaveButton />}
            saveButtonClassName="save-button"
            cancelButtonContent={<CancelButton />}
            cancelButtonClassName="cancel-button"
            hideIcons
            editOnViewClick
            submitOnUnfocus
            submitOnEnter
        />
    </React.Fragment>;
};

export default CandidatesTitle;
