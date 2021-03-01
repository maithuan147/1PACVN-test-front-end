export function combineQueryParams(queryParams) {

  return Object.entries(queryParams).reduce(

    (combinedQuery, [queryKey, queryValue]) => {
      if (typeof queryValue === 'undefined') {
        return combinedQuery;
      }
      return `${combinedQuery}${'&'}${encodeURIComponent(
        queryKey
      )}=${encodeURIComponent(`${queryValue}`)}`;
    },
    ''
  );
}

export function getQueryParamsUrl(paramsUrl) {
  return JSON.parse(
    '{"' + paramsUrl.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === '' ? value : decodeURIComponent(value);
    }
  );
}
