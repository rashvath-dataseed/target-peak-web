import { Plus, Pencil, Trash2 } from "lucide-react";
import { Column, Action } from "./DynamicTable";


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


export type BannerRow = {
  bannerId: number;
  sansthaName: string;
  page: string;
  type: string;
  uploadType: string;
  validFrom: string;
  validTo: string;
  mediaUrl: string;
};
export const BannerColumns = (
  onEdit: (row: any) => void,
  onDelete: (row: any) => void
): {
  columns: Column<any>[];
  actions: Action<any>[];
} => ({
  columns: [
    {
      key: "srNo",
      header: "Sr No",
      render: (_, index) => index + 1,
    },
    { key: "sansthaName", header: "Sanstha Name" },
    { key: "page", header: "Page" },
    { key: "type", header: "Type" },
    { key: "uploadType", header: "Upload Type" },
    { key: "validFrom", header: "Valid From" },
    { key: "validTo", header: "Valid To" },
    {
      key: "mediaUrl",
      header: "Media",
      render: (row) => (
        <img
          src={row.mediaUrl}
          alt="banner"
          className="h-10 w-16 object-cover rounded"
        />
      ),
    },
  ],

  actions: [
    {
      label: <Pencil size={14} />,
      onClick: onEdit,
      className: "bg-blue-500 text-white",
    },
    {
      label: <Trash2 size={14} />,
      onClick: onDelete,
      className: "bg-red-500 text-white",
    },
  ],
});
//SUPPORT EMAIL
export type SupportMailRow = {
  id: number;
  emailId: string;
  createdAt: string;
  updatedAt: string;
};

export const SupportMailColumns = (
  onEdit: (row: SupportMailRow) => void,
  onDelete: (row: SupportMailRow) => void
): {
  columns: Column<SupportMailRow>[];
  actions: Action<SupportMailRow>[];
} => ({
  columns: [
    {
      key: "srNo",
      header: "Sr.No.",
      render: (_, index) => index + 1,
    },
    {
      key: "emailId",
      header: "Support Email",
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
    {
      key: "updatedAt",
      header: "Updated At",
      render: (row) => new Date(row.updatedAt).toLocaleString(),
    },
  ],

  actions: [
    {
      label: <Pencil size={14} />,
      onClick: onEdit,
      className: "bg-blue-500 text-white",
    },
    {
      label: <Trash2 size={14} />,
      onClick: onDelete,
      className: "bg-red-500 text-white",
    },
  ],
});