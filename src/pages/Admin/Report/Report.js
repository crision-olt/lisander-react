import React, { useState, useEffect } from "react";
import { BasicLayout } from "../../../layout";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";
import { getReportApi } from "../../../api/report";
import { BannerAvatar, ListToots, InfoUser } from "../../../components";
import userAuth from "../../../hooks/useAuth";
import { getUserTootsApi } from "../../../api/toot";

function Report(props) {
  const { match, setRefreshCheckLogin } = props;
  const [user, setUser] = useState(null);
  const [report, setReport] = useState(null);
  const [toots, setToots] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingToots, setLoadingToots] = useState(false);
  const { params } = match;
  const loggedUser = userAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getReportApi(params.id).then(async (response) => {
      if (!response) toast.error("El reporte que has visitado no existe");
      setReport(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(() => {
    if (report) {
      setUser(report.reportedUser);
      getUserTootsApi(report.reportedUser?.id, 1)
        .then((response) => {
          setToots(response);
        })
        .catch(() => {
          setToots([]);
        });
    }
  }, [report]);
  const moreData = () => {
    const pageTemp = page + 1;
    setLoadingToots(true);
    getUserTootsApi(params.id, pageTemp).then((response) => {
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
    });
  };
  return (
    <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div
        className="w-full  p-1 grid grid-flow-row bg-blue-50 m-auto"
        style={{ maxWidth: 600 }}
      >
        <div className="user__title">
          <h2>
            {user ? `${user.name} ${user.surnames}` : "Este usuario no existe"}
          </h2>
        </div>
        <BannerAvatar user={user} type="report" loggedUser={loggedUser} />

        <InfoUser user={user} loggedUser={loggedUser} />

        <div className="user__toots">
          <h3>Toots</h3>
          {toots && <ListToots toots={toots} />}
          <button onClick={moreData}>
            {!loadingToots ? (
              loadingToots !== 0 && "Obtener mas Toots"
            ) : (
              <div className="w-12 h-12 border-8 border-yellow-400 rounded-full loader" />
            )}
          </button>
        </div>
      </div>
    </BasicLayout>
  );
}
export default withRouter(Report);
