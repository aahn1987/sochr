import { Box } from "@mui/material";
import { BreadCrumber } from "../../../../Common/Bars/Desktop";
import { useParams } from "react-router-dom";

export default function EditStaff() {
  const { eid } = useParams();
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <BreadCrumber
        mainlink="/admin"
        mainname="Admin Panel"
        hassub={true}
        subname="SOC Staff"
        sublink="/admin/socstaff"
        finalname={"Edit" + eid}
      />
    </Box>
  );
}
