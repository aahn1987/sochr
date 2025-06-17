import { Box, Container, Grid } from "@mui/material";
import I1 from "../../../../../Assets/IMG/01.png";
import I2 from "../../../../../Assets/IMG/02.png";
import I3 from "../../../../../Assets/IMG/03.png";
import I4 from "../../../../../Assets/IMG/04.png";
import I5 from "../../../../../Assets/IMG/05.png";
import I6 from "../../../../../Assets/IMG/06.png";
import I7 from "../../../../../Assets/IMG/07.png";
import { Img } from "react-image";
import { CircleLoader } from "../../../../Common/Loaders";
export default function LoginFooter() {
  const SetYear = new Date().getFullYear();
  return (
    <Box sx={{ mt: 5 }}>
      <Container
        maxWidth="lg"
        sx={{ textAlign: "center" }}
        className="textcolorwhite"
      >
        <Grid container spacing={1}>
          <Grid size="grow">
            <Img className="OrgLogos" src={I1} loader={<CircleLoader />} />
          </Grid>
          <Grid size="grow">
            <Img className="OrgLogos" src={I2} loader={<CircleLoader />} />
          </Grid>
          <Grid size="grow">
            <Img className="OrgLogos" src={I3} loader={<CircleLoader />} />
          </Grid>
          <Grid size="grow">
            <Img className="OrgLogos" src={I4} loader={<CircleLoader />} />
          </Grid>
          <Grid size="grow">
            <Img className="OrgLogos" src={I5} loader={<CircleLoader />} />
          </Grid>
          <Grid size="grow">
            <Img className="OrgLogos" src={I6} loader={<CircleLoader />} />
          </Grid>
          <Grid size="grow">
            <Img className="OrgLogos" src={I7} loader={<CircleLoader />} />
          </Grid>
          <Grid size={12} sx={{ mt: 3, fontSize: "11px" }}>
            © Copyright Stars Orbit {SetYear} All rights reserved.
            <br />
            Powered By{" "}
            <a
              href="https://minassa.tech"
              target="_blanck"
              className="alllink textcolorwhite"
            >
              Minassa Solutions.
            </a>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
