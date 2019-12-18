import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput
} from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";
import * as Api from "../../../services/api";
import ContinueButton from "../components/continueButton";
import BackButton from "../components/backButton";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class ReviewAddRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
      selected: null,
      restaurant: "",
      colorIndex: 1,
      backgroundColor: null,
      restaurants: "",
      searchWord: "",
      searchResult: null,
      imageID: null,
      token: null
    };
  }
  componentDidMount = async () => {
    const imageID = this.props.navigation.getParam("imageID", "0");
    const token = this.props.navigation.getParam("token", "0");
    this.setState({ imageID, token });
    await this.getAllMenus(token);
  };

  async getAllMenus(token) {
    try {
      const response = await fetch(Api.SERVER_GET_RESTAURANTS, {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-auth-token": token,
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const responseJson = await response.json();
        const restaurants = responseJson.map(index => ({
          restaurantID: index.restaurantID.toString(),
          name: index.name
        }));
        this.setState({ restaurants });
      }
      if (!response.ok) {
        console.log("Fetching menus failed");
      }
    } catch (e) {
      console.log("ERROR fetching restaurants", e);
    }
  }

  setSelected(id, restaurant) {
    this.setState({ selected: id, restaurant: restaurant });
    this.setState({ disableButton: false });
  }

  updateSearchText = searchWord => {
    this.setState({ searchWord });
  };

  searchBySearchWord(restaurants, searchWordOriginal) {
    if (!restaurants) {
      return null;
    }
    const searchWord = searchWordOriginal.toLowerCase();
    const result = [];
    restaurants.map(restaurant => {
      if (restaurant.name.toLowerCase().includes(searchWord)) {
        result.push(restaurant);
      }
    });
    if (result.length < 1) {
      return null;
    }
    return result;
  }

  getSearchResult() {
    const searchWord = this.state.searchWord;
    if (searchWord === "") {
      this.setState({ searchResult: this.state.restaurants });
    } else {
      const searchResult = this.searchBySearchWord(
        this.state.restaurants,
        searchWord
      );
      this.setState({ searchResult });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={Typography.FONT_H3_BLACK}>Choose Restaurant</Text>
          </View>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={[styles.searchBar, { marginTop: 20 }]}>
            <TouchableOpacity value={this.state.searchWord}>
              <Icon name={"search"} size={22} color={Colors.PINK} />
            </TouchableOpacity>
            <TextInput
              style={[Typography.FONT_INPUT, styles.textInput]}
              placeholder="Search..."
              placeholderTextColor={Colors.GRAY_MEDIUM}
              onChangeText={this.updateSearchText}
              value={this.state.searchWord}
              onSubmitEditing={() => this.getSearchResult()}
            />
          </View>
        </View>
        <View style={styles.resultList}>
          <SafeAreaView>
            <FlatList
              data={
                this.state.searchResult
                  ? this.state.searchResult
                  : this.state.restaurants
              }
              extraData={this.state}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.setSelected(item.restaurantID, item.name)}
                  style={{
                    backgroundColor:
                      this.state.selected === item.restaurantID
                        ? Colors.TURQUOISE
                        : Colors.WHITE
                  }}
                >
                  <Text
                    style={[
                      Typography.FONT_H4_BLACK,
                      {
                        marginVertical: 10,
                        marginLeft: 50
                      }
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.restaurantID}
            />
          </SafeAreaView>
        </View>
        <ContinueButton
          disableButton={this.state.disableButton}
          navigation={this.props}
          id={this.state.selected}
          imageID={this.state.imageID}
          restaurant={this.state.restaurant}
          token={this.state.token}
          view={"ReviewAddMenu"}
          text={"CONTINUE"}
          colorIndex={this.state.colorIndex}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1
  },
  resultList: {
    flex: 6
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 42,
    width: 240,
    borderBottomColor: Colors.PINK,
    borderBottomWidth: 1.5,
    marginLeft: 7
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  }
});