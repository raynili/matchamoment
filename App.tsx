import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MatchaProvider } from './src/context/MatchaContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { AddLogScreen } from './src/screens/AddLogScreen';
import { LogDetailScreen } from './src/screens/LogDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  AddLog: { logId?: string };
  LogDetail: { logId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MatchaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#7fb069',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShadowVisible: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              headerShown: false, // Home has its own custom header
            }}
          />
          <Stack.Screen 
            name="AddLog" 
            component={AddLogScreen}
            options={({ route }) => ({
              title: route.params?.logId ? 'Edit Log' : 'New Log',
              headerBackTitle: 'Back',
            })}
          />
          <Stack.Screen 
            name="LogDetail" 
            component={LogDetailScreen}
            options={{
              title: 'Matcha Details',
              headerBackTitle: 'Back',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MatchaProvider>
  );
}
