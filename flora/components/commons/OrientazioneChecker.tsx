import {useWindowDimensions} from "react-native";

export const isPortrait = () => {
    const {width, height} = useWindowDimensions();
    return width < height;
}