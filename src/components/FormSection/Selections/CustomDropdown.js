import React from "react";
import styled from 'styled-components';

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("label")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

export default function App({ isOpen, setIsOpen, listClass, selectList, currentSelectedLabel, itemValue, itemName, listHeading, handleChange }) {

    const dropdownToggle = (e) => setIsOpen(!isOpen);
    const showOrHide = isOpen ? 'visible' : 'hidden';

    return (
        <DropDownContainer className={`dropdown-menu ${listClass}`} onClick={dropdownToggle}>
            <DropDownHeader className="label-container">                {currentSelectedLabel}
            </DropDownHeader>
            <DropDownListContainer
                className={`select-container ${showOrHide}`}>
                <DropDownList className="select">
                    {selectList.map((listItem) => {
                        return (
                            <ListItem
                                key={listItem[itemValue]}
                                value={listItem[itemValue]}
                                name={listItem[itemName]}
                                onClick={handleChange}
                            >
                                {listItem[listHeading]}
                            </ListItem>
                        )
                    })}
                </DropDownList>
            </DropDownListContainer>
        </DropDownContainer>

    );
}