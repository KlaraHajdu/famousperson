import styled, { createGlobalStyle } from "styled-components";

export const gameTheme = {
    whiteBackgroundColor: "rgba(255, 255, 255, 0.9)",
    greenBackgroundColor: "rgba(147, 179, 84, 0.8)",
    blueBackgroundColor: "rgba(101, 168, 247, 0.6)",
};

export const GlobalStyle = createGlobalStyle`
.main-tile {
    margin: 3em auto;
    width: 40%;
    background-color: ${gameTheme.whiteBackgroundColor};
    padding: 2em;
    border-radius: 10px;
} 
.team-table-container {
    display: inline-block;
    padding: 10px;
    min-width: 150px
}
.team-tables-container {
    text-align: center;
}
`;

export const MiddleContainerInThreeColumns = styled.div`
    margin: 3em auto;
    width: 80%;
    background-color: ${gameTheme.whiteBackgroundColor};
    padding: 2em;
    border-radius: 10px;
`;

export const TeamContainerInThreeColumns = styled.div`
    margin: 3em auto;
    width: 80%;
    background-color: ${(props) => props.backgroundColor};
    padding: 2em;
    border-radius: 10px;
    color: white;
    & div {
        margin-top: 10px;
    }
`;

export const CountdownItemStyle = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`;

export const SVGCircleStyle = styled.div`
    width: 100px;
    height: 100px;
`;

export const CounterStyle = styled.div`
    position: absolute;
    color: orange;
`;
