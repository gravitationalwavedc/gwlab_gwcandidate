import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import 'regenerator-runtime/runtime';
import ListForm from '../ListForm';
import { Formik } from 'formik';
import initialValues from '../initialValues';
import userEvent from '@testing-library/user-event';

describe('the candidate form component', () => {
    const formikWrapper = ({children}) => <Formik initialValues={initialValues}>
        {children}
    </Formik>;

    const renderTest = () => render(
        <ListForm />,
        {wrapper: formikWrapper}
    );

    it('should render full page without viterbiId', () => {
        expect.hasAssertions();
        renderTest();
        expect(screen.queryByRole('button', {name: 'Add Candidate'})).toBeInTheDocument();
    });
    
    it('should create candidate rows', async () => {
        expect.hasAssertions();
        renderTest();
        expect(screen.getAllByTestId('candidate')).toHaveLength(1);
        await waitFor(() => userEvent.click(screen.getByTestId('add-candidate-button')));
        expect(screen.getAllByTestId('candidate')).toHaveLength(2);
    });
    
    it('should delete candidate rows in correct order', async () => {
        expect.hasAssertions();
        renderTest();
        // Change value of first input
        const firstInput = screen.getAllByLabelText('Frequency')[0];
        await waitFor(() => userEvent.clear(firstInput));
        await waitFor(() => userEvent.type(firstInput, '10'));
        expect(firstInput).toHaveValue(10);

        // Add new row
        await waitFor(() => userEvent.click(screen.getByTestId('add-candidate-button')));
        const secondInput = screen.getAllByLabelText('Frequency')[1];
        expect(secondInput).toBeInTheDocument();

        // Remove first row
        await waitFor(() => userEvent.click(screen.getByTestId('remove-candidate-button-0')));
        expect(screen.queryByDisplayValue('10')).not.toBeInTheDocument();
        expect(screen.getAllByLabelText('Frequency')[0]).toHaveValue(initialValues.candidates[0].source.frequency);
    });
});
