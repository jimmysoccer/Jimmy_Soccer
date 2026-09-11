import React from "react";

const Patent = ({ patent }) => {
  const handleClick = () => {
    if (patent.link) window.open(patent.link);
  };

  return (
    <div
      key={`patent-${patent?.applicationNumber || patent?.title}`}
      className="box shadow p-3 rounded m-2"
      onClick={handleClick}
      title={patent.link ? "click to view" : undefined}
      style={{ cursor: patent.link ? "pointer" : "default" }}
    >
      <div className="fs-5 fw-bold text-black">{patent.title}</div>
      <ul>
        <li>
          <div>
            {patent.inventors.map((name, index) => {
              let prefix = ", ";
              if (index === 0) prefix = "";
              return (
                <>
                  <span>{prefix}</span>
                  <span
                    className={`${name.includes("Heng Sun") ? "fw-bold" : ""}`}
                  >
                    {name}
                  </span>
                </>
              );
            })}
          </div>
        </li>
        <li>
          <div className="fst-italic">{patent.status}</div>
        </li>
        <li>
          <div>{`${patent.applicationNumber}${
            patent.filingDate ? ", " + patent.filingDate : ""
          }`}</div>
        </li>
        {patent.assignee && (
          <li>
            <div>{`Assignee: ${patent.assignee}`}</div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Patent;
