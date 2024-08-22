import React from 'react';
import GoogleIcon from '../google-logo';

type Props = {
    text: string;
}

function TextBetweenLine({text}: Props){

    return (
        <div className="flex items-center my-4">
            <div className="flex-grow border-b-2 border-gray-300"></div>
            <span className="flex-shrink-0 px-4 text-gray-500 whitespace-nowrap">{text}</span>
            <div className="flex-grow border-b-2 border-gray-300"></div>
        </div>
    );
};

export default TextBetweenLine;
