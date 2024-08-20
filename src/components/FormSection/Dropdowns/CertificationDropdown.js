import { useState } from 'react';
import { Certifications } from '../../CertificationsObject.js';
import { FilterIcon } from '../../Icons';

function CertificationDropdown ({ setCertifications, setIsValidRequest }) {
    
    const [isFilterButtonActive, setIsFilterButtonActive] = useState(false);
    const isVisibleClass = isFilterButtonActive ? 'certification-form' : 'hidden';
    const currentCert = Certifications.CA;
    // const failedMessage = `${currentTranslation.status_messages.failed_to_load} ${currentTranslation.section_labels.languages}`;

    const handleChange = (e) => {
        let newValue = [e.target.value, e.target.id];
        
        if (e.target.checked) setCertifications(pre => [...pre, newValue]);
        else if (!e.target.checked) setCertifications(pre => pre.filter(item => item[1] !== newValue[1]))
        setIsValidRequest(true);
    }

    const handleFilterButton = (e) => {
        e.preventDefault();
        setIsFilterButtonActive(prevState => !prevState);
        return false;
    }

    return(
        <>
            <button className='filter-section' onClick={handleFilterButton}>
                <figure className="filter-button">
                    <FilterIcon/>
                    <figcaption className="sr-only">Filter by certification</figcaption>
                </figure>
            </button>
            <form className={isVisibleClass}>
                <ul className='certification-buttons-list'>
                    {currentCert.map((cert) => {
                        return (
                            <li className="radio-button-container genre-buttons" key={cert.certification}>
                                <input onChange={handleChange} type="checkbox" id={cert.certification} value={cert.certification} name="cert.certification" tabIndex='0'></input>
                                <label htmlFor={cert.certification}>{cert.certification}</label>
                            </li>
                        )
                    })}
                </ul>
            </form>
        </>
    )
}

export default CertificationDropdown;