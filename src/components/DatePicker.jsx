import { useState } from 'react';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';
import theme from '../Theme';

const DatePicker = ({selectedDate, setSelectedDate, inputText}) => {
    
    const [showCalendar, setShowCalendar] = useState(false);

    return (
        <InputContainer>
            <input 
                onClick={() => setShowCalendar(!showCalendar)}  
                type="text" 
                readOnly 
                value={inputText} 
            />
            {showCalendar && 
            <DayPicker 
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                onDayClick={() => setShowCalendar(!showCalendar)}
            />}
            
        </InputContainer>
    )
}

export default DatePicker; 

const InputContainer = styled.div`
    position: relative;
 
    input {
        font-family: 'Work Sans', sans-serif;
        box-sizing: border-box;
        background: ${theme.gray};
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 5rem; /* 80px */
        width: 100%;
        padding: 0 1.25rem; /* 20px */
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
    }
 
    .rdp {
        position: absolute;
    }
 
    .rdp-months {
        display: flex;
        justify-content: center;
    }
 
    .rdp-month {
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 20px;
        border-radius: 10px;
    }
 
    @media (max-width: 60rem) {
        /* 950px */
        & > * {
            width: 100%;
        }
    }
`;
