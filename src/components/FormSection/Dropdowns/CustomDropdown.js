import React from "react";
import { useState } from 'react';

function CustomDropdown({ listClass, selectList, currentSelectedLabel, itemValue, itemName, listHeading, handleChange }) {

    const [isOpen, setIsOpen] = useState(false);

    // const dropdownToggle = (e) => {
    //     setIsOpen(!isOpen);
    //     // if (!isOpen) e.target.focus();

    // };

    const showOrHide = isOpen ? 'visible' : 'hidden';

    // console.log("run customdropdown function");

    return (
        <div
            className={`dropdown-menu ${listClass}`}
            onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); console.log('click'); }}
            onBlur={() => { setIsOpen(false); }}
            tabIndex={0}
        >
            <label className="label-container">                {currentSelectedLabel}
            </label>

            <div className={`select-container ${showOrHide}`}>
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
            </div>
        </div>
    );
}

export default CustomDropdown;