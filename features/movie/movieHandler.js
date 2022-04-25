const opentracing = require('opentracing');

module.exports = class MovieHandler {
    constructor(config, tmdbService, logger, tracer, serviceData) {
        this._config = config;
        this._tmdbService = tmdbService;
        this._logger = logger;
        this._tracer = tracer;
        this._serviceData = serviceData;
    }

    // For question 1
    async listMoviesByActors(parentSpan) {
        const logObj = {
            prefix: `${this.constructor.name} - ${this.listMoviesByActors.name}`,
            isError: false,
            msg: 'success',
        };
        const span = this._tracer.startSpan(logObj.prefix, { childOf: parentSpan });
        try {
            // iterate all actors
            // promise all
            const promiseList = [];
            this._config.people.forEach(actorName => {
                promiseList.push(this._tmdbService.getMovieListByActorName(actorName));
            });
            const resultList = await Promise.all(promiseList);
            return resultList;
            //return await this._tmdbService.getMovieDetailsByName('Iron Man');
        } catch (error) {
            span.setTag(opentracing.Tags.ERROR, true);
            logObj.isError = true;
            logObj.msg = error.message;
            throw error;
        } finally {
            this._logger.log(logObj.isError ? 'error' : 'info', `${logObj.prefix} - ${logObj.msg}`, span);
            span.finish();
        }
    }

    async listMultipleCharactersActors(parentSpan) {
        const logObj = {
            prefix: `${this.constructor.name} - ${this.listMoviesByActors.name}`,
            isError: false,
            msg: 'success',
        };
        const span = this._tracer.startSpan(logObj.prefix, { childOf: parentSpan });
        try {
            // return await this._tmdbService.
        } catch (error) {
            span.setTag(opentracing.Tags.ERROR, true);
            logObj.isError = true;
            logObj.msg = error.message;
            throw error;
        } finally {
            this._logger.log(logObj.isError ? 'error' : 'info', `${logObj.prefix} - ${logObj.msg}`, span);
            span.finish();
        }
    }

    async getSameRoleActors(parentSpan) {
        const logObj = {
            prefix: `${this.constructor.name} - ${this.listMoviesByActors.name}`,
            isError: false,
            msg: 'success',
        };
        const span = this._tracer.startSpan(logObj.prefix, { childOf: parentSpan });
        try {
            // return await this._tmdbService.
        } catch (error) {
            span.setTag(opentracing.Tags.ERROR, true);
            logObj.isError = true;
            logObj.msg = error.message;
            throw error;
        } finally {
            this._logger.log(logObj.isError ? 'error' : 'info', `${logObj.prefix} - ${logObj.msg}`, span);
            span.finish();
        }
    }
};
