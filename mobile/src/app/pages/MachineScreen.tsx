import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigations/types';

type MachineListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MachineScreen'
>;

type Props = {
  navigation: MachineListNavigationProp;
};

type Machine = {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
};

const initialMachines: Machine[] = [
  { id: '1', name: 'Máquina A', type: 'Industrial', location: 'Setor 1', status: 'OK' },
  { id: '2', name: 'Máquina B', type: 'Agrícola', location: 'Setor 2', status: 'Em Manutenção' },
  { id: '3', name: 'Máquina C', type: 'Manufatura', location: 'Setor 3', status: 'OK' },
];

const MachineListScreen: React.FC<Props> = ({ navigation }) => {
  const [machines, setMachines] = useState<Machine[]>(initialMachines);

  const handleDelete = (id: string) => {
    Alert.alert('Excluir Máquina', 'Tem certeza que deseja excluir esta máquina?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        onPress: () => setMachines(machines.filter((machine) => machine.id !== id)),
      },
    ]);
  };

  const handleEdit = (id: string) => {
    // Simular navegação para tela de edição
    Alert.alert('Editar Máquina', `Editar Máquina com ID: ${id}`);
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-5">Lista de Máquinas</Text>
      <FlatList
        data={machines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-gray-200 rounded">
            <TouchableOpacity onPress={() => navigation.navigate('MachineScreen', { machineId: item.id })}>
              <Text className="text-lg font-semibold">{item.name}</Text>
              <Text>Tipo: {item.type}</Text>
              <Text>Localização: {item.location}</Text>
              <Text>Status: {item.status}</Text>
            </TouchableOpacity>

            <View className="flex-row justify-between mt-4">
              <Button title="Editar" onPress={() => handleEdit(item.id)} />
              <Button title="Excluir" onPress={() => handleDelete(item.id)} color="red" />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default MachineListScreen;
