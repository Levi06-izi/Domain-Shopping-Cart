import { isDomainAvailable } from "@/lib/resources";
import { CartSlice, SliceStateCreator } from "./types";

export const createCartSlice: SliceStateCreator<CartSlice> = (set: any, get: any) => ({
    domainList: [],
    numDomainsRequired: 0,
    setNumDomainsReq: (num: number) => {
        const {numDomainsRequired} = get()
        set((state: any) => ({...state, numDomainsRequired: num}))
    },
    //adding a domain to a domainlist
    addDomainList: async (domainList:any[],newDomain: string): Promise<boolean> => {
        try {
        //check whether this domain is already in, if yes, then throw error
        const inList: boolean = domainList.some((domain) => {return domain.domainName?.toLowerCase() === newDomain.toLowerCase()});
        if(inList){
            //set error and return 
            console.log("Already added")
            return false
        }

        //check availability
        const isAvailable = await isDomainAvailable(newDomain.toLowerCase());

        //add it to the domainList
        const updatedList = [...domainList, { domainName:newDomain.toLowerCase(), available: isAvailable }];

        set((state: any) =>({...state,domainList: updatedList}))
        console.log("added it", updatedList)
        return true
        } catch (error) {
            console.error("Error adding domain:", error);
            return false
        }
    },
    removeDomain: (domain: string) => {
        console.log(domain)
        const {domainList} = get();
        console.log(domainList)
        const updatedList = domainList.filter((d: {domainName: string, available: boolean}) =>  d.domainName != domain)
        set((state: any) => ({...state,
            domainList: updatedList
        })) 
    },
    resetList: () => {
        const {domainList} = get();
        set((state: any) => ({...state, domainList: []}))
    },
    updateDomain: async (oldDomain:string,  updatedDomain:string): Promise<boolean> => {
        try{
            const {domainList} = get();
            const inList: boolean = domainList.some((domain: { domainName: string;available: boolean }) => {return domain.domainName?.toLowerCase() === updatedDomain.toLowerCase()});
            if(inList){
                //set error and return 
                return false
            }
    
            //check availability
            const isAvailable = await isDomainAvailable(updatedDomain.toLowerCase());
            const updatedList = domainList.map((domain: any) => {
                if(domain.domainName === oldDomain){
                    return {...domain, domainName: updatedDomain, available: isAvailable}
                }
                return domain;
            } )
            //add it to the domainList
            set((state: any) => ({...state,
                domainList: updatedList
            }))
            return true; 
        }
        catch(error){
            console.error("Error updating domain:", error);
            return false
        }
    },
    setDomainList: (newList: any[]) => {
        const {domainList} = get();
        set((state: any) => ({
            ...state, domainList: newList
        }))
    }
})