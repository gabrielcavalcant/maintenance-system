import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, Modal, TouchableOpacity } from 'react-native';

type TeamMember = {
  id: string;
  name: string;
};

type Team = {
  id: string;
  teamName: string;
  location: string;
  members: TeamMember[];
};

const initialTeams: Team[] = [
  {
    id: '1',
    teamName: 'Equipe Alpha',
    location: 'São Paulo',
    members: [
      { id: '1', name: 'João Silva' },
      { id: '2', name: 'Maria Souza' },
    ],
  },
  {
    id: '2',
    teamName: 'Equipe Beta',
    location: 'Rio de Janeiro',
    members: [
      { id: '3', name: 'Carlos Pereira' },
      { id: '4', name: 'Ana Oliveira' },
    ],
  },
];

const TeamScreen: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [teamName, setTeamName] = useState('');
  const [location, setLocation] = useState('');
  const [members, setMembers] = useState('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleAddTeam = () => {
    if (!teamName || !location || !members) return;
    const newTeam: Team = {
      id: String(teams.length + 1),
      teamName,
      location,
      members: members.split(',').map(name => ({ id: String(Math.random()), name: name.trim() })),
    };
    setTeams([...teams, newTeam]);
    setTeamName('');
    setLocation('');
    setMembers('');
  };

  const handleDelete = (id: string) => {
    Alert.alert('Excluir Equipe', 'Tem certeza que deseja excluir esta equipe?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        onPress: () => setTeams(teams.filter((team) => team.id !== id)),
      },
    ]);
  };

  const handleEdit = (team: Team) => {
    setSelectedTeam(team);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (selectedTeam) {
      setTeams(teams.map((team) => (team.id === selectedTeam.id ? selectedTeam : team)));
      setIsEditing(false);
      setSelectedTeam(null);
    }
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-5">Cadastro de Equipes</Text>
      
      <Text className="text-gray-600 mb-1">Nome da Equipe</Text>
      <TextInput
        className="border border-gray-300 p-4 rounded-lg mb-4"
        placeholder="Nome da Equipe"
        value={teamName}
        onChangeText={setTeamName}
      />

      <Text className="text-gray-600 mb-1">Local de Trabalho</Text>
      <TextInput
        className="border border-gray-300 p-4 rounded-lg mb-4"
        placeholder="Local de Trabalho"
        value={location}
        onChangeText={setLocation}
      />

      <Text className="text-gray-600 mb-1">Membros (separados por vírgula)</Text>
      <TextInput
        className="border border-gray-300 p-4 rounded-lg mb-4"
        placeholder="Membros (separados por vírgula)"
        value={members}
        onChangeText={setMembers}
      />

      <TouchableOpacity className="bg-blue-500 p-3 rounded mb-4" onPress={handleAddTeam}>
        <Text className="text-white text-center font-bold">Adicionar Equipe</Text>
      </TouchableOpacity>

      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-gray-200 rounded">
            <Text className="text-lg">Equipe: {item.teamName}</Text>
            <Text>Local: {item.location}</Text>
            <Text>Membros: {item.members.map(member => member.name).join(', ')}</Text>
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
        ListHeaderComponent={() => <View style={{ height: 20 }} />} // Adiciona espaço entre os campos e a lista
      />

      <Modal visible={isEditing} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-white">
          <View className="w-80 p-5 bg-gray-100 rounded">
            <Text className="text-lg font-bold mb-2">Editar Equipe</Text>
            <TextInput
              className="border border-gray-300 p-2 mb-2"
              placeholder="Nome da Equipe"
              value={selectedTeam?.teamName}
              onChangeText={(text) => setSelectedTeam({ ...selectedTeam!, teamName: text })}
            />
            <TextInput
              className="border border-gray-300 p-2 mb-2"
              placeholder="Local de Trabalho"
              value={selectedTeam?.location}
              onChangeText={(text) => setSelectedTeam({ ...selectedTeam!, location: text })}
            />
            <TextInput
              className="border border-gray-300 p-2 mb-2"
              placeholder="Membros (separados por vírgula)"
              value={selectedTeam?.members.map(member => member.name).join(', ')}
              onChangeText={(text) => setSelectedTeam({ ...selectedTeam!, members: text.split(',').map(name => ({ id: String(Math.random()), name: name.trim() })) })} 
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

export default TeamScreen;
