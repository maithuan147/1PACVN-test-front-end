import React, { useEffect, useState } from "react";

function DataItem({ dataApi, data, tabs, index, setDataApi, setTabs }) {
  const renderData = data.data[0];
  const [like, setLike] = useState(false);
  const [remove, setRemove] = useState(false);
  useEffect(() => {
    if (data.like) {
      setLike(true);
    }
    if (data.remove) {
      setRemove(true);
    }
  }, [data.like, data.remove]);
  function limitText(text, number = 20) {
    if (!text) return;
    if (Array.isArray(text)) return text.join(", ").slice(0, number) + "...";
    return text.slice(0, number) + "...";
  }
  function convertData(date) {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }
  function handLike() {
    alert("Like ?");
    let likeArray = JSON.parse(localStorage.getItem("liked")) ?? [];
    likeArray.push(data);
    localStorage.setItem("liked", JSON.stringify(likeArray));
    setLike(true);
  }
  function handRemove() {
    alert("Remove ?");
    let removeArray = JSON.parse(localStorage.getItem("removed")) ?? [];
    removeArray.push(data);
    localStorage.setItem("removed", JSON.stringify(removeArray));
    setRemove(true);
  }
  function handUnike() {
    alert("Unliked ?");
    let likeArray = JSON.parse(localStorage.getItem("liked")) ?? [];
    likeArray.splice(index, 1);
    dataApi.collection.items = likeArray;
    setDataApi({ ...dataApi });
    localStorage.setItem("liked", JSON.stringify(likeArray));
  }
  function handUndo() {
    alert("Undo ?");
    let removeArray = JSON.parse(localStorage.getItem("removed")) ?? [];
    removeArray.splice(index, 1);
    dataApi.collection.items = removeArray;
    setDataApi({ ...dataApi });
    localStorage.setItem("removed", JSON.stringify(removeArray));
  }
  return (
    <tr>
      <td>{renderData.center}</td>
      <td>{limitText(renderData.description)}</td>
      <td>{limitText(renderData.keywords)}</td>
      <td>{renderData.location}</td>
      <td>{renderData.media_type}</td>
      <td>{limitText(renderData.nasa_id)} </td>
      <td>{limitText(renderData.title)}</td>
      <td>{convertData(renderData.date_created)}</td>
      <td>
        <div className="option">
          {tabs === "all" && (
            <>
              {like && (
                <button className="un-like" onClick={() => setTabs("liked")}>
                  unlike
                </button>
              )}
              {!like && <button onClick={handLike}>like</button>}
              {remove && (
                <button
                  className="un-remove"
                  onClick={() => setTabs("removed")}
                >
                  undo
                </button>
              )}
              {!remove && <button onClick={handRemove}>remove</button>}
              <button>edit</button>{" "}
            </>
          )}
          {tabs === "liked" && <button onClick={handUnike}>unlike</button>}
          {tabs === "removed" && <button onClick={handUndo}>undo</button>}
        </div>
      </td>
    </tr>
  );
}

export default DataItem;
