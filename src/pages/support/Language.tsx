"use client";

import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/Dynamic-Table/DynamicTable";
import { DynamicForm } from "@/components/form/DynamicForm";
import { FormConfig } from "@/components/form/form.types";
import { useToast } from "@/hooks/use-toast";

import {
  LanguageColumns,
  LanguageRow,
} from "@/components/Dynamic-Table/Columsn";

import {
  getAllLanguages,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from "./Services/api";

const Language = () => {
  const { toast } = useToast();

  const [data, setData] = useState<LanguageRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageRow | null>(
    null
  );

  /* FETCH */

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const res = await getAllLanguages(true);
      setData(res.data.data);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch languages",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  /* ACTIONS */

  const handleEdit = (row: LanguageRow) => {
    setSelectedLanguage(row);
    setMode("edit");
  };

  const handleDelete = async (row: LanguageRow) => {
    if (!confirm("Are you sure you want to delete this language?")) return;

    try {
      await deleteLanguage(row.id);
      toast({
        title: "Success",
        description: "Language deleted successfully",
      });
      fetchLanguages();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description:
          err?.response?.data?.message || "Unable to delete language",
      });
    }
  };

  /* SUBMIT */

  const handleSubmit = async (formData: any) => {
    try {
      if (mode === "edit" && selectedLanguage) {
        await updateLanguage(selectedLanguage.id, formData);
        toast({
          title: "Updated",
          description: "Language updated successfully",
        });
      } else {
        await createLanguage(formData);
        toast({
          title: "Created",
          description: "Language added successfully",
        });
      }

      setMode("list");
      setSelectedLanguage(null);
      fetchLanguages();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description: err?.response?.data?.message || "Something went wrong",
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
            sign: selectedLanguage?.sign,
            language_code: selectedLanguage?.language_code,
            language: selectedLanguage?.language,
            translated: selectedLanguage?.translated,
          }
        : {
            sign: "",
            language_code: "",
            language: "",
            translated: "",
          },

    fields: [
      {
        name: "sign",
        label: "Sign",
        type: "text",
        required: true,
      },
      {
        name: "language_code",
        label: "Language Code",
        type: "text",
        required: true,
      },
      {
        name: "language",
        label: "Language",
        type: "text",
        required: true,
      },
      {
        name: "translated",
        label: "Translated",
        type: "text",
        required: true,
        gridColumn: "span 2",
      },
    ],

    onSubmit: handleSubmit,
    onCancel: () => {
      setMode("list");
      setSelectedLanguage(null);
    },
  };

  const tableConfig = LanguageColumns(handleEdit, handleDelete);

  /* UI */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">LANGUAGE</h1>

        {mode === "list" && (
          <button
            onClick={() => setMode("add")}
            className="bg-red-500 text-white px-4 py-2 rounded text-sm font-semibold"
          >
            + Add Language
          </button>
        )}
      </div>

      {/* Content */}
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
          <div className="w-full max-w-2xl rounded-lg border bg-white p-6 shadow-sm">
            <DynamicForm config={formConfig} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Language;
