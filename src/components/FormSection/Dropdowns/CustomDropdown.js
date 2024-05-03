import React from "react";
import { useState } from 'react';

function CustomDropdown({ listClass, selectList, currentSelectedLabel, itemID, itemValue, itemName, listHeading, handleChange, errorMessage }) {

    const [isOpen, setIsOpen] = useState(false);

    const showOrHide = isOpen ? 'visible' : 'hidden';
    const disabledClass = listClass === 'region-list header-region' ?
    'disabled-label' : null;

    const handleDropdownClick = (e) => {
        e.stopPropagation();
        // condition disables language dropdown
        if(listClass !== 'region-list header-region') setIsOpen(!isOpen);
    }

    return (
        <div
            className={`dropdown-menu ${listClass}`}
            onClick={(e) => handleDropdownClick(e)}
            onBlur={() => { setIsOpen(false); }}
            tabIndex={0}
        >
            <label className={`label-container ${disabledClass}`}>
                {currentSelectedLabel}
            </label>
            <div className={`select-container ${showOrHide}`}>
                {selectList && selectList.length > 0 ?
                    <ul className="select">
                        {selectList.map((listItem) => {
                            
                            return (
                                <li
                                    key={listItem[itemID]}
                                    id={listItem[itemID]}
                                    value={listItem[itemValue]}
                                    name={listItem[itemName]}
                                    onClick={handleChange}
                                >
                                    {listItem[listHeading]}
                                </li>
                            )
                        })}
                    </ul>

                    :
                    <div className="error-message-container">
                        <h4>{errorMessage}</h4>
                    </div>
                }
            </div>
        </div>
    );
}

export default CustomDropdown;