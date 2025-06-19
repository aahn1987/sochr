import { Breadcrumbs, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
export default function BreadCrumber(props) {
  return (
    <Stack spacing={2}>
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        <NavLink className="alllink breabcrumbs" to={props.mainlink}>
          {props.mainname}
        </NavLink>
        {props.hassub && (
          <NavLink className="alllink breabcrumbs" to={props.sublink}>
            {props.subname}
          </NavLink>
        )}
        <Typography
          sx={{ fontSize: "12px", fontWeight: "700" }}
          className="breabcrumbs"
        >
          {props.finalname}
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
}
