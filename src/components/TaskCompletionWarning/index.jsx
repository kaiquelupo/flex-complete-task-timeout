import React from 'react';
import "./styles.css";

const TaskCompletionWarning = (props) => {
    
    const { notificationContext: { taskSid, name } } = props; 
    const seconds = parseInt(process.env.REACT_APP_TIMEOUT)/1000;
    
    return (    
        <div>Your task from <span className="strong">{name}</span> ({taskSid}) was completed automatically after <span className="strong">{seconds} seconds</span></div>
    )
}

export default TaskCompletionWarning;