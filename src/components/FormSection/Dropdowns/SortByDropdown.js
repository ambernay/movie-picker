import { useState } from 'react';
import CustomDropdown from './CustomDropdown';

function SortByDropdown({ setSortOption }) {

    const sortMenuObj = {
        "sortOptions": [
            { "sort-by": "Rating: High to Low", "choice": "vote_average.desc" },
            { "sort-by": "Rating: Low to High", "choice": "vote_average.asc" },
            { "sort-by": "Titles A-Z", "choice": "original_title.asc" },
            { "sort-by": "Titles Z-A", "choice": "original_title.desc" },
            { "sort-by": "Release date newest", "choice": "primary_release_date.desc" },
            { "sort-by": "Release date oldest", "choice": "primary_release_date.asc" }
        ]
    };

    const [currentSelectedLabel, setCurrentSelectedLabel] = useState(sortMenuObj.sortOptions[0]['sort-by']);

    const handleChange = (e) => {
        setSortOption(e.target.getAttribute('value'));
        setCurrentSelectedLabel(e.target.getAttribute('name'));
    }

    return (
        <CustomDropdown
            listClass={'sort-by'}
            currentSelectedLabel={currentSelectedLabel}
            selectList={sortMenuObj.sortOptions}
            itemValue={"choice"}
            itemName={"sort-by"}
            listHeading={'sort-by'}
            handleChange={handleChange}
        />
    )
}

export default SortByDropdown;