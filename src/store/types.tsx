import { List } from "immutable";
import { StateCreator } from "zustand";

export interface CartSlice {
    numDomainsRequired: number;
    setNumDomainsReq: (num: number) => void;
    domainList: {domainName: string; available: boolean}[];
    addDomainList:  (domainList: any[],newDomain: string) => Promise<boolean>;
    removeDomain: (domain: string) => void;
    updateDomain: (domain: string, UpdatedDomain: string)  => Promise<boolean>;
    resetList: () => void;
    setDomainList: (newList: any[]) => void
}

export interface IStore extends CartSlice {
    
}
export type SliceStateCreator<T> = StateCreator<
    IStore,
    [['zustand/immer', never], ['zustand/devtools', never]],
    [],
    T
>