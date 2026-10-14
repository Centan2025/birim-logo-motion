import React from 'react';
import { createRoot } from 'react-dom/client';
import { ShowcaseApp } from './ShowcaseApp';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ShowcaseApp />
    </React.StrictMode>
  );
}
