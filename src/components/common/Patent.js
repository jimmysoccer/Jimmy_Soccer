import React from "react";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import { AuthorList } from "./Publication";

const Patent = ({ patent }) => {
  const Tag = patent.link ? "a" : "div";
  const linkProps = patent.link
    ? {
        href: patent.link,
        target: "_blank",
        rel: "noreferrer",
        title: "Open patent",
      }
    : {};
  const number =
    patent.applicationNumber && patent.applicationNumber !== "N/A"
      ? patent.applicationNumber
      : null;

  return (
    <Tag
      className={`box pub-card text-start ${patent.link ? "" : "is-static"}`}
      {...linkProps}
    >
      <div className="pub-card__title">{patent.title}</div>
      <AuthorList names={patent.inventors} />
      <div className="pub-card__meta">
        <span className="tag d-inline-flex align-items-center gap-1">
          <GavelRoundedIcon sx={{ fontSize: 13 }} />
          {patent.status}
        </span>
        {(number || patent.filingDate) && (
          <span>{[number, patent.filingDate].filter(Boolean).join(", ")}</span>
        )}
        {patent.assignee && (
          <span className="d-inline-flex align-items-center gap-1">
            <ApartmentRoundedIcon fontSize="inherit" />
            {patent.assignee}
          </span>
        )}
      </div>
    </Tag>
  );
};

export default Patent;
