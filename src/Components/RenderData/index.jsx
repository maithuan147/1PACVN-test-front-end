import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchData } from "../../services/DataService";
import { getQueryParamsUrl } from "../../utils/Help";
import DataItem from "./DataItem";

function RenderData({ dataApi, setDataApi, tabs, setTabs }) {
  const location = useLocation();
  const search = location.search;

  useEffect(() => {
    let searchUrlData = [];
    let liked = JSON.parse(localStorage.getItem("liked")) ?? [];
    let removed = JSON.parse(localStorage.getItem("removed")) ?? [];

    if (search) {
      searchUrlData = getQueryParamsUrl(search.substring(1));
    }
    async function getApi() {
      const dataApi = await searchData({
        q: searchUrlData.q,
        page: searchUrlData.page,
        center: searchUrlData.center,
        description: searchUrlData.description,
        keywords: searchUrlData.keywords,
        location: searchUrlData.location,
        media_type: !Array.isArray(searchUrlData)
          ? searchUrlData.media_type
          : "image,audio",
        nasa_id: searchUrlData.nasa_id,
        title: searchUrlData.title,
      });
      if (tabs === "all") {
        dataApi.collection.items.map((data, index) => {
          return removed.map((remove) => {
            if (data.data[0].description === remove.data[0].description) {
              dataApi.collection.items[index] = {
                ...dataApi.collection.items[index],
                remove: true,
              };
            }
            return true;
          });
        });
        dataApi.collection.items.map((data, index) => {
          return liked.map((like) => {
            if (data.data[0].description === like.data[0].description) {
              dataApi.collection.items[index] = {
                ...dataApi.collection.items[index],
                like: true,
              };
            }
            return true;
          });
        });
        setDataApi(dataApi);
      } else if (tabs === "liked") {
        dataApi.collection.items = liked;
        setDataApi({ ...dataApi });
      } else {
        dataApi.collection.items = removed;
        setDataApi({ ...dataApi });
      }
    }
    getApi();
  }, [setDataApi, search, tabs]);
  if (!dataApi) return "Loading...";
  return (
    <div className="render-data">
      <table>
        <thead>
          <tr>
            <th>Center</th>
            <th>Description</th>
            <th>Keywords</th>
            <th>Location</th>
            <th>Media type</th>
            <th>Nasa id</th>
            <th>Title</th>
            <th>Created at</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {dataApi.collection.items.map((data, index) => (
            <DataItem
              key={index}
              {...{ data, tabs, index, setDataApi, dataApi, setTabs }}
            />
          ))}
          {dataApi.collection.items.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RenderData;
