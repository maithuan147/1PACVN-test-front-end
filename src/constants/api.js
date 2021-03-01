const development = {
  api_url: " https://images-api.nasa.gov",
  api_ver: "",
};

const production = {
  api_url: " https://images-api.nasa.gov",
  api_ver: "",
};

export const ENV =
  process.env.REACT_APP_STAGE === "production" ? production : development;

const BASE_API_URL = ENV.api_url + ENV.api_ver;

export { BASE_API_URL };
