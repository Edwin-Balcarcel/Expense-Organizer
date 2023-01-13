import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
    background: ${(props) => props.primary ? '#5B69E2' : '#000'};
    width: ${({icon, morespace}) => {
        if (icon) {
            return '15.62rem';
        }else if(morespace){
            return '12rem';
        }else{
            return 'auto';
        }
        
    }}; /* 250px */
    margin-left: 1.25rem; /* 20px */
    border: none;
    border-radius: 0.625rem; /* 10px */
    color: #fff;
    font-family: 'Work Sans', sans-serif;
    height: 3.75rem; /* 60px */
    padding: 1.25rem 1.87rem; /* 20px 30px */
    font-size: 1.25rem; /* 20px */
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    display: ${({pcd, celt, menu}) => {
        if (pcd) {
            return 'inline-flex';
        }else if(celt || menu==="true"){
            return 'none';
        }
    }};
    justify-content: space-between;
    align-items: center;
    outline: none;
 
    svg {
        height: ${(props) => props.bigIcon ? '100%' : '0.75rem;'};  /* 12px */
        fill: white;
    }
    @media (max-width: 500px) {
        height: 3rem; /* 60px */
        padding: .5rem 1.55rem; /* 20px 30px */
        margin-bottom: 2px;
        -webkit-box-shadow: 7px 7px 10px 0px rgba(105,105,105,0.63);
        -moz-box-shadow: 7px 7px 10px 0px rgba(105,105,105,0.63);
        box-shadow: 7px 7px 10px 0px rgba(105,105,105,0.63);
        display: ${({pcd, celt, menu}) => {
        if (pcd) {
            return 'none';
        }else if(celt || menu=="true"){
            return 'inline-block';
        }
        }};
    }
`;

export default Button;