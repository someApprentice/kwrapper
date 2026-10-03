import { PayerDTO } from "@/services/payers";
import { ProjectFileDTO } from "@/services/project-files";

export interface ProjectDTO {
  id: number;

  payer: PayerDTO;

  title: string;

  description: string;

  price: number;

  price_limit?: number;

  response_count: number;

  activated_at: number;

  expire_at: number;

  files: ProjectFileDTO[]
}
