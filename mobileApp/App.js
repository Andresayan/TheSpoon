import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import LoginScreen from "./components/login/login";
import SearchPage from "./components/search/search";
import LandingPage from "./components/landingpage/landingpage";
import LoadingPage from "./components/loading";
import MenuPage from "./components/menupage/menupage";

import ReviewAddImage from "./components/review/views/reviewAddImage";
import ReviewAddRestaurant from "./components/review/views/reviewAddRestaurant";
import ReviewAddMenu from "./components/review/views/reviewAddMenu";
import ReviewAddItems from "./components/review/views/reviewAddItems";
import ReviewItems from "./components/review/views/reviewItems";
import ReviewOverall from "./components/review/views/reviewOverall";

import ProfilePage from "./components/profile/profile";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Colors from "./styles/colors";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const SearchStack = createStackNavigator(
  {
    Search: SearchPage,
    Loading: LoadingPage,
    Menu: MenuPage
  },
  {
    initialRouteName: "Search",
    header: null,
    headerMode: "none"
  }
);

const ReviewStack = createStackNavigator(
  {
    ReviewAddImage: ReviewAddImage,
    ReviewAddRestaurant: ReviewAddRestaurant,
    ReviewAddMenu: ReviewAddMenu,
    ReviewAddItems: ReviewAddItems,
    ReviewItems: ReviewItems,
    ReviewOverall: ReviewOverall
  },
  {
    initialRouteName: "ReviewAddImage",
    header: null,
    headerMode: "none"
  }
);

const ProfileStack = createStackNavigator(
  {
    Login: LoginScreen,
    Profile: ProfilePage
  },
  {
    initialRouteName: "Profile",
    header: null,
    headerMode: "none"
  }
);

const bottomTabNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" size={32} color={tintColor} />
        )
      }
    },
    AddReview: {
      screen: ReviewStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="add-circle-outline" size={32} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" size={32} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Search",
    tabBarOptions: {
      activeTintColor: "#F3A3A3",
      height: 85
    }
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class App extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      roboto: require("./assets/fonts/roboto-regular.ttf")
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    if (this.state.fontLoaded) {
      console.log("font loaded");
      return (
        <ActionSheetProvider>
          <AppContainer />
        </ActionSheetProvider>
      );
    } else {
      return <LoadingPage />;
    }
  }
}
