import { TextField, MenuItem } from "@mui/material";
import { ICurrencies } from "../convertor/ConvertorMain";

interface ICurrencyDropdown {
  currency: string;
  currencyChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currencies: ICurrencies[];
}

const CurrencyDropdown = ({
  currency,
  currencyChangeHandler,
  currencies,
}: ICurrencyDropdown) => {
  return (
    <TextField
      id="standard-select-currency"
      select
      label="Please select your base currency"
      value={currency}
      onChange={currencyChangeHandler}
      sx={{
        width: { xs: "200px", sm: "350px", lg: "450px" },
      }}
    >
      {currencies.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {option.value === "BTC" ? (
              <span style={{ width: "21.3px", height: "20px" }}>
                <img
                  alt="bitcoin logo"
                  style={{ width: "20px", height: "20px" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png"
                />
              </span>
            ) : (
              <span
                style={{ lineHeight: "20px" }}
                className={`fi fi-${option.label}`}
              ></span>
            )}
            <span style={{ marginLeft: "5px" }}>{option.value}</span>
          </div>
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CurrencyDropdown;
