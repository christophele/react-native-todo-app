import {StyleSheet} from 'react-native';
import {APP_COLORS} from '../../styles/colors';

export const style = StyleSheet.create({
    subHeader: {
        backgroundColor: APP_COLORS.darkPrimary,
        height: 60
    },
    header: {
        backgroundColor: APP_COLORS.primary,
        height: 250,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: APP_COLORS.shadow,
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 5
        }
    },
    text: {
        color: APP_COLORS.primaryText,
        fontSize: 35
    }
});