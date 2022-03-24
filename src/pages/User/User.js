import React, { useState, useEffect } from "react";
import { BasicLayout } from "../../layout";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";
import { getUserApi } from "../../api/user";
import { BannerAvatar, ListToots, InfoUser } from "../../components";
import userAuth from "../../hooks/useAuth";
import { getUserTootsApi } from "../../api/toot";
import { checkBlockApi } from "../../api/block";

function User(props) {
  const { match, setRefreshCheckLogin } = props;
  const [user, setUser] = useState(null);
  const [toots, setToots] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingToots, setLoadingToots] = useState(false);
  const { params } = match;
  const loggedUser = userAuth();
  useEffect(() => {
    checkBlockApi(params.id).then((response) => {
      if (response.status) {
        window.location = "/";
        toast.error(
          "El toot que has visitado pertenece a un usuario bloqueado"
        );
      }
    });
    getUserApi(params.id)
      .then((response) => {
        if (!response) {
          toast.error("El usuario que has visitado no existe");
          window.location = "/";
        }
        setUser(response);
      })
      .catch(() => {
        toast.error("El usuario que has visitado no existe");
      });
    getUserTootsApi(params.id, 1)
      .then((response) => (response ? setToots(response) : setLoadingToots(0)))
      .catch(() => {
        setLoadingToots(0);
        setToots([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const moreData = () => {
    const pageTemp = page + 1;
    setLoadingToots(true);
    getUserTootsApi(params.id, pageTemp)
      .then((response) => {
        if (!response) {
          setLoadingToots(0);
        } else {
          if (isEmpty(toots)) {
            setToots(response);
          } else {
            setToots([...toots, ...response]);
            setPage(pageTemp);
          }

          setLoadingToots(false);
        }
      })
      .catch(() => setLoadingToots(0));
  };
  return (
    <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
      <div
        className="w-full  p-1 grid grid-flow-row bg-blue-50"
        style={{ maxWidth: 600 }}
      >
        <div className="p-2 ml-2 font-bold">
          <h2>
            {user ? `${user.name} ${user.surnames}` : "Este usuario no existe"}
          </h2>
        </div>
        <BannerAvatar user={user} loggedUser={loggedUser} />

        <InfoUser user={user} loggedUser={loggedUser} />

        <div className="w-full ">
          <h3 className="p-3">Toots</h3>
          <ListToots toots={toots} loggedUser={loggedUser} />
          <div className="flex justify-center">
            {!loadingToots ? (
              loadingToots !== 0 ? (
                <button className="p-3" onClick={moreData}>
                  Obtener mas Toots
                </button>
              ) : (
                "No hay mas toots."
              )
            ) : (
              <div className="w-12 h-12 border-8 border-yellow-400 rounded-full loader" />
            )}
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}
export default withRouter(User);
