import React, { useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { TeamMember } from '../navigations/types'; // Certifique-se de ter o tipo definido

type Maintenance = {
  id: string;
  date: string;
  status: string;
  responsible: string; // Adicionando responsável
};

const initialMaintenanceHistory: Maintenance[] = [];

const MaintenanceHistoryScreen: React.FC<{ teamMembers: TeamMember[] }> = ({ teamMembers }) => {
  const [maintenanceHistory, setMaintenanceHistory] = useState<Maintenance[]>(initialMaintenanceHistory);

  const handleDelete = (id: string) => {
    Alert.alert('Excluir Manutenção', 'Tem certeza que deseja excluir esta manutenção?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        onPress: () => setMaintenanceHistory(maintenanceHistory.filter((item) => item.id !== id)),
      },
    ]);
  };

  const handleEdit = (id: string) => {
    Alert.alert('Editar Manutenção', `Editar Manutenção com ID: ${id}`);
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-5">Histórico de Manutenções</Text>
      <FlatList
        data={maintenanceHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-gray-200 rounded">
            <Text className="text-lg">Data: {item.date}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Responsável: {item.responsible}</Text> {/* Exibindo responsável */}
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

export default MaintenanceHistoryScreen;
