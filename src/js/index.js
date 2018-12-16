const css = require('../app.scss');
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as seachViev from './views/searchView';
import * as recipeViev from './views/recipeView';
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

        try {
            // 4) Seach for recipes
            await state.search.getResults();

            //5) render results on UI
            clearLoader();
            seachViev.renderResults(state.search.result);
        } catch {
            alert('Error');
            clearLoader();
        }
        
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

const controlRecipe = async () => {
    // Get id from url
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        //Prepare UI for changes
        recipeViev.clearRecipe()
        renderLoader(elements.recipe);

        //Highlight selected searchitem
        if(state.search) {seachViev.highlightedSelected(id);}
        
        //Create new recipe obj
        state.recipe = new Recipe(id);

        try {
            //Get recipe data
            await state.recipe.getRicipe();
            state.recipe.parseIngredients();
            //Calc servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //Render recipe
            clearLoader();
            recipeViev.clearRecipe();
            recipeViev.renderRecipe(state.recipe);
        } catch (err) {
            alert('Something wrong');
        }
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeViev.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //increase button is clicked
            state.recipe.updateServings('inc');
            recipeViev.updateServingsIngredients(state.recipe);
    }
    
});

