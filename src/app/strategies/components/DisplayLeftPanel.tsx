import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { useDisplayContext } from "@/store/DisplayContextProvider";

export default function DisplayLeftPanel() {
  const { loadingE, strategy, markAsSeen, getAnotherStrategy } =
    useDisplayContext();

  async function arrowHandler(id: string) {
    markAsSeen(id);
    getAnotherStrategy();
  }

  return (
    <Tooltip title="Get another dilema!">
      <span>
        <Button disabled={loadingE}>
          <ShuffleIcon
            onClick={() => {
              if (strategy) {
                arrowHandler(strategy._id);
              }
            }}
          />
        </Button>
      </span>
    </Tooltip>
  );
}
