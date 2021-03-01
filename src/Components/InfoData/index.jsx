import React from "react";
import { useLocation } from "react-router-dom";
import { getQueryParamsUrl } from "../../utils/Help";
import { history } from "../../utils/History";
import "./InfoData.css";
function InfoData({ dataApi, setDataApi, tabs }) {
  const location = useLocation();
  let searchUrlData = {};
  if (location.search) {
    searchUrlData = getQueryParamsUrl(location.search.substring(1));
  }
  if (!dataApi) return true;
  let liked = JSON.parse(localStorage.getItem("liked")) ?? [];
  let removed = JSON.parse(localStorage.getItem("removed")) ?? [];

  const total = dataApi.collection.metadata.total_hits;
  const page = searchUrlData.page ?? 1;
  const startShowing = (page - 1) * 100 + 1;
  const endShowing = page * 100 > total ? total : page * 100;

  function handPagination(link) {
    setDataApi();
    const urlQueryString = link.split("search?")[1];
    history.push(`/search?${urlQueryString}`);
  }
  function handSort(e) {
    const items = dataApi.collection.items;
    switch (e.target.value) {
      case "a-z":
        items.sort(function (a, b) {
          if (a.data[0].description < b.data[0].description) {
            return -1;
          }
          if (a.data[0].description > b.data[0].description) {
            return 1;
          }
          return 0;
        });
        setDataApi({ ...dataApi });
        break;
      case "z-a":
        items.sort(function (a, b) {
          if (a.data[0].description > b.data[0].description) {
            return -1;
          }
          if (a.data[0].description < b.data[0].description) {
            return 1;
          }
          return 0;
        });
        setDataApi({ ...dataApi });
        break;
      case "newest":
        items.sort(function (a, b) {
          a = new Date(a.data[0].date_created);
          b = new Date(b.data[0].date_created);
          return b - a;
        });
        setDataApi({ ...dataApi });
        break;
      case "oldest":
        items.sort(function (a, b) {
          a = new Date(a.data[0].date_created);
          b = new Date(b.data[0].date_created);
          return a - b;
        });
        setDataApi({ ...dataApi });
        break;
      default:
        break;
    }
  }

  return (
    <div className="info-data">
      {tabs === "liked" && <div>Showing {liked.length} items</div>}
      {tabs === "removed" && <div>Showing {removed.length} items</div>}

      {tabs === "all" && (
        <>
          <div>
            Showing {startShowing} - {endShowing} of {total} items
          </div>
          <div className="pagination">
            {Array.isArray(dataApi.collection.links) &&
              dataApi.collection.links.map((link, index) => (
                <button key={index} onClick={() => handPagination(link.href)}>
                  {link.prompt}
                </button>
              ))}
          </div>
        </>
      )}
      <div>
        <select name="" id="" onChange={handSort}>
          <option value="">Sort</option>
          <option value="a-z">a-z</option>
          <option value="z-a">z-a</option>
          <option value="newest">newest</option>
          <option value="oldest">oldest</option>
        </select>
      </div>
    </div>
  );
}

export default InfoData;
