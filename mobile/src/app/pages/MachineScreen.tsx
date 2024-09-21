import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Button, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigations/types';
import MachineList from '../components/MachineList'; // Importando o componente MachineList

type MachineListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MachineScreen'
>;

type Props = {
  navigation: MachineListNavigationProp;
};

const MachineListScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-5">Lista de Máquinas</Text>

      {/* Componente MachineList gerenciando as máquinas e o formulário */}
      <MachineList navigation={navigation} />
    </View>
  );
};

export default MachineListScreen;
