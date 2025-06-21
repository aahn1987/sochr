import { Routes, Route } from "react-router-dom";
import { ListStaff, NewStaff, EditStaff } from "../../Elements/Admin/SocStaff";
import { NotFound } from "../../../Common/Bars/Desktop";
import axios from "axios";
import { AdminListerApi } from "../../../../Context/ApiLinks";
import { AdminInfoStore } from "../../../../Store";
import { useEffect, useState } from "react";
import { GridLoader } from "../../../Common/Loaders";
import { Box } from "@mui/material";
import { ActionMessage } from "../../Elements/Common";
export default function Staff() {
  const setAdminList = AdminInfoStore((state) => state.setAdminList);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    axios
      .get(AdminListerApi)
      .then((response) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          setAdminList(response.data);
          setTimeout(() => {
            setisLoading(false);
          }, 3000);
        } else {
          console.warn("Unexpected response format", response);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch admin list:", error);
      });
  }, [setAdminList]);
  return (
    <>
      {isLoading ? (
        <Box
          display={"flex"}
          height={"60%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <GridLoader />
        </Box>
      ) : (
        <>
          <Routes>
            <Route path="" element={<ListStaff />}></Route>
            <Route path="list" element={<ListStaff />}></Route>
            <Route path="edit/:eid" element={<EditStaff />}></Route>
            <Route path="add" element={<NewStaff />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <ActionMessage />
        </>
      )}
    </>
  );
}
