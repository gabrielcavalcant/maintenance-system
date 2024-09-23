import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Alert, Modal, TouchableOpacity } from 'react-native';

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
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);

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

  const handleEdit = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (selectedRequest) {
      setRequests((prev) =>
        prev.map((request) =>
          request.id === selectedRequest.id ? selectedRequest : request
        )
      );
      setIsEditing(false);
      setSelectedRequest(null);
    }
  };

  const handleChangeText = (key: keyof MaintenanceRequest, value: string) => {
    if (selectedRequest) {
      setSelectedRequest({ ...selectedRequest, [key]: value });
    }
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

      <TouchableOpacity className="bg-blue-500 p-3 rounded mb-4" onPress={handleSubmit}>
        <Text className="text-white text-center font-bold">Criar Solicitação</Text>
      </TouchableOpacity>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mt-4 p-4 bg-gray-200 rounded">
            <Text>Problema: {item.problemDescription}</Text>
            <Text>Prioridade: {item.priority}</Text>
            <Text>Responsável: {item.responsible}</Text>

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity className="bg-yellow-500 p-2 rounded" onPress={() => handleEdit(item)}>
                <Text className="text-white text-center font-bold">Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-red-500 p-2 rounded" onPress={() => handleDelete(item.id)}>
                <Text className="text-white text-center font-bold">Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        visible={isEditing}
        transparent={false} // Muda para false para cobrir toda a tela
        animationType="slide"
      >
        <View className="flex-1 justify-center items-center bg-gray-800">
          <View className="bg-white p-5 rounded w-11/12">
            <Text className="text-2xl mb-4">Editar Solicitação</Text>

            <Text>Descrição do Problema:</Text>
            <TextInput
              className="border p-2 mb-4"
              value={selectedRequest?.problemDescription}
              onChangeText={(text) => handleChangeText('problemDescription', text)}
            />

            <Text>Prioridade:</Text>
            <TextInput
              className="border p-2 mb-4"
              value={selectedRequest?.priority}
              onChangeText={(text) => handleChangeText('priority', text)}
            />

            <Text>Responsável:</Text>
            <TextInput
              className="border p-2 mb-4"
              value={selectedRequest?.responsible}
              onChangeText={(text) => handleChangeText('responsible', text)}
            />

            <TouchableOpacity className="bg-blue-500 p-3 rounded mb-2" onPress={handleSaveEdit}>
              <Text className="text-white text-center font-bold">Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-red-500 p-3 rounded" onPress={() => setIsEditing(false)}>
              <Text className="text-white text-center font-bold">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateMaintenanceRequestScreen;
