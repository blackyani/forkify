const css = require('../app.scss');
import Search from './models/Search';

const search = new Search('pizza') ;
console.log();
search.getResults();