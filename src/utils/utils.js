import { axiosReq } from "../api/axiosDefaults";
import jwtDecode from "jwt-decode";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const setTokens = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);

  localStorage.setItem("accessToken", data?.access);
  localStorage.setItem("refreshToken", data?.refresh);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const clearTokens = () => {
  localStorage.removeItem("refreshTokenTimestamp");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
