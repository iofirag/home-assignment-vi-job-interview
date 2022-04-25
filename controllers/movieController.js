const container = require("../containerConfig");

const movieService = container.resolve("movieService");

// exports = {
//     listMoviesByActors: movieService.listMoviesByActors.bind(movieService),
//     listMultipleCharactersActors: movieService.listMultipleCharactersActors.bind(movieService),
//     getSameRoleActors: movieService.getSameRoleActors.bind(movieService),
// };

exports.listMoviesByActors = movieService.listMoviesByActors.bind(movieService)