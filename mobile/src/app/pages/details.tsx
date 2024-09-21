import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigations/types";

// Tipos das propriedades recebidas
type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Dashboard: React.FC<Props> = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-2xl mb-5 font-bold">Dashboard</Text>

      <View className="flex-row justify-around w-full">
        {/* Ícone para listagem de Máquinas */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MachineScreen")}
          className="items-center"
        >
          <Icon name="robot" size={50} color="blue" />
          <Text className="mt-2 text-lg">Máquinas</Text>
        </TouchableOpacity>

        {/* Ícone para Histórico de Manutenções */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MaintenanceScreen")}
          className="items-center"
        >
          <Icon name="tools" size={50} color="green" />
          <Text className="mt-2 text-lg">Manutenções</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-around w-full mt-10">
        {/* Ícone para criar Solicitações de Manutenção */}
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateMaintenanceScreen")}
          className="items-center"
        >
          <Icon name="file-document-edit" size={50} color="purple" />
          <Text className="mt-2 text-lg">Solicitações</Text>
        </TouchableOpacity>

        {/* Ícone para registro de Peças */}
        <TouchableOpacity
          onPress={() => navigation.navigate("PartsScreen")}
          className="items-center"
        >
          <Icon name="cog" size={50} color="orange" />
          <Text className="mt-2 text-lg">Peças</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;
