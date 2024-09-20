import React from "react";
import { View } from "react-native";
import MachineList from "../components/MachineList";
import { StackNavigationProp } from "@react-navigation/stack";

type MachineScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MachineScreen"
>;

type Props = {
  navigation: MachineScreenNavigationProp;
};
export type RootStackParamList = {
  MachineScreen: undefined;
  MaintenanceScreen: { id: string }; // Defina os parâmetros da tela de manutenção
};

export default function MaintenanceScreen({ navigation }: Props) {
  return (
    <View className="flex-1">
      <MachineList navigation={navigation} />
    </View>
  );
}
