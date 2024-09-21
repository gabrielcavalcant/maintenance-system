import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';

type MaintenanceRequest = {
  id: string;
  problemDescription: string;
  priority: string;
  responsible: string;
};

const initialRequests: MaintenanceRequest[] = [
  { id: '1', problemDescription: 'Problema com motor', priority: 'Alta', responsible: 'João' },
  { id: '2', problemDescription: 'Falha no sensor', priority: 'Média', responsible: 'Maria' },
];

const CreateMaintenanceRequestScreen: React.FC = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(initialRequests);
  const [problemDescription, setProblemDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [responsible, setResponsible] = useState('');

  const handleSubmit = () => {
    const newRequest: MaintenanceRequest = {
      id: (requests.length + 1).toString(),
      problemDescription,
      priority,
      responsible,
    };
    setRequests([...requests, newRequest]);
    setProblemDescription('');
    setPriority('');
    setResponsible('');
  };

  const handleDelete = (id: string) => {
    Alert.alert('Excluir Solicitação', 'Tem certeza que deseja excluir esta solicitação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        onPress: () => setRequests(requests.filter((request) => request.id !== id)),
      },
    ]);
  };

  const handleEdit = (id: string) => {
    Alert.alert('Editar Solicitação', `Editar Solicitação com ID: ${id}`);
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-5">Nova Solicitação de Manutenção</Text>

      <Text>Descrição do Problema:</Text>
      <TextInput
        className="border p-2 mb-4"
        value={problemDescription}
        onChangeText={setProblemDescription}
      />

      <Text>Prioridade:</Text>
      <TextInput
        className="border p-2 mb-4"
        value={priority}
        onChangeText={setPriority}
      />

      <Text>Responsável:</Text>
      <TextInput
        className="border p-2 mb-4"
        value={responsible}
        onChangeText={setResponsible}
      />

      <Button title="Criar Solicitação" onPress={handleSubmit} />

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mt-4 p-4 bg-gray-200 rounded">
            <Text>Problema: {item.problemDescription}</Text>
            <Text>Prioridade: {item.priority}</Text>
            <Text>Responsável: {item.responsible}</Text>

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

export default CreateMaintenanceRequestScreen;
