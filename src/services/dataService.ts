import {Block} from "./models/block";
import apiData from "../../dummy_data.json";

export const getCarouselData = (): Block[] =>
  apiData.filter((_, idx) => idx < 14).map(b => new Block(b));
