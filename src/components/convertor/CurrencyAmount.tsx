import {
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface ICurrencyAmount {
  amount: string;
  amountChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clipboardVisibilityHandler: (props: boolean) => void;
  clipboardCopyHandler: () => void;
  setCopyActive: (props: boolean) => void;
  isClipboardVisible: boolean;
  isValueCopied: boolean;
}

const CurrencyAmount = ({
  amount,
  amountChangeHandler,
  clipboardVisibilityHandler,
  clipboardCopyHandler,
  setCopyActive,
  isClipboardVisible,
  isValueCopied,
}: ICurrencyAmount) => {
  const open = isClipboardVisible && isValueCopied;

  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
      <InputLabel htmlFor="filled-adornment-amount">Amount to sell</InputLabel>
      <FilledInput
        id="filled-adornment"
        value={amount}
        placeholder="1000"
        type="number"
        onChange={amountChangeHandler}
        onFocus={() => clipboardVisibilityHandler(true)}
        onBlur={() => {
          clipboardVisibilityHandler(false);
        }}
        sx={{
          width: { xs: "200px", sm: "350px", lg: "450px" },
          "&input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
              margin: 0,
            },
          display: "flex",
          alignItems: "baseline",
        }}
        endAdornment={
          <InputAdornment position="end">
            {isClipboardVisible && (
              <div>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  disableInteractive
                  title={`Copied👌`}
                  arrow
                  placement="bottom-end"
                >
                  <ContentCopyIcon
                    sx={{
                      "&:hover": { cursor: "pointer" },
                    }}
                    onClick={() => {
                      clipboardCopyHandler();
                      setTimeout(() => {
                        setCopyActive(false);
                      }, 1400);
                    }}
                  />
                </Tooltip>
              </div>
            )}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default CurrencyAmount;
