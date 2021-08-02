// с дефолтным экспортом объекта отвечающего за логику HTTP-запросов к API
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21191808-b7f611822e153568a8c55fc05';

function fetchSearchQuery( searchQuery, page ) {
    return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`)
        .then(response => {
    if (response.ok) {
        return response.json();
            };

    return Promise.reject(new Error(`No match found. Please check your query!`));
  });
}

const api = {
  fetchSearchQuery,
};

export default api;



// export default class ApiService {
//     constructor() {
//     this.searchQuery = '';
//         this.page = 1;
//         this.total = 0;
//     }

//     search() {
        
//         return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
//             .then(response => response.json())
//             .then(({ hits, total }) => {
//                 this.total = total;
//                 return hits;
//             }
//             );
//     }


//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }


//     incrementPage() {
//         this.page+=1;
//     }

//     resetPage() {
//     this.page = 1;
//   }


    
// }