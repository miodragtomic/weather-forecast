import { HORIZONTAL_GRADIENT } from "../config/appSettings";

export const DEFAULT_GRADIENT_POINTS = [0, 24, 50, 75, 100];

const gradientDirection = HORIZONTAL_GRADIENT
  ? "to right"
  : "to bottom right";

class GradientService {
  calculateGradientPoints(temperature){
    const pointsAdjustment = (40 - temperature) * 1.25;
    return DEFAULT_GRADIENT_POINTS.map( point => point + pointsAdjustment);
  }

  generateGradientValue(gradientsPoints){
    const [first, second, third, fourth, fifth] = gradientsPoints;
  
    return `linear-gradient(${gradientDirection}, rgb(22, 48, 122) ${first}%,rgb(73, 159, 229) ${second}%, rgb(168, 218, 250) ${third}%, rgb(248, 214, 123) ${fourth}%, rgb(240, 150, 97) ${fifth}% )`
  }  
}

export const gradientService = new GradientService();