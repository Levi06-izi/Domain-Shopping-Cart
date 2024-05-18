/*
This code sets up a centralized state management using Zustand for your React app. 
It creates a store with a "cart slice" (likely containing initial state, actions, and selectors) 
using Zustand's create function. 
Immer middleware simplifies state updates, 
and optional devtools aid in debugging. Zustand offers a 
lightweight and hooks-based approach to state management for React.
*/

import {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { IStore } from './types';
import { createCartSlice } from './cartSlice';

export const useStore = create<IStore, [['zustand/immer', never], ['zustand/devtools', never]]> (
    immer(
        devtools((...a) => ({
            ...createCartSlice(...a)
        }))
    )
);
