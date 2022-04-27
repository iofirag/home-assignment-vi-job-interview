const opentracing = require('opentracing');

module.exports = class TMDBService {
    constructor(httpService, tmdbApiConfig, logger, tracer) {
        this._httpService = httpService;
        this._tmdbApiConfig = tmdbApiConfig;
        this._logger = logger;
        this._tracer = tracer;
    }

    async getSearchMulti(str) {
        const url = `${this._tmdbApiConfig.host}${this._tmdbApiConfig.basePath}${this._tmdbApiConfig.getSearchMulti}?query=${str}`;
        const fullUrl = this.addApiKey(`${url}`);
        return this._httpService.get(fullUrl);
    }

    async getObjectByNameAndType(name, mediaType) {
        const { results } = await this.getSearchMulti(name);
        return results.filter((obj) => obj.media_type === mediaType);
    }

    async getPersonCombinedCredits(personId) {
        const url = `${this._tmdbApiConfig.host}${this._tmdbApiConfig.basePath}/person/${personId}${this._tmdbApiConfig.getPersonCombinedCredits}`;
        const fullUrl = this.addApiKey(`${url}?`);
        return this._httpService.get(fullUrl);
    }

    async getMovieCredits(movieId) {
        const url = `${this._tmdbApiConfig.host}${this._tmdbApiConfig.basePath}/movie/${movieId}${this._tmdbApiConfig.getMovieCredits}`;
        const fullUrl = this.addApiKey(`${url}?`);
        return this._httpService.get(fullUrl);
    }

    addApiKey(url) {
        return `${url}&api_key=${this._tmdbApiConfig.apiKey}`;
    }
};
