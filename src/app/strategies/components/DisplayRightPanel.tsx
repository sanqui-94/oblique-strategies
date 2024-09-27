import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useDisplayContext } from "@/store/DisplayContextProvider";
import { Stack } from "@mui/material";

export default function DisplayLeftPanel() {
  const {
    loadingE,
    strategy,
    toogleFavorite,
    resetStrategies,
    getAnotherStrategy,
    getById
  } = useDisplayContext();

  async function starHanlder(id: string) {
    await toogleFavorite(id);
    getById(id);
  }

  async function unstarHandler(id: string) {
    await toogleFavorite(id, false);
    getById(id);
  }

  async function resetHandler() {
    await resetStrategies();
    getAnotherStrategy();
  }

  return (
    <Stack spacing={5}>
      <Tooltip
        title={
          strategy && strategy.starred
            ? "You liked this one huh?"
            : "Add this to your favorites"
        }
      >
        <span>
          <Button disabled={loadingE}>
            {strategy && strategy.starred ? (
              <StarIcon
                onClick={() => {
                  if (strategy) unstarHandler(strategy._id);
                }}
              />
            ) : (
              <StarBorderIcon
                onClick={() => {
                  if (strategy) starHanlder(strategy._id);
                }}
              />
            )}
          </Button>
        </span>
      </Tooltip>
      <Tooltip title="Unsee all strategies">
        <span>
          <Button disabled={loadingE}>
            <RotateLeftIcon onClick={() => resetHandler()} />
          </Button>
        </span>
      </Tooltip>
    </Stack>
  );
}
