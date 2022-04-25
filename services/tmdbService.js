const opentracing = require('opentracing');

module.exports = class TMDBService {
    constructor(config, httpService, tmdbApiConfig, logger, tracer) {
        this._config = config;
        this._httpService = httpService;
        this._tmdbApiConfig = tmdbApiConfig;
        this._logger = logger;
        this._tracer = tracer;
    }

    getMovieIdByMovieName(movieName) {
        return this._config.movieIdMap[movieName]
    }
    
    async getActorListByMovieName(name) {
        // this._httpService.get()        
    }
    
    async getMovieListByActorName(name) {
        
    }

    async getMovieDetailsByName(name) {
        const movieId = this.getMovieIdByMovieName(name);
        return this.getMovieDetailsById(movieId);
    }

    async getMovieDetailsById(id) {
        const fullUrl = this.addApiKey(`${this._tmdbApiConfig.host}${this._tmdbApiConfig.basePath}${this._tmdbApiConfig.getMovieDetailsById}/${id}?`);
        return this._httpService.get(fullUrl);
    }

    addApiKey(url) {
        return `${url}&api_key=${this._tmdbApiConfig.apiKey}`;
    }

    // async listMoviesByActors() {
    // }

        // async init() {
    //     try {
    //         this.authentication(this._config.apiKey);
    //     } catch (error) {
    //         this._logger.log('error', `${this.constructor.name} - ${this.init.name} failed. error: ${error.message}`);
    //     }
    // }

    // async authentication(apiKey) {
    //     try {
    //         const authResponse = await this._httpService.get(`${this._apiConfig.host}${this._apiConfig.basePath}${this._apiConfig.authentication}?api_key=${apiKey}`);
    //         this._sessionId = authResponse.data;
    //     } catch (error) {
    //         this._logger.log('error', `${this.constructor.name} - ${this.authentication.name} failed. error: ${error.message}`);
    //     }
    // }

    // async createMappingIndexIfNotExist(indexName, typeName, mappingBody, parentSpan) {
    //     const logObj = {
    //         prefix: `${this.constructor.name} - ${this.createMappingIndexIfNotExist.name}`,
    //         sw: new Stopwatch(true),
    //         isError: false,
    //         msg: 'success',
    //     };
    //     const span = this._tracer.startSpan(logObj.prefix, { childOf: parentSpan });
    //     try {
    //         const isIndexExists = this._client.indices.exists({ index: indexName });
    //         if (!isIndexExists.body) {
    //             this._logger.log('info', `${logObj.prefix} index ${indexName} does not exist. creating new index.`);
    //             await this._client.indices.create({
    //                 index: indexName,
    //                 body: {
    //                     // number_of_replicas: 1,
    //                     // number_of_shards: 15
    //                 },
    //             });
    //             await this.createMapping(indexName, this._docType, mappingBody, span);
    //         } else {
    //             this._logger.log('info', `${logObj.prefix} index ${indexName} already exist.`);
    //         }
    //     } catch (error) {
    //         span.setTag(opentracing.Tags.ERROR, true);
    //         logObj.isError = true;
    //         logObj.msg = `createIndex ${indexName} error: ${error.message}`;
    //         throw error;
    //     } finally {
    //         this._logger.log(
    //             logObj.isError ? 'error' : 'info',
    //             `${logObj.prefix} - ${logObj.msg}`,
    //             span
    //         );
    //         span.finish();
    //     }
    // }

    // async createMapping(indexName, typeName, mappingBody, parentSpan) {
    //     const logObj = {
    //         prefix: `${this.constructor.name} - ${this.createMapping.name}`,
    //         sw: new Stopwatch(true),
    //         isError: false,
    //         msg: 'success',
    //     };
    //     const span = this._tracer.startSpan(logObj.prefix, { childOf: parentSpan });
    //     try {
    //         this._logger.log('info', `${logObj.prefix} creating mapping.`);
    //         await this._client.indices.putMapping({
    //             index: indexName,
    //             body: mappingBody,
    //         });
    //     } catch (error) {
    //         span.setTag(opentracing.Tags.ERROR, true);
    //         logObj.isError = true;
    //         logObj.msg = `createIndex ${indexName} error: ${error.message}`;
    //         throw error;
    //     } finally {
    //         this._logger.log(
    //             logObj.isError ? 'error' : 'info',
    //             `${logObj.prefix} - ${logObj.msg}`,
    //             span,
    //             `time: ${logObj.sw.stop() / 1000}`
    //         );
    //         span.finish();
    //     }
    // }

    // async saveNewData() {
    //     await this._archiveService._client.index({
    //         index: this._index,
    //         body: newValue,
    //         refresh: 'wait_for',
    //     });
    // }

    // get() {
    //     this._client.get();
    // }

    // async query(querySyntax) {
    //     //await this._client.query({
    //     //    body: querySyntax,
    //     //    headers: sdfsdf
    //     //})
    // }
};
