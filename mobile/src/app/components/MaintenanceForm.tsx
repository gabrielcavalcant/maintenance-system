import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker } from 'react-native';
import { TeamMember } from '../navigations/types'; // Certifique-se de ter o tipo definido

type MaintenanceFormProps = {
  onClose: () => void;
  onSubmit: (data: any) => void;
  teamMembers: TeamMember[];
};

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ onClose, onSubmit, teamMembers }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Baixa');
  const [responsible, setResponsible] = useState<string | null>(null);
  const [status, setStatus] = useState('Pendente');
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    const maintenanceData = {
      description,
      date,
      priority,
      responsible,
      status,
      comments,
    };
    onSubmit(maintenanceData);
    onClose();
  };

  return (
    <View className="p-5">
      <Text className="text-xl mb-4">Cadastro de Manutenção</Text>
      <TextInput placeholder="Descrição do Problema" value={description} onChangeText={setDescription} />
      <TextInput placeholder="Data da Solicitação" value={date} onChangeText={setDate} />
      <Picker selectedValue={priority} onValueChange={setPriority}>
        <Picker.Item label="Baixa" value="Baixa" />
        <Picker.Item label="Média" value="Média" />
        <Picker.Item label="Alta" value="Alta" />
      </Picker>
      <Picker selectedValue={responsible} onValueChange={setResponsible}>
        <Picker.Item label="Selecione o Responsável" value={null} />
        {teamMembers.map(member => (
          <Picker.Item key={member.id} label={member.name} value={member.id} />
        ))}
      </Picker>
      <TextInput placeholder="Comentários" value={comments} onChangeText={setComments} />
      <Button title="Cadastrar" onPress={handleSubmit} />
      <Button title="Fechar" onPress={onClose} />
    </View>
  );
};

export default MaintenanceForm;
