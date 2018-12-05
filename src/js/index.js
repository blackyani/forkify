const css = require('../app.scss');
import Search from './models/Search';
import * as seachViev from './views/searchView';
import {elements} from './views/base';


/* Global state of the app
* - Seach object
* - Current recipe object
* - Shoppeng list obj
* - Liked recipes
*/
const state = {};

const controlSearch = async () => {
    // 1)Get query from view
    const query = seachViev.getInput();
    
    if (query) {
        // New seach object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        seachViev.clearInput();
        seachViev.clearResults();

        // 4) Seach for recipes
        await state.search.getResults();

        //5) render results on UI
        seachViev.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})