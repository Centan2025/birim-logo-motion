import { createServer } from 'vite';

async function start() {
  const server = await createServer({
    server: {
      port: 5173,
      host: '0.0.0.0',
    },
  });

  await server.listen();
  console.log('Vite dev server running permanently at http://localhost:5173/');

  // Keep alive
  setInterval(() => {}, 3600000);
}

start().catch((err) => {
  console.error('Failed to start Vite server:', err);
  process.exit(1);
});
