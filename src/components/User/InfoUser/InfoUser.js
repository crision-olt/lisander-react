import React, { useState, useEffect } from "react";
import { Location, Link as Link2 } from "../../../utils/Icons";
import { Link } from "react-router-dom";
import { countRelations } from "../../../api/follow";

export default function InfoUser(props) {
  const { user, loggedUser } = props;
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  useEffect(() => {
    countRelations("followers").then(
      (response) => response && setFollowers(response)
    );
    countRelations("followings").then(
      (response) => response && setFollowings(response)
    );
  }, [user]);
  return (
    <div className="w-full grid grid-flow-row mt-8">
      <span>{user?.email}</span>
      {user?.biography && (
        <div
          className="w-full block border-transparent bg-transparent m-2 p-1 border border-gray-300"
          style={{
            resize: "none",
            overflow: "hidden",
            overflowWrap: "break-word",
            textOverflow: "break-word",
            maxWidth: 575,
          }}
          dangerouslySetInnerHTML={{ __html: user.biography }}
          readOnly={true}
        />
      )}
      <div className="flex justify-between">
        {user?.location && (
          <div className="flex justify-center">
            <Location width={20} height={20} className="mt-0.5 mr-2" />
            {user.location}
          </div>
        )}
        {user?.webSite && (
          <a
            href={user.webSite}
            alt={user.webSite}
            className="flex justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link2 width={20} height={20} className="mt-0.5 mr-2" />
            {user.webSite}
          </a>
        )}
      </div>
      {loggedUser._id === user?.id && (
        <Link to="/follows">
          <span className="m-1">{followers} Seguidores</span>
          <span className="m-1">{followings} Seguidos</span>
        </Link>
      )}
    </div>
  );
}
