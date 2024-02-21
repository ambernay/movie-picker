import React from "react";
import styled from 'styled-components';

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("label")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

export default function App({ isOpen, setIsOpen, listClass, selectList, currentSelected, itemValue, itemName }) {

    const dropdownToggle = (e) => setIsOpen(!isOpen);
    const showOrHide = isOpen ? 'visible' : 'hidden';

    return (
        <DropDownContainer className={`dropdown-menu ${listClass}`} onClick={dropdownToggle}>
            <DropDownHeader className="label-container" >{currentSelected}</DropDownHeader>
            <DropDownListContainer className={`select-container ${showOrHide}`}>
                <DropDownList className="select">
                    {selectList.map((listItem) => {
                        return (
                            <ListItem key={listItem[itemValue]} value={listItem[itemValue]} name={listItem[itemName]}>{listItem[itemName]}
                            </ListItem>
                        )
                    })}
                </DropDownList>
            </DropDownListContainer>
        </DropDownContainer>

    );
}