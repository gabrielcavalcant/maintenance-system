import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function MachineForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    // Lógica de envio
  };

  return (
    <View className="p-4">
      <Text className="text-lg mb-2">Cadastro de Máquinas</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        className="border p-2 mb-4"
      />
      <TextInput
        placeholder="Tipo"
        value={type}
        onChangeText={setType}
        className="border p-2 mb-4"
      />
      <TextInput
        placeholder="Modelo"
        value={model}
        onChangeText={setModel}
        className="border p-2 mb-4"
      />
      <TextInput
        placeholder="Número de Série"
        value={serialNumber}
        onChangeText={setSerialNumber}
        className="border p-2 mb-4"
      />
      <TextInput
        placeholder="Localização"
        value={location}
        onChangeText={setLocation}
        className="border p-2 mb-4"
      />
      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
}
