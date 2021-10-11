import { render, screen, cleanup } from '@testing-library/react';
import LandingPage from './Components/LandingPage.jsx';
import {BrowserRouter} from 'react-router-dom'

test('should render LandingPage component', () => {
    render(
    <BrowserRouter>
        <LandingPage/>
    </BrowserRouter>
    );
    const titleText = screen.getByTestId('title');
    expect(titleText).toBeInTheDocument();
    expect(titleText).toHaveTextContent('WELCOME TO MY FOODPAGE');
})

test('should have a button', () => {
    render(
        <BrowserRouter>
            <LandingPage/>
        </BrowserRouter>
    );
    const button = screen.getByTestId('button');

    expect(button).toBeInTheDocument();
})

