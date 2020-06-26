import { useState, useEffect, useRef } from "react";

const useFetch = ( url ) => {

    const isMounted = useRef(true);

    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    });

    useEffect( () => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect( () => {
        setState({
            data: null,
            loading: true,
            error: null
        });
        
        fetch( url )
        .then( data => data.json() )
        .then( data => {
            if( isMounted.current ) {
                setState({
                    loading: false,
                    error: null,
                    data
                });
            }
        })
        .catch( err => {
            setState({
                data: null,
                loading: false,
                error: 'No se ha podido cargar la info'
            });
        });
    }, [ url ]);

    return state;
}
 
export default useFetch;