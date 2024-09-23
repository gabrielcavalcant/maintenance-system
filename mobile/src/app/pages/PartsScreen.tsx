import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';

type Part = {
  id: string;
  nome: string;
  codigo: string;
  fornecedor: string;
  quantidade: number;
  status: "OK" | "Fora de Estoque";
};

// Dados mockados iniciais
const initialParts: Part[] = [
  { id: '1', nome: 'Rolamento de Esfera', codigo: 'RB-100', fornecedor: 'Fornecedora XYZ', quantidade: 25, status: 'OK' },
  { id: '2', nome: 'Fusível 10A', codigo: 'FZ-200', fornecedor: 'Fornecedora ABC', quantidade: 0, status: 'Fora de Estoque' },
  { id: '3', nome: 'Parafuso Inox M6', codigo: 'PI-300', fornecedor: 'Fornecedora QWE', quantidade: 100, status: 'OK' },
  { id: '4', nome: 'Bucha de Nylon', codigo: 'BN-400', fornecedor: 'Fornecedora RST', quantidade: 50, status: 'OK' },
  { id: '5', nome: 'Correia de Transmissão', codigo: 'CT-500', fornecedor: 'Fornecedora UVW', quantidade: 15, status: 'OK' },
];

// Mapeamento de status para cores
const statusColors = {
  OK: 'green',
  "Fora de Estoque": 'red',
};

const PartsScreen = () => {
  const [parts, setParts] = useState<Part[]>(initialParts);
  const [showForm, setShowForm] = useState(false);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [newPart, setNewPart] = useState<Part>({
    id: '',
    nome: '',
    codigo: '',
    fornecedor: '',
    quantidade: 0,
    status: 'OK',
  });

  const handleDelete = (id: string) => {
    Alert.alert('Excluir Peça', 'Tem certeza que deseja excluir esta peça?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        onPress: () => setParts(parts.filter((part) => part.id !== id)),
      },
    ]);
  };

  const handleEdit = (part: Part) => {
    setEditingPart({ ...part });
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    if (editingPart) {
      setParts((prev) =>
        prev.map((part) => (part.id === editingPart.id ? editingPart : part))
      );
    } else {
      const newId = String(parts.length + 1);
      setParts((prev) => [...prev, { ...newPart, id: newId }]);
    }

    setShowForm(false);
    setEditingPart(null);
    setNewPart({
      id: '',
      nome: '',
      codigo: '',
      fornecedor: '',
      quantidade: 0,
      status: 'OK',
    });
  };

  const handleChangeText = (key: keyof Part, value: string | number) => {
    if (editingPart) {
      setEditingPart({ ...editingPart, [key]: value });
    } else {
      setNewPart((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-5">Registro de Peças</Text>

      <TouchableOpacity
        className="bg-blue-500 p-3 rounded mb-4"
        onPress={() => {
          setShowForm(!showForm);
          setEditingPart(null);
        }}
      >
        <Text className="text-white text-center font-bold">{showForm ? "Fechar Formulário" : "Adicionar Nova Peça"}</Text>
      </TouchableOpacity>

      {showForm && (
        <View className="mb-4 p-4 bg-gray-100 rounded">
          <Text className="text-lg font-bold mb-2">{editingPart ? 'Editar Peça' : 'Adicionar Nova Peça'}</Text>

          <Text className="mb-1">Nome da Peça:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={editingPart ? editingPart.nome : newPart.nome}
            onChangeText={(text) => handleChangeText('nome', text)}
            placeholder="Nome da Peça"
          />

          <Text className="mb-1">Código:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={editingPart ? editingPart.codigo : newPart.codigo}
            onChangeText={(text) => handleChangeText('codigo', text)}
            placeholder="Código da Peça"
          />

          <Text className="mb-1">Fornecedor:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={editingPart ? editingPart.fornecedor : newPart.fornecedor}
            onChangeText={(text) => handleChangeText('fornecedor', text)}
            placeholder="Fornecedor"
          />

          <Text className="mb-1">Quantidade:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={String(editingPart ? editingPart.quantidade : newPart.quantidade)}
            onChangeText={(text) => handleChangeText('quantidade', Number(text))}
            keyboardType="numeric"
            placeholder="Quantidade"
          />

          <Text className="mb-1">Status:</Text>
          <TextInput
            className="mb-2 p-2 border border-gray-300 rounded"
            value={editingPart ? editingPart.status : newPart.status}
            onChangeText={(text) => handleChangeText('status', text)}
            placeholder="Status da Peça"
          />

          <TouchableOpacity className="bg-blue-500 p-3 rounded" onPress={handleFormSubmit}>
            <Text className="text-white text-center font-bold">Salvar</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={parts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-gray-200 rounded">
            <TouchableOpacity>
              <Text className="text-lg font-semibold">Nome: {item.nome}</Text>
              <Text>Código: {item.codigo}</Text>
              <Text>Fornecedor: {item.fornecedor}</Text>
              <Text>Quantidade: {item.quantidade}</Text>
              <Text className="font-semibold">STATUS: <View style={{ backgroundColor: statusColors[item.status], padding: 5, borderRadius: 5 }}>
                  <Text className="text-white">{item.status}</Text>
                </View>
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity className="bg-yellow-500 p-3 rounded" onPress={() => handleEdit(item)}>
                <Text className="text-white text-center font-bold">Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-red-500 p-3 rounded" onPress={() => handleDelete(item.id)}>
                <Text className="text-white text-center font-bold">Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PartsScreen;
