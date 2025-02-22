import {
  KeychainKeyTypesLC,
  RequestBroadcast,
  RequestId,
} from '@interfaces/keychain.interface';
import { Rpc } from '@interfaces/rpc.interface';
import React from 'react';
import CollaspsibleItem from 'src/dialog/components/collapsible-item/collapsible-item';
import Operation from 'src/dialog/components/operation/operation';
import RequestItem from 'src/dialog/components/request-item/request-item';

type Props = {
  data: RequestBroadcast & RequestId;
  domain: string;
  tab: number;
  rpc: Rpc;
};

const Broadcast = (props: Props) => {
  const { data } = props;

  return (
    <Operation
      title={chrome.i18n.getMessage('dialog_title_broadcast')}
      {...props}
      canWhitelist={data.method.toLowerCase() !== KeychainKeyTypesLC.active}>
      <RequestItem title="dialog_account" content={`@${data.username}`} />
      <RequestItem title="dialog_key" content={data.method} />
      <CollaspsibleItem
        title="dialog_operations"
        content={JSON.stringify(data.operations, undefined, 2)}
        pre
      />
    </Operation>
  );
};

export default Broadcast;
