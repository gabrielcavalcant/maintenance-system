import React, { useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';

type Maintenance = {
  id: string;
  date: string;
  status: string;
};

const initialMaintenanceHistory: Maintenance[] = [
  { id: '1', date: '2023-08-15', status: 'Concluída' },
  { id: '2', date: '2023-09-01', status: 'Pendente' },
  { id: '3', date: '2023-09-10', status: 'Em andamento' },
];

const MaintenanceHistoryScreen: React.FC = () => {
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
