import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getBlockUsersApi } from "../../api/block";
import { isEmpty } from "lodash";
import { ListUsers } from "../../components";
import { BasicLayout } from "../../layout";

export function BlockedUsers(props) {
  const { setRefreshCheckLogin } = props;
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    getBlockUsersApi(page)
      .then((response) => {
        // eslint-disable-next-line eqeqeq
        if (page === 1) {
          if (isEmpty(response)) {
            setBtnLoading(0);
            setUsers([]);
          } else {
            setUsers(response);
          }
        } else {
          if (!response) {
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
  }, [page]);

  const moreData = () => {
    setBtnLoading(true);
    setPage(page + 1);
  };
  return (
    <BasicLayout
      className="users"
      title="Usuarios"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <div
        className="w-full p-1 grid grid-flow-row bg-blue-50 m-auto"
        style={{ maxWidth: 600 }}
      >
        <h2>Usuarios Blockeados</h2>

        <ListUsers users={users} type="block" />
        <div className="flex justify-center">
          {!btnLoading ? (
            btnLoading !== 0 ? (
              <button onClick={moreData} className="">
                Cargar mas usuarios
              </button>
            ) : (
              "No hay mas usuarios blockeados."
            )
          ) : (
            <div className="w-12 h-12 border-8 border-yellow-400 rounded-full loader" />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}
export default withRouter(BlockedUsers);
