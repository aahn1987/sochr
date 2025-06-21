import { Skeleton, Stack } from "@mui/material";

export default function PageLoader() {
  return (
    <Stack spacing={1} sx={{ mt: 4 }}>
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="rectangular" width={"100%"} height={60} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="rectangular" width={"100%"} height={60} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="rounded" width={"100%"} height={60} />
      <Skeleton variant="rectangular" width={"100%"} height={60} />
    </Stack>
  );
}
