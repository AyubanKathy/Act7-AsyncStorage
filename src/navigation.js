import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Registering} from './register';
import { TableList } from './table';


  const forFade = ({ current, next }) => {
    const opacity = Animated.add(
      current.progress,
      next ? next.progress : 0
    ).interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    });

    return {
      theme
    };
  };

const Stack = createStackNavigator();

  function MyStacks() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Registering}
          options={{
            headerTitle:"",
            headerTransparent:'transparent',
          }}
        />
        <Stack.Screen
          name="Table"
          component={TableList}
          options={{
            headerTitle:"",
            headerTransparent:'transparent',
          }}
        />


      </Stack.Navigator>
    );
  }
export const MyStack = () => {
  return (
    <MyStacks/>
  );
};