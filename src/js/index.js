const css = require('../app.scss');
import Search from './models/Search';

/* Global state of the app
* - Seach object
* - Current recipe object
* - Shoppeng list obj
* - Liked recipes
*/
const state = {};

const controlSearch = async () => {
    // 1)Get query from view
    const query = 'pizza' //TODO

    if (query) {
        // New seach object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results

        // 4) Seach for recipes
        await state.search.getResults();

        //5) render results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})