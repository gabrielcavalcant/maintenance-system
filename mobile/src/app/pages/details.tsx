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

const Search: React.FC<Props> = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-2xl mb-5 font-bold">Bem-vindo!</Text>

      <View className="flex-row justify-around w-full">
        {/* Ícone para MachineScreen */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MachineScreen")}
          className="items-center"
        >
          <Icon name="robot" size={50} color="blue" />
          <Text className="mt-2 text-lg">Machine</Text>
        </TouchableOpacity>

        {/* Ícone para MaintenanceScreen */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MaintenanceScreen")}
          className="items-center"
        >
          <Icon name="tools" size={50} color="green" />
          <Text className="mt-2 text-lg">Maintenance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
