import React from "react";
import { LeftMenu } from "../../components";

export function BasicLayout(props) {
  const { setRefreshCheckLogin, children } = props;
  return (
    <div className="bg-white h-screen flex flex-col">
      <div className="grid grid-flow-row">
        <div>
          <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin} />
        </div>
        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  );
}
