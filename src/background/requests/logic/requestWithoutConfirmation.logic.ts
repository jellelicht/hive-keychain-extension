import { performOperationFromIndex } from '@background/index';
import { RequestsHandler } from '@background/requests';
import { KeychainRequest } from '@interfaces/keychain.interface';

export const requestWithoutConfirmation = async (
  requestHandler: RequestsHandler,
  tab: number,
  request: KeychainRequest,
) => {
  performOperationFromIndex(requestHandler, tab, request);
};
