import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { combineQueryParams, getQueryParamsUrl } from "../../utils/Help";
import { history } from "../../utils/History";

function SearchData({ setDataApi }) {
  const [hasShowMore, setHasShowMore] = useState(false);
  const location = useLocation();
  let searchUrlData = {};
  if (location.search) {
    searchUrlData = getQueryParamsUrl(location.search.substring(1));
  }
  function handSearchData(e) {
    e.preventDefault();
    setDataApi();
    const formData = new FormData(e.target);
    const infoData = Object.fromEntries(formData);

    const urlComponents = {
      q: infoData.q === "" ? undefined : infoData.q,
      center: infoData.center === "" ? undefined : infoData.center,
      description:
        infoData.description === "" ? undefined : infoData.description,
      keywords: infoData.keywords === "" ? undefined : infoData.keywords,
      location: infoData.location === "" ? undefined : infoData.location,
      media_type: !infoData.media_type ? undefined : infoData.media_type,
      nasa_id: infoData.nasa_id === "" ? undefined : infoData.nasa_id,
      photographer:
        infoData.photographer === "" ? undefined : infoData.photographer,
      title: infoData.title === "" ? undefined : infoData.title,
    };

    // a.k.a. "search"
    const urlQueryString = combineQueryParams(urlComponents);

    history.push(`/search?${urlQueryString.substring(1)}`);
  }
  return (
    <div className="search-data">
      <form onSubmit={handSearchData}>
        <div className="row">
          <div className="col-4">
            <label>
              <p>q</p>
              <input
                type="text"
                placeholder="q"
                name="q"
                defaultValue={searchUrlData.q}
              />
            </label>
          </div>
          <div className="col-4">
            <label>
              <p>Center</p>
              <input
                type="text"
                placeholder="center"
                name="center"
                defaultValue={searchUrlData.center}
              />
            </label>
          </div>
          <div className="col-4">
            <label>
              <p>Description</p>
              <input
                type="text"
                placeholder="description"
                name="description"
                defaultValue={searchUrlData.description}
              />
            </label>
          </div>

          <div className="col-4">
            <label>
              <p>Keywords </p>
              <input
                type="text"
                placeholder="keywords "
                name="keywords"
                defaultValue={searchUrlData.keywords}
              />
            </label>
          </div>
          <div className="col-4">
            <label>
              <p>Location </p>
              <input
                type="text"
                placeholder="location "
                name="location"
                defaultValue={searchUrlData.location}
              />
            </label>
          </div>

          {hasShowMore && (
            <>
              <div className="col-4">
                <label>
                  <p>Media type </p>
                  <select name="media_type" multiple className="media_type">
                    <option value="image">image</option>
                    <option value="audio">audio</option>
                  </select>
                </label>
              </div>
              <div className="col-4">
                <label>
                  <p>Nasa id</p>
                  <input
                    type="text"
                    placeholder="nasa_id"
                    name="nasa_id"
                    defaultValue={searchUrlData.nasa_id}
                  />
                </label>
              </div>
              <div className="col-4">
                <label>
                  <p>Photographer</p>
                  <input
                    type="text"
                    placeholder="photographer"
                    name="photographer"
                    defaultValue={searchUrlData.photographer}
                  />
                </label>
              </div>
              <div className="col-4">
                <label>
                  <p>Title</p>
                  <input
                    type="text"
                    placeholder="title"
                    name="title"
                    defaultValue={searchUrlData.title}
                  />
                </label>
              </div>
            </>
          )}
          <div className="col-4">
            <button type="button" onClick={() => setHasShowMore(!hasShowMore)}>
              {hasShowMore ? "Hidden" : "More +"}
            </button>
          </div>
          <div className="col-4">
            <button className="search">Search</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchData;
