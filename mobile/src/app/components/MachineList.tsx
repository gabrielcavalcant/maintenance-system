import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// Tipos para os parâmetros da rota
type RootStackParamList = {
  MachineScreen: undefined; // Defina outros tipos de tela aqui
  MaintenanceScreen: { id: string }; // Exemplo de parâmetro esperado na tela de manutenção
};

type MachineListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'MachineScreen'>; // Tipo de navigation
};

const MachineList: React.FC<MachineListProps> = ({ navigation }) => {
  const handleNavigate = (id: string) => {
    navigation.navigate('MaintenanceScreen', { id });
  };

  return (
    <View>
      <Text>Lista de Máquinas</Text>
      {/* Exemplo de botão que navega para a tela de manutenção */}
      <Button title="Ver Manutenção" onPress={() => handleNavigate('1')} />
    </View>
  );
};

export default MachineList;
