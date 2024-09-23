// navigations/types.ts

// Definindo os tipos de parâmetros para cada rota
export type RootStackParamList = {
  HomeScreen: undefined;
  MachineScreen: undefined;
  MaintenanceScreen: undefined;
  TeamScreen: undefined; // Verifique se está aqui
  CreateMaintenanceScreen: undefined;
  Details: { name: string; email: string };
};

// Definindo a interface para os parâmetros que a tela MaintenanceScreen recebe
export interface MaintenanceScreenProps {
  title: string;
  id: number;
}

