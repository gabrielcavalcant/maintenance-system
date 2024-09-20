import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from "./pages/home";
import Search from "./pages/details";
import MachineScreen from './pages/MachineScreen';
import MaintenanceScreen from './pages/MaintenanceScreen';

type RootStackParamList = {
  Home: undefined;
  MachineScreen: undefined;
  MaintenanceScreen: undefined;
  Details: {name: string; email: string};
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
