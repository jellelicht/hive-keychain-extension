import {setErrorMessage} from '@popup/actions/error-message.actions';
import {navigateTo} from '@popup/actions/navigation.actions';
import {RootState} from '@popup/store';
import React, {useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import ButtonComponent from 'src/common-ui/button/button.component';
import {InputType} from 'src/common-ui/input/input-type.enum';
import InputComponent from 'src/common-ui/input/input.component';
import {PageTitleComponent} from 'src/common-ui/page-title/page-title.component';
import {Screen} from 'src/reference-data/screen.enum';
import AccountUtils from 'src/utils/account.utils';
import './add-by-keys.component.css';

const AddByKeys = ({setErrorMessage, navigateTo}: PropsFromRedux) => {
  const [username, setUsername] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const submitForm = async (): Promise<void> => {
    const keys = await AccountUtils.verifyAccount(
      username,
      privateKey,
      setErrorMessage,
    );
    console.log(keys);
    if (!keys) {
      return;
    }
    if (keys.active || keys.memo || keys.posting) {
      navigateTo(Screen.ACCOUNT_PAGE_SELECT_KEYS);
    }
  };

  return (
    <div className="add-by-keys-page">
      <PageTitleComponent
        title="popup_html_setup"
        isBackButtonEnabled={true}
        backScreen={Screen.ACCOUNT_PAGE_INIT_ACCOUNT}
      />
      <div
        className="caption"
        dangerouslySetInnerHTML={{
          __html: chrome.i18n.getMessage('popup_html_setup_text'),
        }}></div>
      <div className="form-container">
        <InputComponent
          value={username}
          onChange={setUsername}
          logo="arobase"
          placeholder="popup_html_username"
          type={InputType.TEXT}
        />
        <InputComponent
          value={privateKey}
          onChange={setPrivateKey}
          logo="key"
          placeholder="popup_html_private_key"
          type={InputType.PASSWORD}
        />
        <ButtonComponent label={'popup_html_submit'} onClick={submitForm} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

const connector = connect(mapStateToProps, {setErrorMessage, navigateTo});
type PropsFromRedux = ConnectedProps<typeof connector>;

export const AddByKeysComponent = connector(AddByKeys);
