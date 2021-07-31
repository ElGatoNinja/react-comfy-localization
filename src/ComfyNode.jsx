import React, { useEffect } from 'react';

const LocalizationContext  = React.createContext({});


/**
 * This component have to be the parent of any <ComfyLoc>. It interfaces with the localization files.
 * @param {*} props 
 */
export default function ComfyNode(props) {
    const [activeLanguage, setActiveLanguage] = React.useState(props.defaultLanguage);
    const [localizationStrings, setLocalizationStrings] = React.useState({});

    useEffect(() => {
            async function fetchData(language)  {
                const response = await  fetch('comfy_jsons/' + activeLanguage + '/' + props.name + '.json');
                const data = await response.json();
                setLocalizationStrings(data);
                console.table(data);
            }
            fetchData();
        },[activeLanguage, props.name])

    /**
     * return the string localized in the current active language
     * @param {string} entryId 
     */
    function translate(entryId) {
        return localizationStrings[entryId];
    }

    let contextToProvide = {activeLanguage,setActiveLanguage,translate};

    if (process.env.NODE_ENV === "development") {
        /**
         * Only in development: return the localization for every language for the given entry ID
         * @param {string} entryId 
         * @returns 
         */
        async function fetchAllLocalizations(entryId) {
            let response = await  fetch('comfy_jsons/list.json');
            let list = await response.json();
            let strings = {};
            await Promise.all(list.map(async (lang) => {
                let response = await  fetch('comfy_jsons/' + lang + '/' + props.name + '.json');
                let data = await response.json();
                strings[lang] = data[entryId]
            }))
            return strings;
        }
        contextToProvide = {activeLanguage,setActiveLanguage,translate,fetchAllLocalizations};
    }

    return(
        <LocalizationContext.Provider value={contextToProvide}>
            {props.children}
        </LocalizationContext.Provider>
    )
}




export function useComfyNode() {
    return React.useContext(LocalizationContext);
}