import React from "react";
import { mount } from "enzyme";
import Search from "./Search";
import * as SearchFile from "./Search";
import { AsyncStorage as storage } from "react-native";

const setUp = (props = {}) => {
  return mount(<Search {...props} />);
};

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjI5LCJpYXQiOjE1NjE5OTg2NjB9.SWYMJXTTM8pe6NQw1QwS-d8Btt6Isuzzk5JtH775uV0";

const obj1 = {
  id: 1,
  menuName: "testing",
  restaurantName: "restaurant",
  tags: [],
  score: 4,
  price: 25,
  image: "amazon.com",
  distance: 0.1
};

const obj2 = {
  id: 2,
  menuName: "testing",
  restaurantName: "restaurant",
  tags: [],
  score: 5,
  price: 20,
  image: "amazon.com",
  distance: 0.25
};
const obj3 = {
  id: 3,
  menuName: "testing",
  restaurantName: "restaurant",
  tags: [],
  score: 3,
  price: 30,
  image: "amazon.com",
  distance: 0.2
};

const searchResults = [obj1, obj2, obj3];

describe("Search Component", () => {
  let component;

  beforeEach(async () => {
    const navigation = {
      navigate: jest.fn(),
      getParam: (param, defaultValue) => defaultValue,
      addListener: (param, func) => func()
    };

    await storage.setItem("userToken", userToken);

    jest
      .spyOn(Search.prototype, "findCoordinates")
      .mockImplementationOnce(() => Promise.resolve());

    component = setUp({ navigation });
    fetch.resetMocks();
    jest.useFakeTimers();
  });

  it("ComponentDidMount", async () => {
    await component.instance().componentDidMount();
    await component.update();
    expect(component.state().token).toEqual(userToken);
    expect(component.state().isLoaded).toBeTruthy();
  });

  it("Should render without errors", () => {
    const wrapper = component.find("TouchableWithoutFeedback");
    expect(wrapper.length).toBe(1);
  });

  it("Should render heading text", () => {
    const wrapper = component.findWhere(
      node => node.prop("testID") === "heading" && node.type() === "View"
    );
    expect(wrapper.text()).toBe("What do you want to eat today?");
  });

  it("Should render a search field", () => {
    const field = component.findWhere(
      node =>
        node.prop("testID") === "searchField" && node.type() === "TextInput"
    );
    expect(field.length).toBe(1);
  });

  it("Should render search results when resultsData is not empty", () => {
    component.setState({ searchWord: "pizza" });

    const mockData = [
      {
        id: 1,
        menuName: "Menu",
        restaurantName: "Restaurant",
        tags: [{ name: "italian", color: "#00000" }],
        score: 5
      },
      {
        id: 2,
        menuName: "Menu2",
        restaurantName: "Restaurant2",
        tags: [{ name: "italian", color: "#00000" }],
        score: 4
      }
    ];

    component.instance().getResults = jest.fn(() => {
      component.setState({ searchResults: mockData, searched: true });
    });
    component.update();
    component.instance().validateSearch();

    const list = component.find("ResultItem");

    expect(list.length).toBe(2);
  });

  it("Should not render searchResults list when no searchResults after searching", () => {
    component.setState({ searchWord: "pizza" });
    const mockData = [];
    component.instance().getResults = jest.fn(() => {
      component.setState({ searchResults: mockData, searched: true });
    });
    component.update();
    component.instance().validateSearch();

    const list = component.find("ResultItem");

    expect(list.length).toBe(0);
  });

  it("Should render noResults-image when no search results after searching", () => {
    component.setState({ searchWord: "pizza" });
    const mockData = [];
    component.instance().getResults = jest.fn(() => {
      component.setState({ searchResults: mockData, searched: true });
    });
    component.update();
    component.instance().validateSearch();

    const view = component.findWhere(
      node => node.props("testID") === "noResultsView" && node.type() === "View"
    );

    expect(view).toBeTruthy();
  });

  it("Should fail when invalid searchword", () => {
    component.setState({ searchWord: ".." });

    component.instance().validateSearch();

    expect(component.state().searched).toBeTruthy();
    expect(component.state().searchResults).toBeNull();
    expect(component.state().searchError).toBeTruthy();
  });

  it("Should show sortBy-modal", () => {
    component.setState({ modalVisible: true });
    component.update();
    const modal = component.find("Modal");

    expect(modal.length).toBe(1);
  });

  it("Should set modal visible correctly", () => {
    const oldVisible = component.state().modalVisible;
    component.instance().setModalVisible();
    expect(component.state().modalVisible).toBe(!oldVisible);
  });

  it("Should update searchtext correctly", () => {
    const searchWord = "pizza";
    component.instance().updateSearchText(searchWord);
    expect(component.state().searchWord).toBe(searchWord);
    expect(component.state().searched).toBeFalsy();
  });

  it("Should remove sort criteria", () => {
    const sortBy = "Price (low-high)";
    component.setState({ selectedSorting: sortBy });
    component.instance().setSorting(sortBy);
    expect(component.state().selectedSorting).toBe("");
  });

  it("Should set sort criteria", () => {
    const sortBy = "Price (low-high)";
    component.setState({ selectedSorting: "" });
    component.instance().setSorting(sortBy);
    expect(component.state().selectedSorting).toBe(sortBy);
  });

  it("Should sort results by price low-high", () => {
    const sortBy = "Price (low-high)";
    component.setState({ searchResults, selectedSorting: sortBy });

    component.instance().applySorting();
    component.update();

    expect(component.state().searchResults).toEqual([obj2, obj1, obj3]);
  });

  it("Should sort results by price high-low", () => {
    const sortBy = "Price (high-low)";
    component.setState({ searchResults, selectedSorting: sortBy });

    component.instance().applySorting();
    component.update();

    expect(component.state().searchResults).toEqual([obj3, obj1, obj2]);
  });

  it("Should sort results by review", () => {
    const sortBy = "Review";
    component.setState({ searchResults, selectedSorting: sortBy });

    component.instance().applySorting();
    component.update();

    expect(component.state().searchResults).toEqual([obj2, obj1, obj3]);
  });

  it("Should sort results by distance", () => {
    const sortBy = "Distance";
    component.setState({ searchResults, selectedSorting: sortBy });

    const locationPermission = true;
    const latitude = "24,539045";
    const longitude = "23,932052";

    component.instance().findCoordinates = jest
      .fn()
      .mockImplementationOnce(() => {
        component.setState({ locationPermission, latitude, longitude });
      });

    component.instance().applySorting();
    component.update();

    expect(component.state().searchResults).toEqual([obj1, obj3, obj2]);
  });

  it("Should return right price category", () => {
    expect(SearchFile.getPriceCategory(31)).toBe("$$$$");
    expect(SearchFile.getPriceCategory(25)).toBe("$$$");
    expect(SearchFile.getPriceCategory(15)).toBe("$$");
    expect(SearchFile.getPriceCategory(8)).toBe("$");
    expect(SearchFile.getPriceCategory()).toBe("");
  });

  it("Should get results successfully", async () => {
    const mockData = [
      {
        menu: {
          menuID: 1,
          name: "Menu",
          tags: [{ name: "italian", color: "#00000" }],
          rating: 5,
          averagePrice: 23
        },
        restaurantData: {
          restaurantName: "Restaurant",
          restaurantImageLink: "link",
          distance: 0.2
        }
      },
      {
        menu: {
          menuID: 2,
          name: "Menu2",
          tags: [{ name: "italian", color: "#00000" }],
          rating: 4,
          averagePrice: 23
        },
        restaurantData: {
          restaurantName: "Restaurant2",
          restaurantImageLink: "link2",
          distance: 0.1
        }
      }
    ];

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 201, ok: true });

    await component.instance().getResults();

    expect(component.state().searchResults).toEqual([
      {
        id: "1",
        menuName: "Menu",
        restaurantName: "Restaurant",
        tags: [{ name: "italian", color: "#00000" }],
        score: 5,
        price: 23,
        image: "link",
        distance: 0.2
      },
      {
        id: "2",
        menuName: "Menu2",
        restaurantName: "Restaurant2",
        tags: [{ name: "italian", color: "#00000" }],
        score: 4,
        price: 23,
        image: "link2",
        distance: 0.1
      }
    ]);
  });
});
