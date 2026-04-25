import { createContext, useState } from "react";
import { askGemini } from "../config/gemini"; 

export const Context = createContext();

const ContextProvider = (props) => {
    
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]); 
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

   
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        let response;
        
        if (prompt !== undefined && typeof prompt === 'string') {
            setRecentPrompt(prompt);
            response = await askGemini(prompt);
        } 
        else {
            setPrevPrompts(prev => [...prev, input]); 
            setRecentPrompt(input);
            response = await askGemini(input);
        }

        setResultData(response);
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        setShowResult
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;