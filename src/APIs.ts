import axios from "axios";
import * as Types from "./models/Types";

export const fetchPrivatAPI = async (): Promise<Types.IPivateCurRate[]> => {
  const response = await axios(
    "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11"
  );
  return response.data;
  // add error catching logic
};
