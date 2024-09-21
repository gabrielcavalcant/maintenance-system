import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from "./pages/home";
import Search from "./pages/details";
import MachineScreen from './pages/MachineScreen';
import MaintenanceScreen from './pages/MaintenanceScreen';
import CreateMaintenanceRequestScreen from './pages/CreateMaintenanceScreen';
import PartsScreen from './pages/PartsScreen';

type RootStackParamList = {
  Home: undefined;
  MachineScreen: undefined;
  MaintenanceScreen: undefined;
  Details: {name: string; email: string};
  CreateMaintenanceScreen: undefined;
  PartsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={Search} />
        <Stack.Screen name="MachineScreen" component={MachineScreen} />
        <Stack.Screen name="MaintenanceScreen" component={MaintenanceScreen} />
        <Stack.Screen name="CreateMaintenanceScreen" component={CreateMaintenanceRequestScreen} />
        <Stack.Screen name="PartsScreen" component={PartsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
