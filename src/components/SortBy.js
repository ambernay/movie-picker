function SortBy ({ setSortOption }) {

    const sortMenuObj = {
        "sortOptions": [
            { "sort-by": "Rating: High to Low", "choice": "vote_average.desc" },
            { "sort-by": "Rating: Low to High", "choice": "vote_average.asc" }
        ]
    };

    const handleChange = (e) => {
        setSortOption(e.target.value);
        console.log('changed');

    }

    return (
        <div className="sort-menu">
            <label className="sr-only" for="sort">Sort by:</label>

            <select onChange={handleChange} name="sort" id="sort">

                {sortMenuObj.sortOptions.map((option) => {
                    return (
                        <option id={option["sort-by"]} value={option["choice"]}>{option["sort-by"]}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default SortBy;