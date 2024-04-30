import React from "react";
import { useState } from 'react';

function CustomDropdown({ listClass, selectList, currentSelectedLabel, itemValue, itemName, listHeading, handleChange, errorMessage }) {

    const [isOpen, setIsOpen] = useState(false);

    const showOrHide = isOpen ? 'visible' : 'hidden';

    const handleDropdownClick = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    }

    return (
        <div
            className={`dropdown-menu ${listClass}`}
            onClick={(e) => handleDropdownClick(e)}
            onBlur={() => { setIsOpen(false); }}
            tabIndex={0}
        >
            <label className="label-container">
                {currentSelectedLabel}
            </label>
            <div className={`select-container ${showOrHide}`}>
                {selectList && selectList > 0 ?
                    <ul className="select">
                        {selectList.map((listItem) => {
                            return (
                                <li
                                    key={listItem[itemValue]}
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