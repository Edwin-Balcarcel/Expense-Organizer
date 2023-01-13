import styled from "styled-components";
import {ReactComponent as Points} from "./../images/points.svg"

const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: rgba(135,182,194, .15);
    }
`;
 
const PointsUp = styled(Points)`
    position: fixed;
    z-index: 1;
    top: 2.5rem; /* 40px */
    left: 2.5rem; /* 40px */
`;
 
const PointsDown = styled(Points)`
    position: fixed;
    z-index: 1;
    bottom: 2.5rem; /* 40px */
    right: 2.5rem; /* 40px */
`;

const Background = () => {
    return(
        <>
            <PointsUp/>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path 
                    fillOpacity="1" 
                    d="M0,160L48,181.3C96,203,192,245,288,256C384,267,480,245,576,224C672,203,768,181,864,176C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </Svg>
            <PointsDown/>
        </>
    )
}

export default Background;