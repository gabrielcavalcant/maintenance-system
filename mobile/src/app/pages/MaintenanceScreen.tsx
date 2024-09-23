import React, { useState } from "react";
import { View, Text, FlatList, Alert, TextInput, TouchableOpacity } from "react-native";
import { TeamMember } from "../navigations/types"; // Certifique-se de ter o tipo definido

type MaintenanceStatus = "Em Andamento" | "Concluída" | "Pendente";

type Maintenance = {
  id: string;
  name: string; // Nome da manutenção
  date: string; // Data no formato dd-mm-aaaa
  status: MaintenanceStatus;
  responsible: string;
  action: string; // Ação sendo realizada
};

// Dados mockados de exemplo
const initialMaintenanceHistory: Maintenance[] = [
  {
    id: "1",
    name: "Troca de Filtro",
    date: "23-09-2024",
    status: "Concluída",
    responsible: "João Silva",
    action: "Substituição do filtro de ar.",
  },
  {
    id: "2",
    name: "Revisão do Motor",
    date: "20-09-2024",
    status: "Em Andamento",
    responsible: "Maria Souza",
    action: "Verificação dos componentes do motor.",
  },
  {
    id: "3",
    name: "Lubrificação Geral",
    date: "18-09-2024",
    status: "Concluída",
    responsible: "Carlos Pereira",
    action: "Lubrificação das partes móveis.",
  },
  {
    id: "4",
    name: "Troca de Óleo",
    date: "15-09-2024",
    status: "Concluída",
    responsible: "Pedro Lima",
    action: "Troca do óleo do motor.",
  },
  {
    id: "5",
    name: "Substituição de Correias",
    date: "10-09-2024",
    status: "Pendente",
    responsible: "Ana Oliveira",
    action: "Substituição das correias do motor.",
  },
  {
    id: "6",
    name: "Inspeção Elétrica",
    date: "08-09-2024",
    status: "Concluída",
    responsible: "José Santos",
    action: "Inspeção do sistema elétrico.",
  },
  {
    id: "7",
    name: "Calibração de Pneus",
    date: "05-09-2024",
    status: "Concluída",
    responsible: "Bruna Costa",
    action: "Calibração dos pneus do veículo.",
  },
];

// Função para determinar a cor de fundo e texto com base no status
const getStatusStyles = (status: MaintenanceStatus) => {
  switch (status) {
    case "Em Andamento":
      return { backgroundColor: "orange", color: "black" }; // Laranja com texto preto
    case "Concluída":
      return { backgroundColor: "green", color: "white" }; // Verde com texto branco
    case "Pendente":
      return { backgroundColor: "red", color: "white" }; // Vermelho com texto branco
    default:
      return { backgroundColor: "gray", color: "black" }; // Padrão
  }
};

const MaintenanceHistoryScreen: React.FC<{ teamMembers: TeamMember[] }> = ({
  teamMembers,
}) => {
  const [maintenanceHistory, setMaintenanceHistory] = useState<Maintenance[]>(initialMaintenanceHistory);
  const [isEditing, setIsEditing] = useState<boolean>(false); // Estado para editar
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null); // Manutenção selecionada

  const handleDelete = (id: string) => {
    Alert.alert(
      "Excluir Manutenção",
      "Tem certeza que deseja excluir esta manutenção?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: () =>
            setMaintenanceHistory(maintenanceHistory.filter((item) => item.id !== id)),
        },
      ]
    );
  };

  const handleEdit = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (selectedMaintenance) {
      setMaintenanceHistory((prev) =>
        prev.map((item) =>
          item.id === selectedMaintenance.id ? selectedMaintenance : item
        )
      );
      setIsEditing(false);
      setSelectedMaintenance(null);
    }
  };

  const handleChangeText = (key: keyof Maintenance, value: string) => {
    if (selectedMaintenance) {
      setSelectedMaintenance({ ...selectedMaintenance, [key]: value });
    }
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-5">Histórico de Manutenções</Text>
      {isEditing && selectedMaintenance ? (
        <View className="mb-4 p-4 bg-gray-100 rounded">
          <Text className="text-lg font-bold mb-2">Editar Manutenção</Text>

          <Text className="mb-1">Nome da Manutenção:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={selectedMaintenance.name}
            onChangeText={(text) => handleChangeText("name", text)}
            placeholder="Nome da Manutenção"
          />

          <Text className="mb-1">Data (dd-mm-aaaa):</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={selectedMaintenance.date}
            onChangeText={(text) => handleChangeText("date", text)}
            placeholder="Data (dd-mm-aaaa)"
          />

          <Text className="mb-1">Status:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={selectedMaintenance.status}
            onChangeText={(text) => handleChangeText("status", text)}
            placeholder="Status"
          />

          <Text className="mb-1">Responsável:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={selectedMaintenance.responsible}
            onChangeText={(text) => handleChangeText("responsible", text)}
            placeholder="Responsável"
          />

          <Text className="mb-1">Ação:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={selectedMaintenance.action}
            onChangeText={(text) => handleChangeText("action", text)}
            placeholder="Ação sendo realizada"
          />

          <TouchableOpacity className="bg-blue-500 p-3 rounded mb-2" onPress={handleSaveEdit}>
            <Text className="text-white text-center font-bold">Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={maintenanceHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const { backgroundColor, color } = getStatusStyles(item.status);
            return (
              <View className="mb-4 p-4 bg-gray-200 rounded">
                <Text className="text-lg">Nome: {item.name}</Text>
                <Text>Data: {item.date}</Text>
                <Text>
                  Status:{" "}
                  <Text
                    style={{
                      backgroundColor,
                      color,
                      padding: 4,
                      borderRadius: 4,
                    }}
                  >
                    {item.status}
                  </Text>
                </Text>
                <Text>Responsável: {item.responsible}</Text>
                <Text>Ação: {item.action}</Text>
                <View className="flex-row justify-between mt-4">
                  <TouchableOpacity className="bg-yellow-500 p-2 rounded" onPress={() => handleEdit(item)}>
                    <Text className="text-white text-center font-bold">Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-red-500 p-2 rounded" onPress={() => handleDelete(item.id)}>
                    <Text className="text-white text-center font-bold">Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default MaintenanceHistoryScreen;
