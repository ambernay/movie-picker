
function App() {

    const apiKey = '0a093f521e98a991f4e4cc2a12460255';

    const url = new URL('https://api.themoviedb.org/3/movie/550?api_key=0a093f521e98a991f4e4cc2a12460255');

    // url.search = new URLSearchParams({
    //     title: "Legally Blonde",
    //     key: apiKey
    // })

    fetch(url)
        .then(results => {
            return results.json();
        })
        .then(data => {
            console.log(data);
            // movieData(data.artObjects)
        })

  return (
    <>
        <h1>Movie Picker App</h1>
    </>
  );
}

export default App;
