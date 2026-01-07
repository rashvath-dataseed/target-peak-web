import React from "react";
import DynamicTable from "@/components/Dynamic-Table/DynamicTable";
import { SupportCategoryColumns } from "@/components/Dynamic-Table/Columsn";

const SupportCategory = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">SUPPORT CATEGORY</h1>
      </div>

      {/* Top Buttons */}
      <div className="flex gap-2">
        <button className="bg-red-500 text-white px-4 py-2 rounded text-sm font-semibold">
          + Add Support Category
        </button>
        <button className="bg-gray-100 border px-4 py-2 rounded text-sm font-semibold">
          + Add Sub Support Category
        </button>
        <button className="bg-gray-100 border px-4 py-2 rounded text-sm font-semibold">
          Questions
        </button>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <DynamicTable
          columns={SupportCategoryColumns.columns}
          data={[]}
          actions={SupportCategoryColumns.actions}
        />
      </div>
    </div>
  );
};

export default SupportCategory;
