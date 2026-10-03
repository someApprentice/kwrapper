import { PayerDTO } from '@/services/payer';
import { ProjectDTO } from '@/services/project';
import { ProjectFileDTO } from '@/services/project-file';

export interface SynchronizationDTO {
  payers: PayerDTO[];

  projects: ProjectDTO[];

  files: ProjectFileDTO[];

  // @TODO
  // offers: OffersDTO[];
}

export class SynchronizationException extends Error {
  constructor(
    msg: string = "Synchronization has failed."
  ) {
    super(msg);

    Object.setPrototypeOf(this, SynchronizationException.prototype);
  }
}

export class SynchronizationHttpException extends SynchronizationException {
  constructor(
    public readonly response: Response,
    msg: string = "The synchronization request has failed."
  ) {
    super(msg);

    Object.setPrototypeOf(this, SynchronizationHttpException.prototype);
  }
}

export async function synchronize(hash: string, since?: number): Promise<SynchronizationDTO> {
  const BASE_URL = import.meta.env.VITE_ARANEAE_BASE_URL;
  const SYNC_PATH = import.meta.env.VITE_ARANEAE_SYNC_PATH;

  const params = new URLSearchParams();

  if (!!since) {
    params.set('since', since.toString());
  }

  const request = new Request(`${BASE_URL}${SYNC_PATH}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${hash}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  const response = await fetch(request);

  if (!response.ok) throw new SynchronizationHttpException(response, await response.text());

  const dto = await response.json() as SynchronizationDTO;

  return dto;
}
