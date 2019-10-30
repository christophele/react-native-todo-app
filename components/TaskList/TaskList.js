import React from 'react';
import {ListItem, Badge} from 'react-native-elements';
import {View, Text} from 'react-native';
import {style} from './style';
import {TASK_STATUS} from '../../model';
import {APP_COLORS} from '../../styles/colors';

const TaskList = ({taskList, onPressCallBack, onLongPressCallBack}) => (
    <View>
        {
            taskList.map(task => (
                <ListItem
                    key={task.id}
                    title={task.content}
                    onPress={() => onPressCallBack(task)} // appelle la méthode dans le composant parent
                    onLongPress={() => onLongPressCallBack(task)}
                    badge={{
                        value: task.status,
                        badgeStyle: 
                            task.status === TASK_STATUS.todoStatus
                            ? {backgroundColor : APP_COLORS.accent}
                            : {backgroundColor: APP_COLORS.lightPrimaryColor}
                    }}

                />
            ))
        }
    </View>
);

export default TaskList;