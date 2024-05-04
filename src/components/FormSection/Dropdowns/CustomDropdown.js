import React from "react";
import { useState } from 'react';

function CustomDropdown({ listClass, selectList, currentSelectedLabel, itemID, itemValue, itemName, listHeading, handleChange, errorMessage }) {

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
                {currentSelectedLabel.toUpperCase()}
            </label>
            <div className={`select-container ${showOrHide}`}>
                {selectList && selectList.length > 0 ?
                    <ul className="select">
                        {selectList.map((listItem) => {
                            const codeClass = listClass === 'region-list header-region' ? 'lang-code-label' : 'hidden';
                        
                            return (
                                <li
                                    key={listItem[itemID]}
                                    id={listItem[itemID]}
                                    value={listItem[itemValue]}
                                    name={listItem[itemName]}
                                    onClick={handleChange}
                                >
                                    <label className={codeClass}>{listItem[itemID].toUpperCase()}</label>
                                    <label className='dropdown-headings'>{listItem[listHeading]}</label>
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