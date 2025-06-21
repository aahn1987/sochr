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
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { BreadCrumber } from "../../../../Common/Bars/Desktop";
import { IOMHRStore } from "../../../../../Store";
import { SetTitle } from "../../../../../Context/SysFuncs";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import GroupAddTwoToneIcon from "@mui/icons-material/GroupAddTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
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

export default function ListHR() {
  const HRList = IOMHRStore((state) => state.HRList);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    SetTitle("List IOM HR");
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
        finalname="IOM HR"
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
              <PeopleAltTwoToneIcon sx={{ mr: 2 }} />
              IOM HR
            </Typography>
            <Box flexGrow={1}></Box>
            <Tooltip title="Add New IOM HR">
              <Button
                component={NavLink}
                to="add"
                variant="contained"
                color="primary"
                size="small"
              >
                <GroupAddTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> Add New
                IOM HR
              </Button>
            </Tooltip>
          </Box>
          <TableContainer component={Paper} elevation={5}>
            <Table size="small" aria-label="a dense table" sx={{ border: 1 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Fullname</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Phone Number</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {HRList.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell colSpan={5} align="center">
                      No record found
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  HRList.map((row) => (
                    <StyledTableRow key={row.id} sx={{ fontSize: "8px" }}>
                      <StyledTableCell component="th" scope="row">
                        <Avatar alt={row.fullname} src={row.profileimage} />
                      </StyledTableCell>
                      <StyledTableCell>{row.fullname}</StyledTableCell>
                      <StyledTableCell>{row.emailaddress}</StyledTableCell>
                      <StyledTableCell>{row.phonenumber}</StyledTableCell>
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
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}
