import React from 'react';
import TaskList from './components/TaskList/TaskList';
import Header from './components/Header/Header';
import MenuTask from './components/MenuTask/MenuTask';
import AddTaskButton from './components/AddTaskButton/AddTaskButton';
import TextPrompt from './components/TextPrompt/TextPrompt';
import {View, Text, ScrollView, AsyncStorage} from 'react-native';
import {ListItem} from 'react-native-elements';
import lodash from 'lodash';
import {TASK_STATUS} from './model';
import {style} from './style.js';
const storageKey = 'taskList';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           taskList: [],
           isMenuTaskVisible: false,
           isAddPromptVisible: false,
           isRenamePromptVisible: false,
           currentTask: {},
           idGenerator: 0
        }
    }

    componentWillMount() {
        AsyncStorage.getItem(storageKey).then(storedTaskList => {
            if (storedTaskList) {
                this.setState({
                    taskList: JSON.parse(storedTaskList)
                }, () => {
                    this.setState({idGenerator: this.state.taskList[this.state.taskList.length - 1].id + 1})
                });
            }
        });
    }
    
    toggleMenuTaskVisibility = task => {
        let currentTask = task;
        
        if (this.state.isMenuTaskVisible) {
            currentTask = {};
        }

        this.setState({
            isMenuTaskVisible: !this.state.isMenuTaskVisible,
            currentTask
        });
    }

    deleteCurrentTask = () => {
        const index = lodash.findIndex(this.state.taskList, {
            id: this.state.currentTask.id
        });

        const list = this.state.taskList;
        list.splice(index, 1); // retire un seul element du tableau à partir de l'index "index"

        this.setState({
            taskList: list,
            currentTask: {}
        }, () => {
            this.toggleMenuTaskVisibility();
            this.saveTaskList();
        });

    }

    toggleTaskStatus = () => {
        const updatedTask = this.state.currentTask;
        updatedTask.status = this.state.currentTask.status === TASK_STATUS.doneStatus ? TASK_STATUS.todoStatus : TASK_STATUS.doneStatus;
        const index = lodash.findIndex(this.state.taskList, {
            id: this.state.currentTask.id
        });

        const updatedTaskList = this.state.taskList;
        updatedTaskList[index] = updatedTask;
        this.setState({
            taskList: updatedTaskList,
            isMenuTaskVisible: false,
            currentTask: {}
        }, () => {
            this.saveTaskList();
        });
    }

    hideAddPrompt = () => {
        this.setState({
            isAddPromptVisible: false
        });
    }

    onAddTask = (value) => {
        const newTask = {
            id: this.state.idGenerator,
            content: value,
            status: TASK_STATUS.todoStatus
        };

        this.setState({
            taskList: [...this.state.taskList, newTask],
            isAddPromptVisible: false,
            idGenerator: this.state.idGenerator + 1 // prend chacun des éléments de this.state.taskList et y ajoute la task à la fin
        }, () => {
            this.saveTaskList();
        });
    }

    displayAddPrompt = () => {
        this.setState({
            isAddPromptVisible: true
        });
    }

    displayRenameTask = (task) => {
        this.setState({
            currentTask: task,
            isRenamePromptVisible: true
        }, () => {
            console.log(this.state.currentTask);
        });
    }

    hideRenamePrompt = () => {
        this.setState({
            isRenamePromptVisible: false,
            currentTask: {}
        });
    }

    renameTask = (value) => {
        const updatedTask = this.state.currentTask;
        updatedTask.content = value;
        const index = lodash.findIndex(this.state.taskList, {
            id: this.state.currentTask.id
        });
        const updatedTaskList = this.state.taskList;
        updatedTaskList[index] = updatedTask;

        this.setState({
            taskList: updatedTaskList
        }, () => {
            this.hideRenamePrompt();
            this.saveTaskList();
        });
    }

    saveTaskList = () => {
        AsyncStorage.setItem(storageKey, JSON.stringify(this.state.taskList))
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header content="Liste de tâches" />
                <ScrollView>
                    {this.state.taskList.length > 0  
                        ? <TaskList
                            onPressCallBack={this.toggleMenuTaskVisibility}
                            onLongPressCallBack={this.displayRenameTask}
                            taskList={this.state.taskList}
                        />
                        : <View style={style.tasks}>
                            <Text>Cliquer sur le bouton ajouter pour créer une tâche.</Text>
                        </View>
                    }
                </ScrollView>
                <MenuTask
                    isVisible={this.state.isMenuTaskVisible}
                    onDisappearCallBack={this.toggleMenuTaskVisibility}
                    onDeleteCallBack={this.deleteCurrentTask}
                    onChangeStatusCallBack={this.toggleTaskStatus}
                />
                <TextPrompt
                    title="Ajouter une nouvelle tâche"
                    placeholder="Faire un roadtrip en Mongolie"
                    isVisible={this.state.isAddPromptVisible}
                    onCancelCallback={this.hideAddPrompt}
                    onSubmitCallBack={this.onAddTask}
                    defaultValue={''}
                />

                <TextPrompt
                    title="Renommer la tâche, pistache !"
                    isVisible={this.state.isRenamePromptVisible}
                    onCancelCallback={this.hideRenamePrompt}
                    onSubmitCallBack={this.renameTask}
                    defaultValue={this.state.currentTask.content}
                />

                <AddTaskButton 
                    onPressCallBack={this.displayAddPrompt}
                />
            </View>
        );
    }
}

export default App;