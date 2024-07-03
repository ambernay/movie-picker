import React from "react";
import CustomDropdown from './CustomDropdown';
import { LanguagesObj } from '../../TranslationObjects.js';

function LanguageDropdown ({ currentLanguage, setCurrentLanguage, currentTranslation }) {
    
    const [langCode, langCountryCode] = currentLanguage;
    const failedMessage = `${currentTranslation.status_messages.failed_to_load} ${currentTranslation.section_labels.languages}`;

    const sortLanguagesByName = (a, z) => a.iso_639_1.localeCompare(z.iso_639_1);
    const sortedLanguageList = LanguagesObj.langList.sort(sortLanguagesByName);

    const handleChange = (e) => {
        const target = e.target.closest('li');
        setCurrentLanguage([target.getAttribute('id'), target.getAttribute('value'), target.getAttribute('name')]);
    }

    return(
        <CustomDropdown
            listClass={`language-list header-region`}
            currentSelectedLabel={langCode}
            selectList={sortedLanguageList}
            itemID={"iso_639_1"}
            itemValue={'name'}
            itemName={'english_name'}
            listHeading={"name"}
            handleChange={handleChange}
            errorMessage={failedMessage}
        />
    )
}

export default LanguageDropdown;