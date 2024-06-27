import { useState, useEffect, memo } from 'react';
import CustomDropdown from './CustomDropdown';
import { RegionApiCall, GeoLocation } from '../../MovieApiCache';

function RegionDropdown({ positionClass, currentRegion, setCurrentRegion, 
    currentLanguage, screenSize, currentTranslation }) {

    const [regionList, setRegionList] = useState([]);
    const [countryCode, nativeName] = currentRegion ? currentRegion : ['CA', 'Canada'];
    const failedMessage = `${currentTranslation.status_messages.failed_to_load} ${currentTranslation.section_labels.regions}`
    
    useEffect(() => {
        RegionApiCall(currentLanguage).then(result => {
            setRegionList(result);
            if (currentRegion === null) {
                setDefaultRegion(result);
            }
        });
    }, [currentLanguage, setRegionList]);

    const setDefaultRegion = async (regionList) => {
        // gets user region from netlify functions
        const geodata = await GeoLocation();
        
        if (regionList.some(item => item.iso_3166_1 === geodata.countryCode)){   
            setCurrentRegion([geodata.countryCode, geodata.countryName]);
        }
        else {
            setCurrentRegion(['US', `United States`]);
        }
    }

    // resets current region to new native name when region list / language changes
    useEffect(() => {
        const currentSelection = regionList?.find(current => current.iso_3166_1 === countryCode);
        if (currentSelection) { setCurrentRegion([currentSelection.iso_3166_1, currentSelection.native_name]); }
    },[regionList]);

    const handleChange = (e) => {
        setCurrentRegion([e.target.getAttribute('id'), e.target.getAttribute('value')]);
    }
    const chooseSelectedLabel = () => {

        if ((screenSize !== 'narrowScreen') && (positionClass === 'form-region')) {
            let displayName = nativeName.length > 19 ? (nativeName.slice(0, 19) + '...') 
            : nativeName;
                
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