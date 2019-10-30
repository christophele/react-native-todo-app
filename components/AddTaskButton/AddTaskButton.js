import React from 'react';
import ActionButton from 'react-native-action-button';
import {Icon} from 'react-native-elements';
import {APP_COLORS} from '../../styles/colors';

const AddTaskButton = ({onPressCallBack}) => (
    <ActionButton 
        buttonColor={APP_COLORS.primaryAction}
        icon={<Icon color={APP_COLORS.primaryText} name={'add'} />}
        onPress={() => onPressCallBack()}
    />
);


export default AddTaskButton;