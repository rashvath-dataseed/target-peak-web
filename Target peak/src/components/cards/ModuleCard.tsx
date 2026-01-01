import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ModuleItem } from "@/app/Constants/modules";

const ModuleCard: React.FC<ModuleItem> = ({ title, path, icon: Icon }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(path)}
      className="
        cursor-pointer 
        hover:shadow-md 
        transition-all 
        flex 
        flex-col 
        items-center 
        justify-center 
        h-[120px]
        text-center
      "
    >
      <Icon className="h-7 w-7 text-muted-foreground mb-2" />
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
    </Card>
  );
};

export default ModuleCard;
