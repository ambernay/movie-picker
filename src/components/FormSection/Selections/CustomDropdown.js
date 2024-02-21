import React from "react";
import styled from 'styled-components';

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("label")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

export default function App({ isOpen, setIsOpen, regionList }) {

    const dropdownToggle = (e) => setIsOpen(!isOpen);

    return (
        <DropDownContainer className="dropdown-menu regions">
            <DropDownHeader className="label-container" onClick={dropdownToggle}>Mangoes</DropDownHeader>
            {isOpen && (
                <DropDownListContainer className='select-container'>
                    <DropDownList className="select">
                        <ListItem>Mangoes</ListItem>
                        <ListItem>Apples</ListItem>
                        <ListItem>Oranges</ListItem>
                    </DropDownList>
                </DropDownListContainer>
            )}
        </DropDownContainer>

    );
}