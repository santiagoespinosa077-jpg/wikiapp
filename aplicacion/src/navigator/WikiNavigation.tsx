import { createStackNavigator } from "@react-navigation/stack";
import { WikiHome } from "../screens/WikiHome";
import { WikiDetail } from "../screens/WikiDetail";
import { NewWikiList } from "../interfaces/wikiResponse";

export type WikiParams = {
    WikiHome: undefined;
    WikiDetail: {NewWikiList: NewWikiList};
}

const Stack = createStackNavigator<WikiParams>();

export const WikiNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="WikiHome"
            screenOptions={{
                headerMode: 'float',
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
            >
            <Stack.Screen 
                name='WikiHome'
                component={WikiHome}
            />
            <Stack.Screen 
                name='WikiDetail'
                component={WikiDetail}
            />
        </Stack.Navigator >
    );
}