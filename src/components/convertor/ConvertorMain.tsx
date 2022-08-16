import { useState, useEffect, useCallback } from "react";

import CurrencyAmount from "./CurrencyAmount";
import CurrencyDropdown from "./CurrencyDropdown";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import { alpha } from "@mui/material/styles";
import CurrencyExchange from "@mui/icons-material/CurrencyExchange";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchPrivatAPI } from "../../APIs";
import * as Types from "../../models/Types";

export interface ICurrencies {
  value: string;
  label: string;
}
const currencies: ICurrencies[] = [
  {
    value: "USD",
    label: "us",
  },
  {
    value: "EUR",
    label: "eu",
  },
  {
    value: "BTC",
    label: "₿ BTC",
  },
  {
    value: "UAH",
    label: "ua",
  },
];

const ConvertorMain = () => {
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [isComputationInProgress, setIsComputationInProgress] = useState(false);
  const [isClipboard1Visible, setIsClipboard1Visible] = useState(false);
  const [isClipboard2Visible, setIsClipboard2Visible] = useState(false);
  const [isValue1Copied, setIsValue1Copied] = useState(false);
  const [isValue2Copied, setIsValue2Copied] = useState(false);

  const convertorComputations = useCallback(
    (
      amount1: string,
      currency1: string,
      currency2: string,
      currencyRates: Types.IPivateCurRate[]
    ) => {
      let outputVal: number = 0;
      if (currency1 === currency2) outputVal = Number(amount1);

      switch (currency1) {
        case "USD":
          switch (currency2) {
            case "EUR":
              outputVal =
                (Number(amount1) * Number(currencyRates[0]?.buy)) /
                Number(currencyRates[1]?.sale);
              break;
            case "BTC":
              outputVal = Number(amount1) / Number(currencyRates[3]?.buy);
              break;
            case "UAH":
              outputVal = Number(amount1) * Number(currencyRates[0]?.buy);
              break;
          }
          break;
        case "EUR":
          switch (currency2) {
            case "USD":
              outputVal =
                (Number(amount1) * Number(currencyRates[1]?.buy)) /
                Number(currencyRates[0].sale);
              break;
            case "BTC":
              outputVal =
                (Number(amount1) * Number(currencyRates[1]?.buy)) /
                Number(currencyRates[0]?.sale) /
                Number(currencyRates[3]?.buy);
              break;
            case "UAH":
              outputVal = Number(amount1) * Number(currencyRates[1]?.buy);
              break;
          }
          break;
        case "BTC":
          switch (currency2) {
            case "EUR":
              outputVal =
                (Number(amount1) *
                  Number(currencyRates[3]?.sale) *
                  Number(currencyRates[0]?.buy)) /
                Number(currencyRates[1]?.sale);
              break;
            case "USD":
              outputVal = Number(amount1) * Number(currencyRates[3]?.sale);
              break;
            case "UAH":
              outputVal =
                Number(amount1) *
                Number(currencyRates[3]?.sale) *
                Number(currencyRates[0]?.buy);
              break;
          }
          break;
        case "UAH":
          switch (currency2) {
            case "EUR":
              outputVal = Number(amount1) / Number(currencyRates[1]?.sale);
              break;
            case "BTC":
              outputVal =
                Number(amount1) /
                Number(currencyRates[0]?.sale) /
                Number(currencyRates[3]?.sale);
              break;
            case "USD":
              outputVal = Number(amount1) / Number(currencyRates[0]?.sale);
              break;
          }
          break;
      }
      currency2 === "BTC"
        ? setAmount2(String(outputVal?.toFixed(6)))
        : setAmount2(String(outputVal?.toFixed(2)));
    },
    []
  );

  const callFetchAndCompute = useCallback(
    async (amount1: string, currency1: string, currency2: string) => {
      // we expect to receive these vars as params (though they are available in outer func scope) in order not to put them into dependencies` array, avoiding the excesive re-evaluations and re-creations of our cb func
      const res = await fetchPrivatAPI();
      convertorComputations(amount1, currency1, currency2, res);
    },
    [convertorComputations]
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    timer = setTimeout(() => {
      setIsComputationInProgress(true);
      callFetchAndCompute(amount1, currency1, currency2);
      // we expect to receive these vars as params (though they are available in outer func scope) in order not to put them into dependencies` array, avoiding the excesive re-evaluations and re-creations of our cb func
    }, 500);

    return () => {
      clearTimeout(timer);
      setIsComputationInProgress(false);
    };
  }, [amount1, currency1, currency2, callFetchAndCompute]);

  const handleCurrencyChange1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrency1(event.target.value);
  };

  const handleCurrencyChange2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrency2(event.target.value);
  };

  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount1(e.target.value);
  };

  const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount2(e.target.value);
  };

  const handleClipboard1Visible = (props: boolean) => {
    if (props) {
      setTimeout(() => {
        setIsClipboard1Visible(props);
      }, 200);
    } else {
      setTimeout(() => {
        setIsClipboard1Visible(props);
      }, 1000);
    }
  };

  const handleClipboard2Visible = (props: boolean) => {
    if (props) {
      setTimeout(() => {
        setIsClipboard2Visible(props);
      }, 200);
    } else {
      setTimeout(() => {
        setIsClipboard2Visible(props);
      }, 1000);
    }
  };

  const handleClipboard1Copy = () => {
    setIsValue1Copied(true);
    navigator.clipboard.writeText(`${currency1} ${amount1}`);
  };
  const handleClipboard2Copy = () => {
    setIsValue2Copied(true);
    navigator.clipboard.writeText(`${currency2} ${amount2}`);
  };

  const currentData = () => {
    const curData = new Date();
    const month = curData.getMonth() + 1;
    const day = curData.getDate();
    const year = curData.getFullYear();
    const shortStartDate = day + "/" + month + "/" + year;
    return shortStartDate;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px 40px",
          margin: "0 40px 20px 40px",
          boxShadow: 3,
          borderRadius: "10px",
          fontSize: { xs: "15px", sm: "20px" },
          fontWeight: "700",
          width: { xs: "216px", sm: "366px", md: "770px", lg: "966px" },
          textAlign: "-webkit-center",
        }}
      >
        {`${amount1} ${currency1} to ${currency2} rate on ${currentData()}:`}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px",
          margin: "0 40px 20px 40px",
          boxShadow: 3,
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <CurrencyDropdown
                currency={currency1}
                currencies={currencies}
                currencyChangeHandler={handleCurrencyChange1}
              />
            </Box>
            <Box>
              <CurrencyAmount
                amount={amount1}
                amountChangeHandler={handleAmount1Change}
                clipboardVisibilityHandler={handleClipboard1Visible}
                clipboardCopyHandler={handleClipboard1Copy}
                isClipboardVisible={isClipboard1Visible}
                isValueCopied={isValue1Copied}
                setCopyActive={setIsValue1Copied}
              />
            </Box>
          </Box>
          {!isComputationInProgress ? (
            <div style={{ margin: "10px 5px 16.2px 5px" }}>
              <CircularProgress color="secondary" size="23.99px" />
            </div>
          ) : (
            <CurrencyExchange
              onClick={() => {
                setCurrency1(currency2);
                setCurrency2(currency1);
              }}
              sx={{
                margin: "10px 5px 20px 5px",
                color: alpha("#ffdd00", 0.4),
                transition: "all 0.3s",
                "&:hover": {
                  color: alpha("#ffdd00", 1),
                  cursor: "pointer",
                  transform: "rotate(180deg) scale(1.1)",
                },
              }}
            />
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <CurrencyDropdown
                currency={currency2}
                currencies={currencies}
                currencyChangeHandler={handleCurrencyChange2}
              />
            </Box>
            <Box>
              <CurrencyAmount
                amount={amount2}
                amountChangeHandler={handleAmount2Change}
                clipboardVisibilityHandler={handleClipboard2Visible}
                clipboardCopyHandler={handleClipboard2Copy}
                isClipboardVisible={isClipboard2Visible}
                isValueCopied={isValue2Copied}
                setCopyActive={setIsValue2Copied}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ConvertorMain;
