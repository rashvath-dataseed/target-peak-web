export interface HierarchyLevel {
  id: string;
  name: string;
  level: number;
  parentId: string | null;
  description?: string;
  adminCount: number;
  createdAt: string;
}

export interface HierarchyNode extends HierarchyLevel {
  children: HierarchyNode[];
  isExpanded?: boolean;
}

export interface Permission {
  id: string;
  moduleId: string;
  moduleName: string;
  access: 'full' | 'read' | 'none';
  subModules?: SubModulePermission[];
}

export interface SubModulePermission {
  id: string;
  name: string;
  access: 'full' | 'read' | 'none';
}

export interface Module {
  id: string;
  name: string;
  icon: string;
  description: string;
  subModules: SubModule[];
}

export interface SubModule {
  id: string;
  name: string;
  description: string;
}
