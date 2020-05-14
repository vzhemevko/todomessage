import { useCardState } from 'hooks/state/useCardState';
import { useTodoState } from 'hooks/state/useTodoState';

import { useCardApi } from 'hooks/api/useCardApi';
import { useTodoApi } from 'hooks/api/useTodoApi';

import { useLoader } from 'hooks/common/useLoader';
import { useAlert } from 'hooks/common/useAlert';

const useApp = () => {
  return {
    ...useCardState(),
    ...useTodoState(),
    ...useCardApi(),
    ...useTodoApi(),
    ...useLoader(),
    ...useAlert(),
  };
};

export { useApp };
