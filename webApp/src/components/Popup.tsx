import React from 'react';

interface InputBoxProps {
    togglePopup: () => void;
    children: React.ReactNode
}

function InputBox({ togglePopup, children }: InputBoxProps) {

    return (
        <div>
            <div className="overlay" onClick={togglePopup}></div>
            <div className="popup">
                {children}
                <button className={"button-23"} onClick={togglePopup}>Close</button>
            </div>
        </div>
    );
}

export default InputBox;
