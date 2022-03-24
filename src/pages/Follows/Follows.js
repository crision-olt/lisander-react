import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getRelationUsersApi } from "../../api/follow";
import queryString from "query-string";
import { isEmpty } from "lodash";
import { ListUsers } from "../../components";
import { BasicLayout } from "../../layout";

export function Follows(props) {
  const { setRefreshCheckLogin } = props;
  const [users, setUsers] = useState(null);
  const [type, setType] = useState("followings");
  const [page, setPage] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    getRelationUsersApi(queryString.stringify({ page, type }))
      .then((response) => {
        // eslint-disable-next-line eqeqeq
        if (page === 1) {
          if (isEmpty(response)) {
            setUsers([]);
            setBtnLoading(0);
          } else {
            setUsers(response);
          }
        } else {
          if (!response) {
            setBtnLoading(false);
            setBtnLoading(0);
          } else {
            setUsers({ ...users, ...response });
            setBtnLoading(false);
          }
        }
      })
      .catch(() => {
        setUsers([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, type]);
  const onChangeType = (type) => {
    setUsers(null);
    setBtnLoading(false);
    setPage(1);
    setType(type);
  };
  const moreData = () => {
    setBtnLoading(true);
    setPage(page + 1);
  };
  return (
    <BasicLayout title="Usuarios" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div
        className="w-full  p-1 grid grid-flow-row bg-blue-50 m-auto"
        style={{ maxWidth: 600 }}
      >
        <div className="users__title">
          <h2>Usuarios</h2>
        </div>
        <div className="flex justify-around">
          <button
            onClick={() => onChangeType("followings")}
            className={
              type === "followings"
                ? "w-1/2 p-2 bg-blue-600 text-white font-bold"
                : "w-1/2 p-2"
            }
            disabled={type === "followings"}
          >
            Siguiendo
          </button>
          <button
            onClick={() => onChangeType("followers")}
            className={
              type === "followers"
                ? "w-1/2 p-2 bg-blue-600 text-white font-bold"
                : "w-1/2 p-2"
            }
            disabled={type === "followers"}
          >
            Seguidores
          </button>
        </div>

        <ListUsers users={users} type="follow" />
        <div className="text-center justify-center flex">
          {!btnLoading ? (
            btnLoading !== 0 ? (
              <button onClick={moreData} className="text-center">
                Cargar mas usuarios
              </button>
            ) : (
              "No hay mas usuarios"
            )
          ) : (
            <div className="w-12 h-12 border-8 border-yellow-400 rounded-full loader" />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}
export default withRouter(Follows);
