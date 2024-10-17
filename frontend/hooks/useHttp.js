import { useCallback, useEffect, useState } from "react";
async function sendHTTPRequest(url, config) {
  const response = await fetch(url, config);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export default function useHTTP(url, config, initial) {
    const [data, setData] = useState(initial);
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const sendRequest =useCallback(async function sendRequest(){
        setIsLoading(true);
        try {
            const resData = await sendHTTPRequest(url, config);
            setData(resData);
        } catch (error) {
            setIsError(error.message || 'Something went wrong'); 
        }
        setIsLoading(false);
    }, [url, config])

    useEffect(() => {
        if((config && (config.method === 'GET' || !config )) || !config){
            sendRequest();
        }
    }, [sendRequest, config])

    return{
        isLoading,
        isError,
        data,
    }
}