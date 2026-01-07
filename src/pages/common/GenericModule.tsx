import React from 'react';
import { useLocation } from 'react-router-dom';

const GenericModule = () => {
  const location = useLocation();
  const title = location.pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Module';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <p className="text-muted-foreground">
          This is a placeholder for the <strong>{title}</strong> module.
          <br />
          File: <code>src/pages/modules/{title.replace(/ /g, '')}.tsx</code>
        </p>
      </div>
    </div>
  );
};

export default GenericModule;
