import { Routes, Route } from "react-router-dom";
import { ListStaff, NewStaff, EditStaff } from "../../Elements/Admin/SocStaff";
import { NotFound } from "../../../Common/Bars/Desktop";

export default function Staff() {
  return (
    <Routes>
      <Route path="" element={<ListStaff />}></Route>
      <Route path="list" element={<ListStaff />}></Route>
      <Route path="edit/:eid" element={<EditStaff />}></Route>
      <Route path="add" element={<NewStaff />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
