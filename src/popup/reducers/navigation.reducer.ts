import { ActionType } from '@popup/actions/action-type.enum';
import { actionPayload } from '@popup/actions/interfaces';
import { Screen } from 'src/reference-data/screen.enum';

export interface NavigationState {
  stack: Screen[];
  params?: any;
}

export interface NavigatePayload {
  nextPage?: Screen;
  params?: any;
  resetStack?: boolean;
}

export const NavigationReducer = (
  state: NavigationState = { stack: [] },
  { type, payload }: actionPayload<NavigatePayload>,
): NavigationState => {
  switch (type) {
    case ActionType.RESET_NAV:
      return { stack: [], params: null };
    case ActionType.NAVIGATE_TO:
    case ActionType.NAVIGATE_TO_WITH_PARAMS:
      let oldStack = state.stack;
      if (payload?.resetStack) {
        oldStack = [];
      }
      if (payload && payload.nextPage && payload.nextPage !== state.stack[0]) {
        return {
          stack: [payload.nextPage, ...oldStack],
          params: payload.params,
        };
      } else {
        return state;
      }
    case ActionType.GO_BACK:
      const newStack = state.stack;
      newStack.shift();
      return {
        stack: newStack,
      };

    default:
      return state;
  }
};
