import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  colors,
  Tooltip,
  Button,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { BreadCrumber } from "../../../../Common/Bars/Desktop";
import { AdminInfoStore } from "../../../../../Store";
import { SetTitle } from "../../../../../Context/SysFuncs";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import AddModeratorTwoToneIcon from "@mui/icons-material/AddModeratorTwoTone";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { PageLoader } from "../../Common";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "12px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function ListStaff() {
  const adminList = AdminInfoStore((state) => state.adminList);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    SetTitle("List SOC Staff");
    setTimeout(() => {
      setisLoading(false);
    }, 3000);
  }, []);
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <BreadCrumber
        mainlink="/admin"
        mainname="Admin Panel"
        hassub={false}
        finalname="SOC Staff"
      />
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <Box display={"flex"} sx={{ my: 2 }}>
            <Typography
              variant="h6"
              color={colors.blueGrey[700]}
              display={"flex"}
              alignItems={"center"}
            >
              <AdminPanelSettingsOutlinedIcon sx={{ mr: 2 }} />
              SOC Staff
            </Typography>
            <Box flexGrow={1}></Box>
            <Tooltip title="Add New SOC Staff">
              <Button
                component={NavLink}
                to="add"
                variant="contained"
                color="primary"
                size="small"
              >
                <AddModeratorTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> Add
                New SOC Staff
              </Button>
            </Tooltip>
          </Box>
          <TableContainer component={Paper} elevation={5}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Fullname</StyledTableCell>
                  <StyledTableCell align="right">Position</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">Phone Number</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminList.map((row) => (
                  <StyledTableRow key={row.id} sx={{ fontSize: "8px" }}>
                    <StyledTableCell component="th" scope="row">
                      <Avatar alt={row.fullname} src={row.profileimage} />
                    </StyledTableCell>
                    <StyledTableCell>{row.fullname}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.jobpostition}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.emailaddress}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.phonenumber}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Tooltip title={"Edit " + row.fullname}>
                        <NavLink
                          className="alllink tableLink"
                          to={"edit/" + row.refrence}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </NavLink>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}
