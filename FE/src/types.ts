export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoFormData {
  title: string;
  description?: string;
}

