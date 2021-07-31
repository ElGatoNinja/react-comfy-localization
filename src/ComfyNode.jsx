import React, { useEffect } from 'react';

const LocalizationContext  = React.createContext({});

/**
 * This component have to be the parent of any <ComfyLoc>. It interfaces with the localization files
 * and the dev server in development mode. 
 * @param {*} props 
 */
export default function ComfyNode(props) {
    const [activeLanguage, setActiveLanguage] = React.useState(props.defaultLanguage);
    const [localizationStrings, setLocalizationStrings] = React.useState({});

    useEffect(() => {
        async function fetchData()  {
            let response = await  fetch('comfy_jsons/' + activeLanguage + '/' + props.name + '.json');
            let data = await response.json();
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

    return(
        <LocalizationContext.Provider value={{activeLanguage,setActiveLanguage,translate}}>
            {props.children}
        </LocalizationContext.Provider>
    )
}

export function useComfyNode() {
    return React.useContext(LocalizationContext);
}