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
            const actorMoviesMap = {};
            await Promise.all(
                this._config.peopleList.map(async (actorName) => {
                    const objectList = await this._tmdbService.getObjectByNameAndType(actorName, 'person');
                    if (objectList.length) {
                        const combinedCreditObj = await this._tmdbService.getPersonCombinedCreditsByPersonId(objectList[0].id);
                        const movieList = combinedCreditObj.cast.filter((obj) => obj.media_type === 'movie').map((obj) => obj.title);
                        actorMoviesMap[actorName] = movieList;
                    }
                })
            );
            return actorMoviesMap;
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
            const actorPlayMoreThanOne = [];
            await Promise.all(
                this._config.peopleList.map(async (actorName) => {
                    const objectList = await this._tmdbService.getObjectByNameAndType(actorName, 'person');
                    if (objectList.length) {
                        const combinedCreditObj = await this._tmdbService.getPersonCombinedCreditsByPersonId(objectList[0].id);
                        const movieList = combinedCreditObj.cast.filter((obj) => obj.media_type === 'movie').map((obj) => obj.title);
                        if (movieList.length > 1) {
                            actorPlayMoreThanOne.push(actorName);
                        }
                    }
                })
            );
            return actorPlayMoreThanOne;
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
