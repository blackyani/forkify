const css = require('../app.scss');
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as seachViev from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';


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
        renderLoader(elements.searchRes); 

        // 4) Seach for recipes
        await state.search.getResults();

        //5) render results on UI
        clearLoader();
        seachViev.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchRes.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        seachViev.clearResults();
        seachViev.renderResults(state.search.result, goToPage);
    }
})

const r = new Recipe(46956);
r.getRicipe();
console.log(r);