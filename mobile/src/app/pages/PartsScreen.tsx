import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Button, Alert } from "react-native";

interface Part {
  id: string;
  name: string;
  code: string;
  supplier: string;
  quantity: number;
  status: "OK" | "Out of Stock";
}

const PartsScreen = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [currentPartId, setCurrentPartId] = useState<string | null>(null);

  const addPart = () => {
    if (!name || !code || !supplier || quantity <= 0) {
      Alert.alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const newPart: Part = {
      id: Date.now().toString(),
      name,
      code,
      supplier,
      quantity,
      status: quantity > 0 ? "OK" : "Out of Stock",
    };

    setParts((prev) => [...prev, newPart]);
    clearForm();
  };

  const editPart = (part: Part) => {
    setEditMode(true);
    setCurrentPartId(part.id);
    setName(part.name);
    setCode(part.code);
    setSupplier(part.supplier);
    setQuantity(part.quantity);
  };

  const updatePart = () => {
    if (!currentPartId) return;

    const updatedParts = parts.map((part) => {
      if (part.id === currentPartId) {
        return {
          ...part,
          name,
          code,
          supplier,
          quantity,
          status: quantity > 0 ? "OK" : "Out of Stock",
        };
      }
      return part;
    });

    setParts(updatedParts);
    clearForm();
  };

  const deletePart = (id: string) => {
    const updatedParts = parts.filter((part) => part.id !== id);
    setParts(updatedParts);
  };

  const clearForm = () => {
    setName("");
    setCode("");
    setSupplier("");
    setQuantity(0);
    setEditMode(false);
    setCurrentPartId(null);
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl mb-5">Registro de Peças</Text>

      <TextInput
        placeholder="Nome da Peça"
        value={name}
        onChangeText={setName}
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Código"
        value={code}
        onChangeText={setCode}
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Fornecedor"
        value={supplier}
        onChangeText={setSupplier}
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Quantidade"
        value={String(quantity)}
        onChangeText={(text) => setQuantity(Number(text))}
        keyboardType="numeric"
        className="border p-2 mb-2"
      />

      <Button title={editMode ? "Atualizar Peça" : "Adicionar Peça"} onPress={editMode ? updatePart : addPart} />

      <FlatList
        data={parts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="border p-3 mb-2">
            <Text>{item.name}</Text>
            <Text>Código: {item.code}</Text>
            <Text>Fornecedor: {item.supplier}</Text>
            <Text>Quantidade: {item.quantity}</Text>
            <Text>Status: {item.status}</Text>
            <Button title="Editar" onPress={() => editPart(item)} />
            <Button title="Excluir" onPress={() => deletePart(item.id)} color="red" />
          </View>
        )}
      />
    </View>
  );
};

export default PartsScreen;
