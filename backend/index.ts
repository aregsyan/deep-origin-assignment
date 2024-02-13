import { Application } from './src/Application';
import { TYPES } from './src/types';
import container from './src/container';

const app = container.get<Application>(TYPES.Application);

const processCloseHandler = async (): Promise<void> => {
  try {
    await app.stop.apply(app);
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  } catch (e) {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

const bindProcessCloseSignals = (): void => {
  process.on('exit', processCloseHandler);
  process.on('SIGINT', processCloseHandler);
  process.on('SIGTERM', processCloseHandler);
  process.on('SIGUSR1', processCloseHandler);
  process.on('SIGUSR2', processCloseHandler);
  process.on('uncaughtException', processCloseHandler);
};

const start = async (): Promise<void> => {
  await app.start(process.env.PORT ? parseInt(process.env.PORT, 10) : 3002);
  bindProcessCloseSignals();
};

start().catch((error) => {
  console.error('Error while starting application', error);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});
