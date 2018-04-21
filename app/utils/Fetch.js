/**
 * @namespace Utils
 */

/**
 * Class use to wrapp fetch.
 * @memberOf Utils
 */
class Fetch {
    /**
     * Format fetch response header
     * @param {object} headers List of headers from fetch
     * @returns {object} List of repsonse headers
     * @private
     */
    static getHeaders(headers) {
        const responseHeaders = {};
        headers.forEach((val, key) => {
            let value;
            try {
                value = JSON.parse(val);
            } catch (e) {
                value = val;
            } finally {
                responseHeaders[key] = value;
            }
        });
        return responseHeaders;
    }

    /**
     * Use to handle fetch response.
     * @param {object} response Response object.
     * @returns {Promise} Result.
     * @private
     */
    static handleResponse(response) {
        const statusCode = response.status,
            headers = this.getHeaders(response.headers);
        return new Promise((resolve, reject) => {
            response.json()
                .then(body => {
                    if (response.ok) {
                        resolve({
                            body,
                            statusCode,
                            headers
                        });
                    } else {
                        reject({
                            code: statusCode || 500,
                            message: body.message || 'Error occured'
                        });
                    }
                })
                .catch(() => {
                    if (response.ok) {
                        resolve({
                            body: '',
                            statusCode,
                            headers
                        });
                    } else {
                        reject({
                            code: statusCode || 500,
                            message: response.statusText || 'Error occured'
                        });
                    }
                });
        });
    }

    /**
     * Handle request error
     * @param {object} err Error object
     * @returns {Promise} Result
     */
    static handleError(err) {
        return new Promise((resolve, reject) => {
            reject({
                code: err.code,
                message: err.statusText || err.message
            });
        });
    }

    /**
     * Send request
     * @param {string} URL Resource url
     * @param {Object | undefined} requestSettings Settings for request.
     * @returns {Promise.<T>|*} Result
     */
    static fetching(URL = '', requestSettings = {
        method: 'GET'
    }) {
        const headers = {...requestSettings.headers, pragma: 'no-cache', 'cache-control': 'no-cache'};
        return fetch(URL, {...requestSettings, credentials: 'same-origin', headers})
            .then(response => this.handleResponse(response))
            .catch(err => this.handleError(err));
    }
}

/**
 * @memberOf module:Utils.Fetch
 * @export {Fetch}
 */
export default Fetch;
