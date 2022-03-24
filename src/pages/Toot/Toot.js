import React, { useState, useEffect } from "react";
import { BasicLayout } from "../../layout";
import { ListToots, ListComments } from "../../components";
import { getTootApi } from "../../api/toot";
import { withRouter } from "react-router-dom";
import userAuth from "../../hooks/useAuth";

import { getTootCommentsApi } from "../../api/comment";
import { toast } from "react-toastify";
import { checkBlockApi } from "../../api/block";

function Toot(props) {
  const { match, setRefreshCheckLogin } = props;
  const [toot, setToot] = useState(null);
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState(null);
  const { params } = match;
  const loggedUser = userAuth();
  const [loadingComments, setLoadingComments] = useState(false);
  useEffect(() => {
    getTootApi(params.id)
      .then((response) => {
        if (!response) toast.error("El toot que has visitado no existe");
        setToot(response);
      })
      .catch(() => {
        toast.error("El toot que has visitado no existe");
      });
  }, [params]);
  useEffect(() => {
    getTootCommentsApi(params.id, page)
      .then((response) => {
        if (!comments && response) {
          setComments(response);
        } else {
          if (!response) {
            setLoadingComments(0);
          } else {
            setComments([...comments, ...response]);
            setLoadingComments(false);
          }
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, params]);
  useEffect(() => {
    if (toot) {
      checkBlockApi(toot.userId).then((response) => {
        if (response.status) {
          window.location = "/";
          toast.error("El usuario que has visitado lo tienes bloqueado");
        }
      });
    }
  }, [toot]);
  const moreData = () => {
    setLoadingComments(true);
    setPage(page + 1);
  };
  return (
    <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
      <div
        className="w-full  p-1 grid grid-flow-row bg-blue-50 m-auto"
        style={{ maxWidth: 600 }}
      >
        <h2>Toot</h2>
        <ListToots toots={toot ? [toot] : null} loggedUser={loggedUser} />
        <h3 className="p-3">Comentarios</h3>
        <ListComments comments={comments} loggedUser={loggedUser} />
        <div className="justify-center flex">
          {!loadingComments ? (
            loadingComments !== 0 ? (
              <button onClick={moreData}>Obtener mas comentarios</button>
            ) : (
              "No hay mas comentarios"
            )
          ) : (
            <div className="w-12 h-12 border-8 border-yellow-400 rounded-full loader" />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}
export default withRouter(Toot);
