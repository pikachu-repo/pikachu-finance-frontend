import { Navigate, Route, Routes } from "react-router-dom";

import style from "./Setting.module.css";
import cn from "classnames";
import { NavigationTab } from "components/ui";
import { CollectionSetting, PoolSetting } from "components/Setting";

const SettingPages = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="collections" replace />} />
      <Route path="collections" element={<CollectionSetting />} />
      <Route path="pools" element={<PoolSetting />} />
    </Routes>
  );
};

const Setting = () => {
  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <h3>Admin Settings</h3>
      </div>
      <div className={cn(style.navtab)}>
        <NavigationTab
          tabs={[
            { link: "collections", text: "Verified Collections" },
            { link: "pools", text: "Pool Settings" },
          ]}
        />
      </div>
      <SettingPages />
    </div>
  );
};

export default Setting;
