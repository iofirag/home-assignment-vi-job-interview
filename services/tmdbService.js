const opentracing = require('opentracing');

module.exports = class TMDBService {
    constructor(httpService, tmdbApiConfig, logger, tracer) {
        this._httpService = httpService;
        this._tmdbApiConfig = tmdbApiConfig;
        this._logger = logger;
        this._tracer = tracer;
    }

    async getTrendingSearchResult(str) {
        const url = `${this._tmdbApiConfig.host2}${this._tmdbApiConfig.getTrendingSearchResult}?query=${str}`;
        const fullUrl = this.addApiKey(`${url}`);
        return this._httpService.get(fullUrl);
    }

    async getObjectByNameAndType(name, mediaType) {
        const { results } = await this.getTrendingSearchResult(name);
        return results.filter((obj) => obj.media_type === mediaType);
    }

    async getObjectByName(substring) {
        const tmdbObject = await this.getTrendingSearchResult(substring);
        return tmdbObject.results[0];
    }

    async getPersonCombinedCreditsByPersonId(id) {
        const url = `${this._tmdbApiConfig.host}${this._tmdbApiConfig.basePath}/person/${id}${this._tmdbApiConfig.getPersonCombinedCreditsByPersonId}`;
        const fullUrl = this.addApiKey(`${url}?`);
        return this._httpService.get(fullUrl);
    }

    async getMovieDetailsById(id) {
        const url = `${this._tmdbApiConfig.host}${this._tmdbApiConfig.basePath}${this._tmdbApiConfig.getMovieDetailsById}/${id}`;
        const fullUrl = this.addApiKey(`${url}?`);
        return this._httpService.get(fullUrl);
    }

    async getActorDetailsById(id) {
        const url = `${this._tmdbApiConfig.host}${this._tmdbApiConfig.basePath}${this._tmdbApiConfig.getMovieDetailsById}/${id}`;
        const fullUrl = this.addApiKey(`${url}?`);
        return this._httpService.get(fullUrl);
    }

    addApiKey(url) {
        return `${url}&api_key=${this._tmdbApiConfig.apiKey}`;
    }

    // async getObjectIdByName(substring) {
    //     const tmdbObject = await this.getTrendingSearchResult(substring);
    //     return tmdbObject.results[0].id;
    // }

    // async getActorListByMovieName(name) {
    //     // this._httpService.get()
    // }

    // async getMovieDetailsByName(name) {
    //     const movieId = this.getMovieIdByMovieName(name);
    //     return this.getMovieDetailsById(movieId);
    // }

    // getMovieIdByMovieName(movieName) {
    //     return this._config.movieIdMap[movieName]
    // }

    // async listMoviesByActors() {
    // }
};
