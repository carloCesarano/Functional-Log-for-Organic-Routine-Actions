import {useWindowDimensions} from 'react-native';

export const isPortrait = () : boolean => {
    const {width, height} = useWindowDimensions();
    return width < height;
}

export const isLandscape = () : boolean => {
    return !isPortrait();
}