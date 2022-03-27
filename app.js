const express = require( 'express' );
const app = express();
const axios = require( 'axios' );

const fetchData = async () => {
    const { data } = await axios( 'http://jsonplaceholder.typicode.com/posts' );
    return data;
};

app.get( '/', async ( req, res ) => {

    const posts = await fetchData();
    const page = parseInt( req.query.page ) || 1;
    const limit = parseInt( req.query.limit ) || 10;
    const results = {};

    const startIndex = ( page - 1 ) * limit;
    const endIndex = page * limit;

    if ( endIndex < posts.length ) {
        results.next = {
            page: page + 1,
            limit
        };
    }

    if ( startIndex > 0 ) {
        results.prev = {
            page: page - 1,
            limit
        };
    }

    results.data = posts.slice( startIndex, endIndex );

    res.json( results );

} );

app.listen( 3000, () => console.log( `server listening on port 3000` ) );