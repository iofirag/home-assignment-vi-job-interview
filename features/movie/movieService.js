const opentracing = require("opentracing");

module.exports = class MovieService {
    constructor(movieHandler, logger, tracer, serviceData) {
        this._handler = movieHandler;
        this._logger = logger;
        this._tracer = tracer;
        this._serviceData = serviceData;
    }

    async listMoviesByActors(req, res) {
        let result;
        const logObj = {
            prefix: `${this.constructor.name} - ${req.swagger.operation.operationId}`,
            isError: false,
            msg: 'success',
        };
        const ctx = this._tracer.extract(opentracing.FORMAT_HTTP_HEADERS, req.headers);
        const span = ctx ? this._tracer.startSpan(this._serviceData.name, { childOf: ctx }) : this._tracer.startSpan(this._serviceData.name);
        try {
            result = await this._handler.listMoviesByActors(span);
        } catch (error) {
            span.setTag(opentracing.Tags.ERROR, true);
            logObj.isError = true;
            logObj.msg = error.message;
            res.statusCode = 500;
        } finally {
            this._logger.log(logObj.isError ? 'error' : 'info', `${logObj.prefix} - ${logObj.msg}`, span);
            res.setHeader('Content-Type', 'application/json');
            res.end(result ? JSON.stringify(result || '') : '');
            span.finish();
        }
    }

    async listMultipleCharactersActors(req, res) {
        let result;
        const logObj = {
            prefix: `${this.constructor.name} - ${req.swagger.operation.operationId}`,
            isError: false,
            msg: 'success',
        };
        const ctx = this._tracer.extract(opentracing.FORMAT_HTTP_HEADERS, req.headers);
        const span = ctx ? this._tracer.startSpan(this._serviceData.name, { childOf: ctx }) : this._tracer.startSpan(this._serviceData.name);
        try {
            result = await this._handler.listMultipleCharactersActors(span);
        } catch (error) {
            span.setTag(opentracing.Tags.ERROR, true);
            logObj.isError = true;
            logObj.msg = error.message;
            res.statusCode = 500;
        } finally {
            this._logger.log(logObj.isError ? 'error' : 'info', `${logObj.prefix} - ${logObj.msg}`, span);
            res.setHeader('Content-Type', 'application/json');
            res.end(result ? JSON.stringify(result || '') : '');
            span.finish();
        }
    }

    async getSameRoleActors(req, res) {
        let result;
        const logObj = {
            prefix: `${this.constructor.name} - ${req.swagger.operation.operationId}`,
            isError: false,
            msg: 'success',
        };
        const ctx = this._tracer.extract(opentracing.FORMAT_HTTP_HEADERS, req.headers);
        const span = ctx ? this._tracer.startSpan(this._serviceData.name, { childOf: ctx }) : this._tracer.startSpan(this._serviceData.name);
        try {
            result = await this._handler.getSameRoleActors(span);
        } catch (error) {
            span.setTag(opentracing.Tags.ERROR, true);
            logObj.isError = true;
            logObj.msg = error.message;
            res.statusCode = 500;
        } finally {
            this._logger.log(logObj.isError ? 'error' : 'info', `${logObj.prefix} - ${logObj.msg}`, span);
            res.setHeader('Content-Type', 'application/json');
            res.end(result ? JSON.stringify(result || '') : '');
            span.finish();
        }
    }
};