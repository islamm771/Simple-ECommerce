import { useQuery } from "@tanstack/react-query"
import { AxiosRequestConfig } from "axios"
import { axiosInstance } from "../config/axios.config"

interface IAuthQuery {
    queryKey: string[],
    url: string,
    config?: AxiosRequestConfig
}

const useAuthenticatedQuery = ({ queryKey, url, config }: IAuthQuery) => {
    return useQuery({
        queryKey,
        queryFn: () =>
            axiosInstance.get(url, config).then(res => {
                return res.data
            }),
        retry: 2
    })
}


export default useAuthenticatedQuery