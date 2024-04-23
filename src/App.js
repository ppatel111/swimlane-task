import "./App.css";
import { Box, Card, Stack, Typography } from "@mui/material";
import DroppableComponent from "./components/DroppableComponent";

function App() {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Card
          sx={{
            width: "30vw",
            height: "100vh",
            padding: 5,
          }}
        >
          <Typography variant="h6" align="center" fontWeight="bold" mb={2}>
            Pre-defined Rules
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                <strong>Alpha:</strong> Maximum 4 blocks Allowed.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Beta:</strong> Only blocks with even numbers can be
                placed here, with a limit of four blocks.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Charlie:</strong> Blocks in this lane must always total
                more than 100, and the maximum capacity remains at four blocks.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Delta:</strong> Unrestricted
              </Typography>
            </li>
          </ul>
        </Card>

        <Card sx={{ width: "70vw", height: "100vh", padding: 5 }}>
          <DroppableComponent />
        </Card>
      </Stack>
    </Box>
  );
}

export default App;
