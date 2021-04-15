import App from './app';
import { BaseModule } from './modules';

import SportModule from './modules/sport';
import EventModule from './modules/event';

const app = new App<BaseModule>([SportModule, EventModule]);

app.listen();
