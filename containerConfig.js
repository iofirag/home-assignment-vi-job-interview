const Awilix = require("awilix");
const config = require("config");
const HttpService = require('./services/httpService');
const TmdbService = require('./services/tmdbService');
const Logger = require('./services/loggerService');
const Probe = require("./services/probeService");
const Tracer = require("./services/tracerService");
const MovieService = require("./features/movie/movieService");
const MovieHandler = require("./features/movie/movieHandler");
const pkgJson = require("./package.json");

const container = Awilix.createContainer({
    injectionMode: Awilix.InjectionMode.CLASSIC,
});
container.register({
    // Values
    source: Awilix.asValue(config.get("source")),
    swaggerConfig: Awilix.asValue(config.get("swagger")),
    serverConfig: Awilix.asValue(config.get('server')),
    serviceData: Awilix.asValue({
        name: pkgJson.name,
        component: pkgJson.name,
        version: pkgJson.version,
        ts: Date.now()
    }),
    // Classes
    movieService: Awilix.asClass(MovieService).singleton(),
    movieHandler: Awilix.asClass(MovieHandler).inject(() => ({ config: config.get('questionData') })).singleton(),
    // Vendor classes
    tmdbService: Awilix.asClass(TmdbService).inject(() => ({ tmdbApiConfig: config.get('api').tmdb })).singleton(),
    httpService: Awilix.asClass(HttpService).inject(() => ({ config: config.get('http') })).singleton(),
    logger: Awilix.asClass(Logger).inject(() => ({ config: config.get('log') })).singleton(),
    probe: Awilix.asClass(Probe).inject(() => ({ config: config.get('probe') })).singleton(),
    tracer: Awilix.asClass(Tracer).inject(() => ({ config: config.get('tracer') })).singleton(),
});

module.exports = container;