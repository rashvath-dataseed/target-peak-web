// Example Usage: TokenDetails.tsx
import React, { useState } from "react";
import DynamicTable, {
  Action,
  Column,
} from "@/components/Dynamic-Table/DynamicTable";
import { DynamicForm } from "@/components/form/DynamicForm";
import { FormConfig } from "@/components/form/form.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Token = {
  code: number;
  tokenName: string;
  marathi: string;
  hindi: string;
  abbreviation: string;
};

const TokenDetails = () => {
  const [data, setData] = useState<Token[]>([
    {
      code: 101,
      tokenName: "Token A",
      marathi: "टोकन A",
      hindi: "टोकन A",
      abbreviation: "A",
    },
    {
      code: 102,
      tokenName: "Token B",
      marathi: "टोकन B",
      hindi: "टोकन B",
      abbreviation: "B",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingToken, setEditingToken] = useState<Token | null>(null);
  const { toast } = useToast();

  const columns: Column<Token>[] = [
    {
      key: "srNo",
      header: "Sr.No",
      render: (_, index) => index + 1,
    },
    { key: "code", header: "Code" },
    { key: "tokenName", header: "Token Name" },
    { key: "marathi", header: "Token In Marathi" },
    { key: "hindi", header: "Token In Hindi" },
    { key: "abbreviation", header: "Abbreviation" },
  ];

  const handleAdd = () => {
    setEditingToken(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (row: Token) => {
    setEditingToken(row);
    setIsDialogOpen(true);
  };

  const handleDelete = (row: Token) => {
    if (confirm(`Are you sure you want to delete ${row.tokenName}?`)) {
      setData((prev) => prev.filter((item) => item.code !== row.code));
      toast({
        title: "Success",
        description: "Token deleted successfully",
      });
    }
  };

  const handleFormSubmit = async (formData: Record<string, any>) => {
    if (editingToken) {
      // Update existing token
      setData((prev) =>
        prev.map((item) =>
          item.code === editingToken.code ? { ...item, ...formData } : item
        )
      );
      toast({
        title: "Success",
        description: "Token updated successfully",
      });
    } else {
      // Add new token
      const newToken: Token = {
        code: Math.max(...data.map((t) => t.code), 100) + 1,
        ...formData,
        tokenName: "",
        marathi: "",
        hindi: "",
        abbreviation: ""
      };
      setData((prev) => [...prev, newToken]);
      toast({
        title: "Success",
        description: "Token added successfully",
      });
    }
    setIsDialogOpen(false);
  };

  const formConfig: FormConfig = {
    fields: [
      {
        name: "code",
        label: "Code",
        type: "number",
        required: true,
        placeholder: "Enter code",
        disabled: !!editingToken,
      },
      {
        name: "tokenName",
        label: "Token Name",
        type: "text",
        required: true,
        placeholder: "Enter token name",
      },
      {
        name: "marathi",
        label: "Token In Marathi",
        type: "text",
        placeholder: "टोकन नाव प्रविष्ट करा",
      },
      {
        name: "hindi",
        label: "Token In Hindi",
        type: "text",
        placeholder: "टोकन का नाम दर्ज करें",
      },
      {
        name: "abbreviation",
        label: "Abbreviation",
        type: "text",
        required: true,
        placeholder: "Enter abbreviation",
        validation: {
          maxLength: 5,
        },
      },
    ],
    columns: 1,
    submitLabel: editingToken ? "Update" : "Add Token",
    cancelLabel: "Cancel",
    showCancel: true,
    initialValues: editingToken || undefined,
    onSubmit: handleFormSubmit,
    onCancel: () => setIsDialogOpen(false),
  };

  const actions: Action<Token>[] = [
    {
      label: "Edit",
      className: "bg-blue-600",
      onClick: handleEdit,
    },
    {
      label: "Delete",
      className: "bg-red-600",
      onClick: handleDelete,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">TOKEN DETAILS</h1>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Token
        </Button>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <DynamicTable columns={columns} data={data} actions={actions} />
      </div>

      {/* Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingToken ? "Edit Token" : "Add New Token"}
            </DialogTitle>
          </DialogHeader>
          <DynamicForm config={formConfig} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TokenDetails;
