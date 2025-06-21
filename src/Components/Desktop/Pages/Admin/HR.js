import { Routes, Route } from "react-router-dom";
import { ListHR, AddHR, EditHR } from "../../Elements/Admin/IOMHR";
import { NotFound } from "../../../Common/Bars/Desktop";
import axios from "axios";
import { IOMHRStore } from "../../../../Store";
import { useEffect, useState } from "react";
import { GridLoader } from "../../../Common/Loaders";
import { Box } from "@mui/material";
import { ActionMessage } from "../../Elements/Common";
import { IOMHRListerAPI } from "../../../../Context/ApiLinks";

export default function HR() {
  const setHRList = IOMHRStore((state) => state.setHRList);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    axios
      .get(IOMHRListerAPI)
      .then((response) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          setHRList(response.data);
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
  }, [setHRList]);
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
            <Route path="" element={<ListHR />}></Route>
            <Route path="list" element={<ListHR />}></Route>
            <Route path="edit/:eid" element={<EditHR />}></Route>
            <Route path="add" element={<AddHR />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <ActionMessage />
        </>
      )}
    </>
  );
}
