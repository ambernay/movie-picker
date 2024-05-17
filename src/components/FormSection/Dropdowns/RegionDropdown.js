import { useState, useEffect, memo } from 'react';
import CustomDropdown from './CustomDropdown';
import { RegionApiCall } from '../../MovieApiCache';

function RegionDropdown({ positionClass, currentRegion, setCurrentRegion, currentLanguage, screenSize, currentTranslation }) {

    const [regionList, setRegionList] = useState([]);
    
    const failedMessage = `${currentTranslation.error_messages.failed_to_load} ${currentTranslation.section_labels.regions}`
    
    useEffect(() => {
        RegionApiCall(currentLanguage).then(result => setRegionList(result));
    }, [currentLanguage, setRegionList]);

    // resets current region to new native name when region list / language changes
    useEffect(() => {
        const currentSelection = regionList?.find(current => current.iso_3166_1 === currentRegion[0]);
        if (currentSelection) setCurrentRegion([currentSelection.iso_3166_1, currentSelection.english_name, currentSelection.native_name])
    },[regionList]);

    const handleChange = (e) => {
        setCurrentRegion([e.target.getAttribute('id'), e.target.getAttribute('name'), e.target.getAttribute('value')]);
    }
    const chooseSelectedLabel = () => {

        let countryCode = currentRegion[0];

        if ((screenSize !== 'narrowScreen') && (positionClass === 'form-region')) {
            let fullRegionName = currentRegion[2];
            let displayName = fullRegionName.length > 19 ? (fullRegionName.slice(0, 19) + '...') 
            : fullRegionName;
                
            return displayName;

        } else { return countryCode; }
    }

    return (
        <CustomDropdown
            listClass={`region-list ${positionClass}`}
            currentSelectedLabel={chooseSelectedLabel()}
            selectList={regionList}
            itemID={"iso_3166_1"}
            itemValue={'native_name'}
            itemName={'english_name'}
            listHeading={"native_name"}
            handleChange={handleChange}
            errorMessage={failedMessage}
        />
    )
}

export default memo(RegionDropdown);