import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigations/types';
import MachineForm from '../components/MachineForm'; 

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
  model: string; // Adicionei o modelo
  manufactureDate: string; // Adicionei a data de fabricação
  serialNumber: string; // Adicionei o número de série
  location: string;
  status: string;
};

const initialMachines: Machine[] = [
  { id: '1', name: 'Máquina A', type: 'Industrial', model: 'Modelo A', manufactureDate: '2021-01-01', serialNumber: 'SN001', location: 'Setor 1', status: 'OK' },
  { id: '2', name: 'Máquina B', type: 'Agrícola', model: 'Modelo B', manufactureDate: '2020-06-15', serialNumber: 'SN002', location: 'Setor 2', status: 'Em Manutenção' },
  { id: '3', name: 'Máquina C', type: 'Manufatura', model: 'Modelo C', manufactureDate: '2022-03-20', serialNumber: 'SN003', location: 'Setor 3', status: 'OK' },
];

const MachineListScreen: React.FC<Props> = ({ navigation }) => {
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [showForm, setShowForm] = useState(false); // Estado para controlar o formulário

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
    Alert.alert('Editar Máquina', `Editar Máquina com ID: ${id}`);
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-5">Lista de Máquinas</Text>

      {/* Botão para alternar exibição do formulário */}
      <Button
        title={showForm ? "Fechar Formulário" : "Adicionar Nova Máquina"}
        onPress={() => setShowForm(!showForm)}
      />

      {/* Exibe o formulário se o botão for clicado */}
      <MachineForm 
        visible={showForm} 
        onClose={() => setShowForm(false)} 
        onCreate={(newMachine) => {
          setMachines((prev) => [...prev, { ...newMachine, id: String(prev.length + 1) }]);
          setShowForm(false); // Fecha o modal após criar a máquina
        }} 
      />

      <FlatList
        data={machines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-gray-200 rounded">
            <TouchableOpacity onPress={() => navigation.navigate('MachineScreen', { machineId: item.id })}>
              <Text className="text-lg font-semibold">{item.name}</Text>
              <Text>Tipo: {item.type}</Text>
              <Text>Modelo: {item.model}</Text>
              <Text>Data de Fabricação: {item.manufactureDate}</Text>
              <Text>Número de Série: {item.serialNumber}</Text>
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
