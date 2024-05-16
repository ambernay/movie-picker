import React from "react";
import CustomDropdown from './CustomDropdown';

function LanguageDropdown ({ currentLanguage, setCurrentLanguage, currentTranslation }) {
    
    const [langCode, nativeName, englishName] = currentLanguage;
    const failedMessage = `${currentTranslation.error_messages.failed_to_load} ${currentTranslation.section_labels.languages}`;
   
    const languagesObj = {
        "langList": [
            {"iso_639_1":"cs","english_name":"Czech","name":"Český"},
            {"iso_639_1":"de","english_name":"German","name":"Deutsch"},
            {"iso_639_1":"vi","english_name":"Vietnamese","name":"Tiếng Việt"},
            {"iso_639_1":"it","english_name":"Italian","name":"Italiano"},
            {"iso_639_1":"pl","english_name":"Polish","name":"Polski"},
            {"iso_639_1":"da","english_name":"Danish","name":"Dansk"},
            {"iso_639_1":"sk","english_name":"Slovak","name":"Slovenčina"},
            {"iso_639_1":"en","english_name":"English","name":"English"},
            {"iso_639_1":"hu","english_name":"Hungarian","name":"Magyar"},
            {"iso_639_1":"ru","english_name":"Russian","name":"Pусский"},
            {"iso_639_1":"sr","english_name":"Serbian","name":"Srpski"},
            {"iso_639_1":"sv","english_name":"Swedish","name":"svenska"},
            {"iso_639_1":"ka","english_name":"Georgian","name":"ქართული"},
            {"iso_639_1":"be","english_name":"Belarusian","name":"беларуская мова"},
            {"iso_639_1":"fi","english_name":"Finnish","name":"suomi"},
            {"iso_639_1":"fr","english_name":"French","name":"Français"},
            {"iso_639_1":"id","english_name":"Indonesian","name":"Bahasa indonesia"},
            {"iso_639_1":"ja","english_name":"Japanese","name":"日本語"},
            {"iso_639_1":"ko","english_name":"Korean","name":"한국어/조선말"},
            {"iso_639_1":"nl","english_name":"Dutch","name":"Nederlands"},
            {"iso_639_1":"el","english_name":"Greek","name":"ελληνικά"},
            {"iso_639_1":"ar","english_name":"Arabic","name":"العربية"},
            {"iso_639_1":"tr","english_name":"Turkish","name":"Türkçe"},
            {"iso_639_1":"pt","english_name":"Portuguese","name":"Português"},
            {"iso_639_1":"th","english_name":"Thai","name":"ภาษาไทย"},
            {"iso_639_1":"lt","english_name":"Lithuanian","name":"Lietuvių"},
            {"iso_639_1":"sl","english_name":"Slovenian","name":"Slovenščina"},
            {"iso_639_1":"es","english_name":"Spanish","name":"Español"},
            {"iso_639_1":"zh","english_name":"Mandarin","name":"普通话"},
            {"iso_639_1":"he","english_name":"Hebrew","name":"עִבְרִית"},
            {"iso_639_1":"ro","english_name":"Romanian","name":"Română"},
            {"iso_639_1":"bg","english_name":"Bulgarian","name":"български език"}
        ]
    };

    const sortLanguagesByName = (a, z) => a.iso_639_1.localeCompare(z.iso_639_1);
    const sortedLanguageList = languagesObj.langList.sort(sortLanguagesByName);

    const handleChange = (e) => {
        const target = e.target.closest('li');
        setCurrentLanguage([target.getAttribute('id'), target.getAttribute('value'), target.getAttribute('name')]);
    }

    return(
        <CustomDropdown
            listClass={`region-list header-region`}
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