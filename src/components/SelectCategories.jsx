import { useState } from "react";
import styled from "styled-components";
import theme from "../Theme";
import { ReactComponent as DownIcon} from "../images/down.svg";
import CategoryIcon from "../elements/CategoryIcon";

const SelectCategories = ({selectedCategorie, setSelectedCategorie}) => {

    const [showSelect, setShowSelect] = useState(false);

    const categories = [
        {id: 'Food', text: 'Food'},
        {id: 'Bills', text: 'Bills'},
        {id: 'Home', text: 'Home'},
        {id: 'Transport', text: 'Transport'},
        {id: 'Clothes', text: 'Clothes'},
        {id: 'Personal Care', text: 'Personal Care'},
        {id: 'Purchases', text: 'Purchases'},
        {id: 'Entertainment', text: 'Entertainment'}
    ]

    const handleClick = (e) => {
        setSelectedCategorie(e.currentTarget.dataset.value);
        setShowSelect(!showSelect);
    }

    return (
        <SelectContainer>
            <SelectedOption onClick={() => setShowSelect(!showSelect)}>{selectedCategorie} <DownIcon/></SelectedOption>
            {showSelect && 
                <Options>
                    {categories.map((categorie) => {
                        return <Option 
                                    key={categorie.id}
                                    data-value={categorie.id}
                                    onClick={handleClick}
                                ><CategoryIcon id={categorie.id}/> {categorie.text}</Option>
                    })}
                </Options>
            }
            

        </SelectContainer>
    )
}

const SelectContainer = styled.div`
    background: ${theme.gray};
    cursor: pointer;
    border-radius: 0.625rem; /* 10px */
    position: relative;
    height: 5rem; /* 80px */
    width: 40%;
    padding: 0px 1.25rem; /* 20px */
    font-size: 1.5rem; /* 24px */
    text-align: center;
    display: flex;
    align-items: center;
    transition: .5s ease all;
    &:hover {
        background: ${theme.lightGrey};
    }
    @media (max-width: 500px) {
        width: 100%;
        z-index: 3000;
        margin-top: 15px;
    }
`;
 
const SelectedOption = styled.div`
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
        width: 1.25rem; /* 20px */
        height: auto;
        margin-left: 1.25rem; /* 20px */
    }
`;
 
const Options = styled.div`
    background: ${theme.gray};
    position: absolute;
    top: 5.62rem; /* 90px */
    left: 0;
    width: 100%;
    border-radius: 0.625rem; /* 10px */
    max-height: 18.75rem; /* 300px */
    overflow-y: auto;
`;
 
const Option = styled.div`
    padding: 1.25rem; /* 20px */
    display: flex;
    svg {
        width: 28px;
        height: auto;
        margin-right: 1.25rem; /* 20px */
    }
    &:hover {
        background: ${theme.lightGrey};
    }
`;

export default SelectCategories;