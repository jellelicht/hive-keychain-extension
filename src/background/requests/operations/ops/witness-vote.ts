import { getRequestHandler } from '@background/requests';
import {
  beautifyErrorMessage,
  createMessage,
} from '@background/requests/operations/operations.utils';
import { AccountWitnessVoteOperation, PrivateKey } from '@hiveio/dhive';
import {
  KeychainKeyTypesLC,
  RequestId,
  RequestWitnessVote,
} from '@interfaces/keychain.interface';

export const broadcastWitnessVote = async (
  data: RequestWitnessVote & RequestId,
) => {
  const client = getRequestHandler().getHiveClient();
  let result, err;

  try {
    let key = getRequestHandler().key;
    if (!key) {
      [key] = getRequestHandler().getUserKey(
        data.username!,
        KeychainKeyTypesLC.active,
      ) as [string, string];
    }

    result = await client.broadcast.sendOperations(
      [
        [
          'account_witness_vote',
          {
            account: data.username,
            witness: data.witness,
            approve: data.vote,
          },
        ] as AccountWitnessVoteOperation,
      ],
      PrivateKey.from(key!),
    );
  } catch (e) {
    err = e;
  } finally {
    const err_message = beautifyErrorMessage(err);
    const message = createMessage(
      err,
      result,
      data,
      data.vote
        ? chrome.i18n.getMessage('bgd_ops_witness_voted', [data.witness])
        : chrome.i18n.getMessage('bgd_ops_witness_unvoted', [data.witness]),
      err_message,
    );
    return message;
  }
};
