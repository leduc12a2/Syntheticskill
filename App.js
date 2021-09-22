import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, Calculator, Onboarding, TabRadio, DemoApp, ReadPaper, QuizApp, MyCV } from './src/screens'
import { dataMainButton, height } from './src/utils';
import { ButtonCustom } from './src/screens/QuizApp/QuizApp';
import Icon from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { cancelGame } from './src/redux/slice/GameSlice';

const Stack = createNativeStackNavigator();
const StackDemoApp = createNativeStackNavigator();

function StackDemoAppScreens(props) {
  return (
    <StackDemoApp.Navigator initialRouteName="DemoAppScreen">
      <StackDemoApp.Screen name="DemoAppScreen" component={DemoApp} />
      <StackDemoApp.Screen name="ReadPaper" component={ReadPaper} />
    </StackDemoApp.Navigator>
  );
}

export default function App() {
  const dispatch = useDispatch()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MyCV" component={MyCV} />
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Tab Radio" component={TabRadio} />
        <Stack.Screen name="DemoApp" component={StackDemoAppScreens}
          options={() => ({
            headerShown: false,
            headerTitle: false,
          })}
        />
        <Stack.Screen name="QuizApp" component={QuizApp}
          options={(props) => ({
            headerLeft: propsH => {
              return (
                <TouchableOpacity 
                onPress={()=> {
                    dispatch(cancelGame())
                    props.navigation.goBack()
                }}
                {...propsH}
                >
                  <Icon name='back' size={30} />
                </TouchableOpacity>
              )
            }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
