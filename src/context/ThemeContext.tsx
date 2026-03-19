import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { darkTheme, lightTheme } from "../constants/theme";
import { ThemeClass } from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
// create the Theme Type
type ThemeContextType ={
    "isDark": boolean,
    "toggleTheme": () => void,
    "classes": ThemeClass
};
//create the context 
const ThemeContext = createContext<ThemeContextType| undefined>(undefined);

export const ThemeProvider = (props: {children: ReactNode}) => {
    const [isDark, setisDark] = useState(true);

    useEffect(()=>{
        const loadPreferences = async () => {
            try {
                const stored_theme = await AsyncStorage.getItem('theme_preference');
                if (stored_theme !== null){
                    setisDark(JSON.parse(stored_theme))
                }
            }
            catch (error){
                console.error("Error loading theme", error);
            }
        };
    loadPreferences();
    }, 
    []
);
useEffect(()=>{
    const  savePreferences = async () => {
        try{
            await AsyncStorage.setItem('theme_preference', JSON.stringify(isDark));
        }
        catch(error){
            console.error("Error saving theme", error);
        }
    }
     savePreferences();
},
[isDark]
);

 const toggleTheme = ()=>{
    setisDark(!isDark);
 };
 const classes = isDark ? darkTheme: lightTheme;
 return <ThemeContext.Provider value= {{classes ,toggleTheme, isDark}}>{props.children}</ThemeContext.Provider> 
};
export const useTheme = (): ThemeContextType =>{
    const theme = useContext(ThemeContext);
    if (!theme){
        throw Error("useTheme must be used within a ThemeProvider");
    }
    return theme;
}

