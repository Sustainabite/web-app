import React from 'react';
import GoogleIcon from '../google-logo';

type Props = {
    text: string;
    onClick: () => void
}
function GoogleAuthButton({text, onClick}: Props){

    return (
        <button
        onClick={onClick}
        className="flex items-center justify-between space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
        >
            <GoogleIcon/>
            <span className="text-gray-700 font-medium">{text}</span>
        </button>
    );
};

export default GoogleAuthButton;
