import { useState, useEffect, memo } from 'react';
import CustomDropdown from './CustomDropdown';
import { RegionApiCall, GeoLocation } from '../../MovieApiCache';
import { TransObj } from '../../TranslationObjects.js';

function RegionDropdown({ positionClass, currentRegion, setCurrentRegion, 
    currentLanguage, screenSize, currentTranslation }) {

    const [regionList, setRegionList] = useState([]);
    const [countryCode, nativeName] = currentRegion || ['',''];
    const failedMessage = `${currentTranslation.status_messages.failed_to_load} ${currentTranslation.section_labels.regions}`
    
    useEffect(() => {
        RegionApiCall(currentLanguage).then(result => {
            setRegionList(result);
            getDefaultRegion(result);
        });
    }, [currentLanguage, setRegionList]);
    console.log(regionList);
    const getDefaultRegion = async (regionList) => {
        if (currentRegion === null) {
            // gets user region from netlify functions
            const geodata = await GeoLocation();
            
            if (regionList?.some(item => item.iso_3166_1 === geodata.countryCode)){   
                setCurrentRegion([geodata.countryCode, geodata.countryName]);
            }
            else {
                const noResults = TransObj[`${currentLanguage[0]}`].status_messages.no_results;
                setCurrentRegion(['—', '—————']);
            }
        }
        return;
    }

    // resets current region to new native name when region list / language changes
    useEffect(() => {
        const currentSelection = regionList?.find(current => current.iso_3166_1 === countryCode);
        if (currentSelection) { setCurrentRegion([currentSelection.iso_3166_1, currentSelection.native_name]); }
    },[regionList, setCurrentRegion]);

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