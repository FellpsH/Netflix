const API_key = 'b779737ee0e9f0ef1a34d89694421e03'; 
const API_base = 'https://api.themoviedb.org/3/';



const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_base}${endpoint}`);
    const json = await req.json();
    return json;
}




// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`discover/tv?api_key=${API_key}&language=pt-BR`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_key}`)
            },
            {
                slug: 'topeated',
                title: 'Em alta',
                items: await basicFetch(`movie/top_rated?api_key=${API_key}&language=pt-BR`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`discover/movie?with_geres=28&language=pt-BR&api_key=${API_key}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`discover/movie?with_geres=35&language=pt-BR&api_key=${API_key}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`discover/movie?with_geres=27&language=pt-BR&api_key=${API_key}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`discover/movie?with_gere10749language=pt-BR&api_key=${API_key}`)
            },
            {
                slug: 'documentary',
                title: 'documentarios',
                items: await basicFetch(`discover/movie?with_geres=99language=pt-BR&api_key=${API_key}`)
            },
        ]
    },

    getMovieinfo: async(movieId, type) => {
        let info = {};

            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_key}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_key}`);
                break;
                default:
                    info = null;
                break;        
            }
        return info;
    }
}
