module.exports = class extends think.controller.base {
  /**
   * display error page
   * @param  {Number} status []
   * @return {Promise}        []
   */
  displayError(status) {
    // hide error message on production env
    if (think.env === 'production') {
      this.http.error = null;
    }

    const errorConfig = this.config('error');
    const message = (this.http.error && this.http.error.message) || '';
    if (this.isJsonp()) {
      this.jsonp({
        [errorConfig.key]: status,
        [errorConfig.msg]: message,
      });
      return;
    } else if (this.isAjax()) {
      this.fail(status, message);
      return;
    }

    let module = 'common';
    if (think.mode !== think.mode_module) {
      module = this.config('default_module');
    }
    const file = `${module}/error/${status}.html`;
    let options = this.config('tpl');
    options = think.extend({}, options, { type: 'base', file_depr: '_' });
    this.fetch(file, {}, options).then((text) => {
      const content = text.replace('ERROR_MESSAGE', message);
      this.type(options.content_type);
      this.end(content);
    });
  }

  /**
   * Bad Request
   * @return {Promise} []
   */
  _400Action() {
    return this.displayError(400);
  }

  /**
   * Forbidden
   * @return {Promise} []
   */
  _403Action() {
    return this.displayError(403);
  }

  /**
   * Not Found
   * @return {Promise}      []
   */
  _404Action() {
    return this.displayError(404);
  }

  /**
   * Internal Server Error
   * @return {Promise}      []
   */
  _500Action() {
    return this.displayError(500);
  }

  /**
   * Service Unavailable
   * @return {Promise}      []
   */
  _503Action() {
    return this.displayError(503);
  }
};
