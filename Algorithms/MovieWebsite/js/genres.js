const apikey = api_keys.API_KEY;
let genresData = [];

//getch all genres data
fetch('https://api.themoviedb.org/3/genre/movie/list?&language=en-US', {
  headers: {
    Authorization: `Bearer ${apikey}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
})
.then(res => {
  if(res.status !== 200){
    console.error(`Error: ${res.status}`)
  } else {
    return res.json();
  }
})
.then(data => {
  genresData.push(...data.genres);
})
.catch(err => console.error(err));

