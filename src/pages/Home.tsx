import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => console.log(tasks), [tasks]);

  function handleAddTask(newTaskTitle: string) {

    // verifica se já existe uma task com este titulo
    if (tasks.find(task => task.title === newTaskTitle)) return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    
    // adiciona task
    setTasks(oldState => oldState.concat({
      ...oldState,
      id: new Date().getTime(),
      title: newTaskTitle
    }));

  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(task => {
      return task.id === id ? {
        ...task,
        done: !task.done
      } : {
        ...task
      }
    }));
  }

  function handleRemoveTask(id: number) {

    // confirma de o usuario quer remover o item
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [{
        text: "Sim",
        onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id))
      },
      {
         text: "Não",
        onPress: () => {}
      }]
    )

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})