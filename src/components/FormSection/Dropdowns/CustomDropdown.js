import React from "react";

export default function App({ isOpen, setIsOpen, listClass, selectList, currentSelectedLabel, itemValue, itemName, listHeading, handleChange }) {

    const dropdownToggle = (e) => setIsOpen(!isOpen);
    const showOrHide = isOpen ? 'visible' : 'hidden';

    return (
        <div className={`dropdown-menu ${listClass}`} onClick={(e) => { dropdownToggle(); e.stopPropagation() }}>
            <label className="label-container">                {currentSelectedLabel}
            </label>
            <div
                className={`select-container ${showOrHide}`}>
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