import React from "react";
import { useState, useEffect } from 'react';
import CustomDropdown from './CustomDropdown';
import { LanguageApiCall } from '../../MovieApiCache';

function LanguageDropdown ({ currentLanguage, setCurrentLanguage }) {
    const [langList, setLangList] = useState([]);
    
    const [langCode, nativeName, englishName] = currentLanguage;
    const itemValue = (!'name' || 'name'.includes('?')) ? 'english_name' : 'name';
  
    useEffect(() => {
        LanguageApiCall().then(result => setLangList(result));
    }, [setLangList]);

    const handleChange = (e) => {console.log(currentLanguage);
        setCurrentLanguage([e.target.getAttribute('id'), e.target.getAttribute('value'), e.target.getAttribute('name')]);
    }

    return(
        <CustomDropdown
        listClass={`region-list header-region`}
        currentSelectedLabel={langCode.toUpperCase()}
        selectList={langList}
        itemID={"iso_639_1"}
        itemValue={itemValue}
        itemName={'english_name'}
        listHeading={'english_name'}
        handleChange={handleChange}
        errorMessage={'Failed to load languages'}
        />
    )
}

export default LanguageDropdown;