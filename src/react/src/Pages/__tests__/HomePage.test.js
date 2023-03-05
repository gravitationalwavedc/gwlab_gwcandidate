import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

/* global router */

describe('homepage', () => {
    it('renders', () => {
        expect.hasAssertions();
        render(<HomePage match={{}} router={router}/>);
        expect(screen.getByText('GWCandidate')).toBeInTheDocument();
    });
});
