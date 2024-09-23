import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigations/types';

type TeamMember = {
  id: string;
  name: string;
};

const initialTeam: TeamMember[] = [];

const TeamScreen: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeam);
  const [name, setName] = useState('');

  const handleAddMember = () => {
    if (!name) return;
    const newMember: TeamMember = { id: String(teamMembers.length + 1), name };
    setTeamMembers([...teamMembers, newMember]);
    setName('');
  };

  const handleDelete = (id: string) => {
    Alert.alert('Excluir Membro', 'Tem certeza que deseja excluir este membro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        onPress: () => setTeamMembers(teamMembers.filter((member) => member.id !== id)),
      },
    ]);
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-5">Cadastro de Equipe</Text>
      <TextInput
        className="border border-gray-300 p-4 rounded-lg mb-4"
        placeholder="Nome do Membro"
        value={name}
        onChangeText={setName}
      />
      <Button title="Adicionar Membro" onPress={handleAddMember} />

      <FlatList
        data={teamMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-gray-200 rounded">
            <Text className="text-lg">{item.name}</Text>
            <Button title="Excluir" onPress={() => handleDelete(item.id)} color="red" />
          </View>
        )}
      />
    </View>
  );
};

export default TeamScreen;
