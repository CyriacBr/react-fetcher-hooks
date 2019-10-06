import { AxiosInstance } from 'axios';
import { useRequest } from './useRequest';

export function useCRUDRequests<T extends any[]>(url: string, axiosInstance?: AxiosInstance) {
  const axios: AxiosInstance = axiosInstance || require('axios');
  const [getRef, getItems, items, setItems] = useRequest(() => axios.get<T>(url), true);
  const [postRef, postItem] = useRequest((item: T[number]) => axios.post<T[number]>(url, item));
  const [updateRef, updateItem] = useRequest(([id, item]: [string | number, Partial<T[number]>]) =>
    axios.patch<T[number]>(url + '/' + id, item)
  );
  const [deleteRef, deleteItem] = useRequest((id: string | number) => axios.delete(url + '/' + id));

  return {
    refs: [getRef, postRef, updateRef, deleteRef],
    items,
    setItems,
    get: getItems,
    post: postItem,
    update: updateItem,
    delete: deleteItem
  };
}
