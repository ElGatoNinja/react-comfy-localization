import React, { useEffect } from 'react';

const LocalizationContext  = React.createContext<ComfyNodeContext>({
    activeLang: '',
    setActiveLang: (_ :string) => {},
    translate: (_:string) => {return("")},
});

interface ComponentProps {
    name: string,
    defaultLanguage: string,
    children: React.ReactChild,
}

interface ComfyNodeContext {
    activeLang: string,
    setActiveLang: (activeLang:string) => void,
    translate: (entryId: string) => string,
    getAllLocalsById?: ((entryId: string) => Promise<{}>),
}

/**
 * This component have to be the parent of any <ComfyLoc>. It interfaces with the localization files.
 * @param {*} props 
 */
export default function ComfyNode(props: ComponentProps) {
    const [activeLang, setActiveLang] = React.useState(props.defaultLanguage);
    const [localizationStrings, setLocalizationStrings] = React.useState({});

    useEffect(() => {
            async function fetchData()  {
                const response = await  fetch('comfy_jsons/' + activeLang + '/' + props.name + '.json');
                const data = await response.json();
                setLocalizationStrings(data);
                console.table(data);
            }
            fetchData();
        },[activeLang, props.name])

    /**
     * return the string localized in the current active language
     * @param entryId 
     */
    function translate(entryId: string): string {
        return localizationStrings[entryId];
    }

    let contextToProvide: ComfyNodeContext;

    if (process.env.NODE_ENV === "development") {
        /**
         * Only in development: return the localization for every language for the given entry ID
         * @param {string} entryId 
         * @returns 
         */
        const getAllLocalsById = async (entryId: string): Promise<{}> => {
            let response = await  fetch('comfy_jsons/list.json');
            let list = await response.json();
            let strings = {};
            await Promise.all(list.map(async (lang: string) => {
                let response = await  fetch('comfy_jsons/' + lang + '/' + props.name + '.json');
                let data = await response.json();
                strings[lang] = data[entryId]
            }))
            return strings;
        }
        contextToProvide = {activeLang,setActiveLang,translate,getAllLocalsById};
        
    } else {
        contextToProvide = {activeLang,setActiveLang,translate};
    }

    return(
        <LocalizationContext.Provider value={contextToProvide}>
            {props.children}
        </LocalizationContext.Provider>
    )

    
}




export function useComfyNode() {
    return React.useContext<ComfyNodeContext>(LocalizationContext);
}