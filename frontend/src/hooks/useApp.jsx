import { useBoardState } from 'hooks/state/useBoardState';
import { useCardState } from 'hooks/state/useCardState';
import { useTodoState } from 'hooks/state/useTodoState';

import { useBoardApi } from 'hooks/api/useBoardApi';
import { useCardApi } from 'hooks/api/useCardApi';
import { useTodoApi } from 'hooks/api/useTodoApi';

import { useTheme } from 'hooks/common/useTheme';
import { useLoader } from 'hooks/common/useLoader';
import { useAlert } from 'hooks/common/useAlert';

const useApp = () => {
  return {
    ...useBoardState(),
    ...useCardState(),
    ...useTodoState(),
    ...useBoardApi(),
    ...useCardApi(),
    ...useTodoApi(),
    ...useTheme(),
    ...useLoader(),
    ...useAlert(),
  };
};

export { useApp };
