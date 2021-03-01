import {
  authGet,
} from "../utils/Axios";




export async function searchData(params) {
  const response = await authGet("/search", params);
  return response.data;
}
