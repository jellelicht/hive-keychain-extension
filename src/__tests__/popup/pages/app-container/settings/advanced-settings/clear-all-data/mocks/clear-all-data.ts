import { Icons } from '@popup/icons.enum';
import alButton from 'src/__tests__/utils-for-testing/aria-labels/al-button';
import initialStates from 'src/__tests__/utils-for-testing/data/initial-states';
import mk from 'src/__tests__/utils-for-testing/data/mk';
import { RootState } from 'src/__tests__/utils-for-testing/fake-store';
import assertion from 'src/__tests__/utils-for-testing/preset/assertion';
import mockPreset from 'src/__tests__/utils-for-testing/preset/mock-preset';
import afterTests from 'src/__tests__/utils-for-testing/setups/afterTests';
import {
  actAdvanceTime,
  clickAwait,
} from 'src/__tests__/utils-for-testing/setups/events';
import { customRenderFixed } from 'src/__tests__/utils-for-testing/setups/render-fragment';

const constants = {
  mk: mk.user.one,
  stateAs: { ...initialStates.iniStateAs.defaultExistent } as RootState,
  snapshotName: {
    default: 'clear-all-data.component Default',
  },
};

const beforeEach = async () => {
  let _asFragment: () => DocumentFragment;
  jest.useFakeTimers('legacy');
  actAdvanceTime(4300);
  mockPreset.setOrDefault({});
  _asFragment = customRenderFixed({
    initialState: constants.stateAs,
  }).asFragment;
  await assertion.awaitMk(constants.mk);
  await clickAwait([
    alButton.menu,
    alButton.menuPreFix + Icons.SETTINGS,
    alButton.menuPreFix + Icons.CLEAR,
  ]);
  return _asFragment;
};

const methods = {
  afterEach: afterEach(() => {
    afterTests.clean();
  }),
};

const extraMocks = {
  remockAsNew: () =>
    mockPreset.setOrDefault({
      app: {
        getAccount: [],
        getAccountsFromLocalStorage: [],
        getMkFromLocalStorage: '',
        getActiveAccountNameFromLocalStorage: '',
        hasStoredAccounts: false,
      },
    }),
};

export default {
  beforeEach,
  methods,
  constants,
  extraMocks,
};
