const css = require('../app.scss');
import axios from 'axios';

async function getResults(query) {
    const key = '0799e331f50a9e75b2d84b44decc706c';
    try {
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);   
    } catch {
        alert (error);
    }
}
getResults('pizza');