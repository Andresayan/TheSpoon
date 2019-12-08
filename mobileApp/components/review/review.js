import React, { Component } from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isLoaded: false
    };
  }

  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      AsyncStorage.getItem("userToken").then(token => {
        this.setState({ loggedIn: token !== null, isLoaded: true });
      });
    });
  };
  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    const RenderLogin = props => {
      return props.navigation.navigate("Login", { parent: "Review" });
    };
    if (!this.state.isLoaded) {
      console.log("REVIEW IS LOADING");
      return <ActivityIndicator />;
    }
    if (this.state.isLoaded) {
      console.log("Usertoken in reviewPage: ", this.state.loggedIn);
      if (this.state.loggedIn) {
        return (
          <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
              <Text style={Typography.FONT_H2_PINK}>Write </Text>
              <Text style={Typography.FONT_H2_BLACK}>Review</Text>
            </View>
            <View style={styles.imageBox}>
              <Image source={require("../../assets/addImage.png")} />
            </View>
            <Text style={Typography.FONT_H4_BLACK}>
              Upload a picture of the receipt
            </Text>
            <Text style={Typography.FONT_MED_GRAY}>
              We use this to confirm the review
            </Text>
            <Text style={Typography.FONT_H4_BLACK}>
              What did you eat/drink?
            </Text>
            <TouchableOpacity>
              <Text>Restaurant</Text>
              <Text>None</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reviewButton}>
              <Text style={Typography.FONT_H4_WHITE}>POST REVIEW</Text>
            </TouchableOpacity>
          </View>
        );
      } if(!this.state.loggedIn) {
        return <RenderLogin {...this.props} />;
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  imageBox: {
    height: 63,
    width: 63,
    backgroundColor: Colors.GRAY_MID_LIGHT,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  reviewButton: {
    backgroundColor: Colors.PINK,
    borderRadius: 50
  }
});
