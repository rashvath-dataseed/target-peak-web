"use client";

import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/Dynamic-Table/DynamicTable";
import { DynamicForm } from "@/components/form/DynamicForm";
import { FormConfig } from "@/components/form/form.types";
import { useToast } from "@/hooks/use-toast";

import {
  SupportWhatsappColumns,
  SupportWhatsappRow,
} from "@/components/Dynamic-Table/Columsn";

import {
  getAllSupportNumbers,
  createSupportNumber,
  updateSupportNumber,
  deleteSupportNumber,
} from "./Services/api";

const SupportWhatsapp = () => {
  const { toast } = useToast();

  const [data, setData] = useState<SupportWhatsappRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [selectedRow, setSelectedRow] = useState<SupportWhatsappRow | null>(
    null
  );

  /* FETCH */

  const fetchNumbers = async () => {
    try {
      setLoading(true);
      const res = await getAllSupportNumbers("whatsapp");
      setData(res.data.data);
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch WhatsApp numbers",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNumbers();
  }, []);

  /* ACTIONS */

  const handleEdit = (row: SupportWhatsappRow) => {
    setSelectedRow(row);
    setMode("edit");
  };

  const handleDelete = async (row: SupportWhatsappRow) => {
    if (!confirm("Delete this number?")) return;

    try {
      await deleteSupportNumber(row.id);
      toast({ title: "Deleted", description: "Number removed successfully" });
      fetchNumbers();
    } catch {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "Unable to delete number",
      });
    }
  };

  /* SUBMIT */

  const handleSubmit = async (formData: any) => {
    try {
      if (mode === "edit" && selectedRow) {
        await updateSupportNumber(selectedRow.id, {
          ...formData,
          type: "whatsapp",
        });
        toast({ title: "Updated", description: "Number updated" });
      } else {
        await createSupportNumber({
          ...formData,
          type: "whatsapp",
        });
        toast({ title: "Added", description: "Number added" });
      }

      setMode("list");
      setSelectedRow(null);
      fetchNumbers();
    } catch {
      toast({
        variant: "destructive",
        title: "Operation failed",
        description: "Something went wrong",
      });
    }
  };

  /* FORM CONFIG */

  const formConfig: FormConfig = {
    columns: 2,
    gap: 20,
    submitLabel: mode === "edit" ? "Update" : "Submit",
    showCancel: true,

    initialValues:
      mode === "edit"
        ? {
            country_code: selectedRow?.country_code,
            number: selectedRow?.number,
          }
        : {
            country_code: "+91",
            number: "",
          },

    fields: [
      {
        name: "country_code",
        label: "Country Code",
        type: "text",
        required: true,
      },
      {
        name: "number",
        label: "WhatsApp Number",
        type: "text",
        required: true,
        validation: {
          maxLength: 10,
          min: 1,
        },
      },
    ],

    onSubmit: handleSubmit,
    onCancel: () => {
      setMode("list");
      setSelectedRow(null);
    },
  };

  const tableConfig = SupportWhatsappColumns(handleEdit, handleDelete);

  /* UI */

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">SUPPORT WHATSAPP</h1>

        {mode === "list" && (
          <button
            onClick={() => setMode("add")}
            className="bg-red-500 text-white px-4 py-2 rounded text-sm font-semibold"
          >
            + Add WhatsApp Number
          </button>
        )}
      </div>

      {mode === "list" ? (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <DynamicTable
            columns={tableConfig.columns}
            data={data}
            actions={tableConfig.actions}
            loading={loading}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-full max-w-xl rounded-lg border bg-white p-6 shadow-sm">
            <DynamicForm config={formConfig} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportWhatsapp;
