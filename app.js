'use strict';

class AppBoot {
  constructor(app) {
    this.app = app;
  }

  didReady() {
    const { options: { serverScope }, config: { ignoreRouter }, router } = this.app;

    // handle console router
    if (serverScope === 'console') {
      const layers = router.stack;
      for (const layer of layers) {
        if (ignoreRouter.every(router => typeof router === 'string'
          ? router !== layer.path
          : router.path !== layer.path || !layer.methods.includes(router.method.toUpperCase()))) {
          continue;
        }

        this.app.logger.info(`[devtoolx-console] ignore router: %s, methods: %s`, layer.path, layer.methods.join(','));
        layer.stack.pop();
      }
    }
  }
}

module.exports = AppBoot;