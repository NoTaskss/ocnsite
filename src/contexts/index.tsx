import { useContext } from 'react';

import { GlobalContext } from './globalcontext';

export const useGlobalContext = () => useContext(GlobalContext);