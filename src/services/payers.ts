export interface PayerDTO {
  id: number;

  username: string;

  name?: string;

  avatar_url?: string;

  title?: string;

  description?: string;

  registered_at?: number;

  projects_count: number;

  hire_percent: number;
}
