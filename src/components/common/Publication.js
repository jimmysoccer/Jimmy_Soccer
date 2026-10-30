import React from "react";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

export function AuthorList({ names }) {
  return (
    <div className="pub-card__authors">
      {names.map((name, index) => (
        <React.Fragment key={`${name}-${index}`}>
          {index > 0 && ", "}
          <span className={name.includes("Heng Sun") ? "me" : ""}>{name}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

const Publication = ({ publication }) => {
  const venue =
    `${publication.conference || ""}${publication.journal || ""}`.trim();
  return (
    <a
      className="box pub-card text-start"
      href={publication.link}
      target="_blank"
      rel="noreferrer"
      title="Open paper"
    >
      <div className="pub-card__title">{publication.title}</div>
      <AuthorList names={publication.authors} />
      <div className="pub-card__meta">
        {venue && (
          <span className="pub-card__venue d-inline-flex align-items-center gap-1">
            <MenuBookRoundedIcon fontSize="inherit" />
            {venue}
          </span>
        )}
        <span className="d-inline-flex align-items-center gap-1">
          <CalendarMonthRoundedIcon fontSize="inherit" />
          {publication.date}
        </span>
        <span className="d-inline-flex align-items-center gap-1">
          <PlaceRoundedIcon fontSize="inherit" />
          {publication.place}
        </span>
        <span className="tag d-inline-flex align-items-center gap-1 ms-auto">
          Paper <OpenInNewRoundedIcon sx={{ fontSize: 13 }} />
        </span>
      </div>
    </a>
  );
};

export default Publication;
