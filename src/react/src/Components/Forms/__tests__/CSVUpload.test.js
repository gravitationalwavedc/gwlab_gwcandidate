import React from 'react';
import { render, screen } from '@testing-library/react';
import 'regenerator-runtime/runtime';
import CSVUpload from '../CSVUpload';
import { Formik } from 'formik';

describe('the candidate form component', () => {
    const formikWrapper = ({children}) => <Formik initialValues={{}}>
        {children}
    </Formik>;

    const renderTest = () => render(
        <CSVUpload text='Test Button'/>,
        {wrapper: formikWrapper}
    );

    it('should render', () => {
        expect.hasAssertions();
        renderTest();
        expect(screen.getByText('Test Button')).toBeInTheDocument();
    });
});
