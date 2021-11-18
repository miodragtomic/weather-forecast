import { gradientDefaultPoints} from "../services.js/gradientService";

const initial = {
  gradientPoints: [...gradientDefaultPoints]
};

export function weatherReducer(state = initial, action){
  return state;
}