import React from 'react';

const FailedPayment = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">FAILED / PENDING PAYMENT</h1>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <p className="text-muted-foreground">
          FAILED / PENDING PAYMENT module content goes here.
        </p>
      </div>
    </div>
  );
};

export default FailedPayment;
