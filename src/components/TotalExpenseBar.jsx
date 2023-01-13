import styled from "styled-components";
import theme from "../Theme";
import formatAmount from "../functions/convertToCurrency";
import { useTotalSpent } from "../contexts/TotalSpentPerMonth";

const TotalExpenseBar = () => {

  const {total} = useTotalSpent();

  return (
    <TotalBar>
      <p>Total Spent in the month:</p>
      <p>{formatAmount(total)}</p>
    </TotalBar>
  )
}

export default TotalExpenseBar;


const TotalBar = styled.div`
    background: ${theme.green};
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 31.25rem) { /* 500px */
        flex-direction: column;
        font-size: 14px;
    }
`;