import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, Modal, ScrollView } from 'react-native';
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
  model: string;
  manufactureDate: string;
  serialNumber: string;
  location: string;
  status: string;
};

const initialMachines: Machine[] = [
  { id: '1', name: 'Furadeira Elétrica', type: 'Industrial', model: 'FE-3000', manufactureDate: '2021-01-01', serialNumber: 'SN123456', location: 'Setor de Montagem', status: 'OK' },
  { id: '2', name: 'Trator Agrícola', type: 'Agrícola', model: 'TA-2020', manufactureDate: '2020-06-15', serialNumber: 'SN789012', location: 'Setor Rural', status: 'Em Manutenção' },
  { id: '3', name: 'Impressora 3D', type: 'Manufatura', model: '3DP-500', manufactureDate: '2022-03-20', serialNumber: 'SN345678', location: 'Setor de Produção', status: 'OK' },
  { id: '4', name: 'Cortadora de Papel', type: 'Industrial', model: 'CP-150', manufactureDate: '2019-11-10', serialNumber: 'SN901234', location: 'Setor de Acabamento', status: 'Pendente' },
  { id: '5', name: 'Escavadeira Hidráulica', type: 'Construção', model: 'EH-900', manufactureDate: '2018-08-22', serialNumber: 'SN567890', location: 'Setor de Obras', status: 'Em Manutenção' },
];

const MachineListScreen: React.FC<Props> = ({ navigation }) => {
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [showForm, setShowForm] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [newMachine, setNewMachine] = useState<Machine>({
    id: '',
    name: '',
    type: '',
    model: '',
    manufactureDate: '',
    serialNumber: '',
    location: '',
    status: '',
  });

  const handleDelete = (id: string) => {
    Alert.alert('Excluir Máquina', 'Tem certeza que deseja excluir esta máquina?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        onPress: () => setMachines(machines.filter((machine) => machine.id !== id)),
      },
    ]);
  };

  const handleEdit = (machine: Machine) => {
    setEditingMachine({ ...machine });
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    if (editingMachine) {
      setMachines((prev) =>
        prev.map((machine) => (machine.id === editingMachine.id ? editingMachine : machine))
      );
    } else {
      const newId = String(machines.length + 1);
      setMachines((prev) => [...prev, { ...newMachine, id: newId }]);
    }

    setShowForm(false);
    setEditingMachine(null);
    setNewMachine({
      id: '',
      name: '',
      type: '',
      model: '',
      manufactureDate: '',
      serialNumber: '',
      location: '',
      status: '',
    });
  };

  const handleChangeText = (key: keyof Machine, value: string) => {
    if (editingMachine) {
      setEditingMachine({ ...editingMachine, [key]: value });
    } else {
      setNewMachine((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleViewDetails = (machine: Machine) => {
    setSelectedMachine(machine);
    setIsModalVisible(true);
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-5">Lista de Máquinas</Text>

      <TouchableOpacity
        className="bg-blue-500 p-3 rounded mb-4"
        onPress={() => {
          setShowForm(!showForm);
          setEditingMachine(null);
        }}
      >
        <Text className="text-white text-center">{showForm ? "Fechar Formulário" : "Adicionar Nova Máquina"}</Text>
      </TouchableOpacity>

      {showForm && (
        <View className="mb-4 p-4 bg-gray-100 rounded">
          <Text className="text-lg font-bold mb-2">{editingMachine ? 'Editar Máquina' : 'Adicionar Nova Máquina'}</Text>

          <Text className="mb-1">Nome:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={editingMachine ? editingMachine.name : newMachine.name}
            onChangeText={(text) => handleChangeText('name', text)}
            placeholder="Nome da Máquina"
          />

          <Text className="mb-1">Tipo:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={editingMachine ? editingMachine.type : newMachine.type}
            onChangeText={(text) => handleChangeText('type', text)}
            placeholder="Tipo da Máquina"
          />

          <Text className="mb-1">Modelo:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={editingMachine ? editingMachine.model : newMachine.model}
            onChangeText={(text) => handleChangeText('model', text)}
            placeholder="Modelo da Máquina"
          />

          <Text className="mb-1">Data de Fabricação:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={editingMachine ? editingMachine.manufactureDate : newMachine.manufactureDate}
            onChangeText={(text) => handleChangeText('manufactureDate', text)}
            placeholder="Data de Fabricação (aaaa-mm-dd)"
          />

          <Text className="mb-1">Número de Série:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={editingMachine ? editingMachine.serialNumber : newMachine.serialNumber}
            onChangeText={(text) => handleChangeText('serialNumber', text)}
            placeholder="Número de Série"
          />

          <Text className="mb-1">Localização:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={editingMachine ? editingMachine.location : newMachine.location}
            onChangeText={(text) => handleChangeText('location', text)}
            placeholder="Localização da Máquina"
          />

          <Text className="mb-1">Status:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={editingMachine ? editingMachine.status : newMachine.status}
            onChangeText={(text) => handleChangeText('status', text)}
            placeholder="Status da Máquina"
          />

          <TouchableOpacity className="bg-green-500 p-3 rounded mt-2" onPress={handleFormSubmit}>
            <Text className="text-white text-center">Salvar</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={machines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-gray-200 rounded" key={item.id}>
            <TouchableOpacity onPress={() => handleViewDetails(item)}>
              <Text className="text-lg font-semibold">Nome: {item.name}</Text>
              <Text>Tipo: {item.type}</Text>
              <Text>Modelo: {item.model}</Text>
              <Text>Data de Fabricação: {item.manufactureDate}</Text>
              <Text>Número de Série: {item.serialNumber}</Text>
              <Text>Localização: {item.location}</Text>
              <Text>Status: {item.status}</Text>
            </TouchableOpacity>

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity className="bg-yellow-500 p-2 rounded" onPress={() => handleEdit(item)}>
                <Text className="text-white">Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-red-500 p-2 rounded" onPress={() => handleDelete(item.id)}>
                <Text className="text-white">Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {selectedMachine && (
        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View className="flex-1 justify-center items-center bg-[rgba(0, 0, 0, 0.5)]">
            <View className="bg-white p-5 rounded w-[90%] h-[70%]">
              <Text className="text-2xl font-bold">{selectedMachine.name}</Text>
              <ScrollView>
                <Text>Tipo: {selectedMachine.type}</Text>
                <Text>Modelo: {selectedMachine.model}</Text>
                <Text>Data de Fabricação: {selectedMachine.manufactureDate}</Text>
                <Text>Número de Série: {selectedMachine.serialNumber}</Text>
                <Text>Localização: {selectedMachine.location}</Text>
                <Text>Status: {selectedMachine.status}</Text>
                <Text className="mt-2 font-bold">Histórico de Manutenção</Text>
                {/* Adicionar histórico de manutenção e imagens se disponíveis */}
              </ScrollView>
              <TouchableOpacity className="bg-blue-500 p-3 rounded mt-2" onPress={() => setIsModalVisible(false)}>
                <Text className="text-white text-center">Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default MachineListScreen;
