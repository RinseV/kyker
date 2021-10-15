import 'dotenv-safe/config';
import Application from './application';

(async () => {
    const application = new Application();
    await application.connect();
    await application.init();
})();
