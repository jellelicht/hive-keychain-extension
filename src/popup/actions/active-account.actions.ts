import { ActionType } from '@popup/actions/action-type.enum';
import { AppThunk } from '@popup/actions/interfaces';
import { LocalAccount } from 'src/interfaces/local-account.interface';
import AccountUtils from 'src/utils/account.utils';

const TIME_REFERENCE = 1643236071000;

export const refreshActiveAccount =
  (): AppThunk => async (dispatch, getState) => {
    const delay = Math.min(
      ((Date.now() - TIME_REFERENCE) % 3) * 1000 + 100,
      3000,
    );
    setTimeout(() => {
      const account = getState().accounts.find(
        (localAccount: LocalAccount) =>
          localAccount.name === getState().activeAccount.name,
      );
      dispatch(loadActiveAccount(account));
    }, delay);
  };

export const refreshKeys = (localAccount: LocalAccount) => {
  return {
    type: ActionType.SET_ACTIVE_ACCOUNT,
    payload: {
      keys: localAccount.keys,
    },
  };
};

export const loadActiveAccount =
  (account: LocalAccount): AppThunk =>
  async (dispatch, getState) => {
    if (account) {
      dispatch(refreshKeys(account));
      dispatch(getAccountRC(account.name));
      const extendedAccount = await AccountUtils.getExtendedAccount(
        account.name,
      );
      dispatch({
        type: ActionType.SET_ACTIVE_ACCOUNT,
        payload: {
          account: extendedAccount,
          name: account.name,
        },
      });
    }
  };

export const getAccountRC =
  (username: string): AppThunk =>
  async (dispatch) => {
    const rc = await AccountUtils.getRCMana(username);
    dispatch({
      type: ActionType.SET_ACTIVE_ACCOUNT_RC,
      payload: rc,
    });
  };

export const resetActiveAccount = () => {
  return {
    type: ActionType.RESET_ACTIVE_ACCOUNT,
  };
};
