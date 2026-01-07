import React from 'react';
import { SupportCategoryColumns } from "@/components/Dynamic-Table/Columsn";
import DynamicTable from "@/components/Dynamic-Table/DynamicTable";
const Stream = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">STREAM</h1>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <DynamicTable
          columns={SupportCategoryColumns.columns}
          data={[]}
          actions={SupportCategoryColumns.actions}
        />
      </div>
    </div>
  );
};

export default Stream;

