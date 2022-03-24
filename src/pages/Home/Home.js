import React, { useState, useEffect } from "react";
import { BasicLayout } from "../../layout";
import userAuth from "../../hooks/useAuth";
import { getTootsFollowersApi } from "../../api/toot";
import { ListToots } from "../../components";

export function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [toots, setToots] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingToots, setLoadingToots] = useState(false);
  const loggedUser = userAuth();
  useEffect(() => {
    getTootsFollowersApi(page).then((response) => {
      if (!toots && response) {
        setToots(response);
      } else {
        if (!response) {
          setLoadingToots(0);
        } else {
          setToots([...toots, ...response]);
          setLoadingToots(false);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const moreData = () => {
    setLoadingToots(true);
    setPage(page + 1);
  };
  return (
    <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
      <div
        className="w-full  p-1 grid grid-flow-row bg-blue-50"
        style={{ maxWidth: 600 }}
      >
        <div className="home__title">
          <h2>Inicio</h2>
        </div>
        <ListToots toots={toots} loggedUser={loggedUser} />
        <div className="flex justify-center">
          {!loadingToots ? (
            loadingToots !== 0 ? (
              <button onClick={moreData} className="load-more">
                Obtener mas Toots
              </button>
            ) : (
              "No hay mas toots"
            )
          ) : (
            <div className="w-12 h-12 border-8 border-yellow-400 rounded-full loader" />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}
