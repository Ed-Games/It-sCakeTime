import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import Profile from '../../pages/Profile/Profile';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import ViewProfileProducts from '../../pages/ViewProfileProducts/ViewProfileProducts';


const Stack = createStackNavigator()


export default function ViewProfileProductsScreen() {

    const navigation = useNavigation()
    function handleNavigateToPreviousPage(){
        navigation.goBack()
    }

    return(
        <Stack.Navigator>
             <Stack.Screen name="ViewProfileProducts" component={ViewProfileProducts} options={{
                headerStyle: header,
                headerTitleStyle: title,
                title: '',
                headerRight: () => (
                    <Feather
                    name="menu"
                    size={25}
                    color="#FFF"
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
                  />
                ),
                headerLeft: ()=> (
                    <Feather  
                    name="arrow-left" 
                    size={24} 
                    color='#FFF'
                    onPress={handleNavigateToPreviousPage} />
                )
          }} />
        </Stack.Navigator>
    )
}

const header = {
    backgroundColor: '#9553A0',
    elevation: 0,
    shadowOpacity: 0,
}

const title = {
    fontSize: 20,
    fontFamily: 'Archivo_600SemiBold',
    color: '#FFF',
    marginLeft: 14,
    marginRight: 50,
    width: 315,
}