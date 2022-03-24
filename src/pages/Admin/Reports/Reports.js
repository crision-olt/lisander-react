import React, { useState, useEffect } from "react";
import { getReportsApi } from "../../../api/report";
import { ListReports } from "../../../components";
import { BasicLayout } from "../../../layout";
import { isEmpty } from "lodash";
export default function Reports(props) {
  const { setRefreshCheckLogin } = props;
  const [reports, setReports] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingReports, setLoadingReports] = useState(false);
  useEffect(() => {
    getReportsApi(page)
      .then((response) => {
        if (response) setReports(response);
        else loadingReports(0);
        // eslint-disable-next-line eqeqeq
      })
      .catch(() => {
        setReports([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moreData = () => {
    const pageTemp = page + 1;
    setLoadingReports(true);
    getReportsApi(pageTemp).then((response) => {
      if (!response) {
        setLoadingReports(0);
      } else {
        if (isEmpty(reports)) {
          setReports(response);
        } else {
          setReports([...reports, ...response]);
          setPage(pageTemp);
        }
        setLoadingReports(false);
      }
    });
  };

  return (
    <BasicLayout
      className="users"
      title="Usuarios"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <div
        className="w-full  p-1 grid grid-flow-row bg-blue-50 m-auto"
        style={{ maxWidth: 600 }}
      >
        <div className="users__title">
          <h2>Reports</h2>
        </div>

        <ListReports reports={reports} />
        <div className="flex justify-center">
          {!loadingReports ? (
            loadingReports !== 0 ? (
              <button className="p-3" onClick={moreData}>
                Obtener mas Toots
              </button>
            ) : (
              "No hay reportes."
            )
          ) : (
            <div className="w-12 h-12 border-8 border-yellow-400 rounded-full loader" />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}
