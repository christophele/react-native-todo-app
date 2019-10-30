import React from 'react';
import Prompt from 'rn-prompt';
 
const TextPrompt = ({isVisible, onCancelCallback, onSubmitCallBack, title, placeholder, defaultValue}) => {
    return (
        <Prompt
            title={title}
            placeholder={placeholder}
            defaultValue={defaultValue}
            visible={isVisible}
            onCancel={() => onCancelCallback()}
            onSubmit={value => onSubmitCallBack(value)}
        />
    );
}

export default TextPrompt;