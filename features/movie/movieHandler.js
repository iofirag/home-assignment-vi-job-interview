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
                    const [person] = objectList;
                    if (objectList.length) {
                        const personMovieList = await this.getMarvelMovieList(person.id);
                        actorMoviesMap[actorName] = personMovieList;
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
            const actorPlayMoreThanOneMovie = [];
            await Promise.all(
                this._config.peopleList.map(async (actorName) => {
                    const objectList = await this._tmdbService.getObjectByNameAndType(actorName, 'person');
                    const [person] = objectList;
                    if (objectList.length) {
                        const personMovieList = await this.getMarvelMovieList(person.id);
                        if (personMovieList.length > 1) {
                            actorPlayMoreThanOneMovie.push(actorName);
                        }
                    }
                })
            );
            return actorPlayMoreThanOneMovie;
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
            let isSameRoleActors = false;
            let exampleActorList = [];
            let movieTitle = '';
            let character = '';
            await Promise.all(
                this._config.movieList.map(async (movieName) => {
                    const objectList = await this._tmdbService.getObjectByNameAndType(movieName, 'movie');
                    const [movie] = objectList;
                    if (objectList.length) {
                        const castObj = await this._tmdbService.getMovieCredits(movie.id);
                        const characterMap = {};
                        if (isSameRoleActors) return;
                        isSameRoleActors = castObj.cast.some((actor) => {
                            if (characterMap[actor.character]) {
                                exampleActorList = [...characterMap[actor.character], actor.name];
                                movieTitle = movie.title;
                                character = actor.character;
                                return true;
                            } else {
                                characterMap[actor.character] = [actor.name];
                                return false;
                            }
                        });
                    }
                })
            );
            return {
                isSameRoleActors,
                ...(isSameRoleActors && { exampleActorList, movieTitle, character }),
            };
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

    async getMarvelMovieList(personId) {
        const combinedCreditObj = await this._tmdbService.getPersonCombinedCredits(personId);
        const movieList = combinedCreditObj.cast
            .filter((obj) => obj.media_type === 'movie' && this._config.movieList.includes(obj.title))
            .map((obj) => obj.title);
        return movieList;
    }
};
