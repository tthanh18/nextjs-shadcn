import {useCallback, useEffect, useState} from "react";
import {useICondoQuery} from "./use-icondo-query";
import {IParameter, TPickProps, TReturnResultLazyQuery} from "./react-query.types";
import {queryClient} from "./icondo-query-client";

export const useICondoLazyQuery = <T, P>(options?: IParameter<T, P, "query">): TReturnResultLazyQuery<T, P> => {
    const [params, setParams] = useState(false);
    const query = useICondoQuery({
        ...options,
        enabled: Boolean(params)
    });
    const fetchQuery = useCallback(
        (data: TPickProps<T, P>) => {
            setParams(true);
            return queryClient.fetchQuery({
                ...options,
                queryFn: () => {
                    return options.fetcher({...options.props, ...data});
                }
            });
        },
        [options]
    );
    return [fetchQuery, query];
};
