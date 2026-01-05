import { Plus, Pencil, Trash2 } from "lucide-react";
import { Column, Action } from "./DynamicTable";

/* ==============================
   SUPPORT CATEGORY
================================ */

export type SupportCategoryRow = {
  categoryId: number;
  supportCategory: string;
  marathi: string;
  hindi: string;
  sortOrder: number;
};

export const SupportCategoryColumns: {
  columns: Column<SupportCategoryRow>[];
  actions: Action<SupportCategoryRow>[];
} = {
  columns: [
    {
      key: "srNo",
      header: "Sr.No.",
      render: (_, index) => index + 1,
    },
    { key: "categoryId", header: "Category Id" },
    { key: "supportCategory", header: "Support Category" },
    { key: "marathi", header: "Support Category In Marathi" },
    { key: "hindi", header: "Support Category In Hindi" },
    { key: "sortOrder", header: "Sort Order" },
  ],

  actions: [
    {
      label: <Plus size={14} />,
      onClick: (row) => console.log("Add Sub Category", row),
      className: "bg-green-500 text-white",
    },
    {
      label: <Pencil size={14} />,
      onClick: (row) => console.log("Edit", row),
      className: "bg-blue-500 text-white",
    },
    {
      label: <Trash2 size={14} />,
      onClick: (row) => console.log("Delete", row),
      className: "bg-red-500 text-white",
    },
  ],
};
