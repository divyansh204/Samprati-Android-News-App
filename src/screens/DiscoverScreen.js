import React, { useContext } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  BackHandler,
  Linking,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { NewsContext } from "../API/Context";
import { categories, sources, local} from '../API/api'
import Search from "../components/Search";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from '@react-navigation/native';
import { useBackHandler } from '@react-native-community/hooks';

const DiscoverScreen = () => {
  const { setCategory, setSource, darkTheme  } = useContext(NewsContext);

  const navigation = useNavigation();

  // Width for the entire Window
  const windowWidth = Dimensions.get("window").width;
  //Width for one single item
  const SLIDE_WIDTH = Math.round(windowWidth / 3.5);

  const SignOut = () => {
    navigation.navigate("HomeScreen");
  }

  function backActionHandler() {
      Alert.alert("Hold on!", "Are you sure you want to exit the app ?", [
        {
          text: "Cancel",         // if user presses cancel then remain in the same screen
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp(),    // if yes the exit from the application
       }]);
      return true;
  }

  useBackHandler(backActionHandler);  // if the user presses backbutton then the user gets an alert

  return (
    <ScrollView style={{backgroundColor: darkTheme ? "#282C35" : "white"}}>
    <View>
        <StatusBar style="auto"/> 
    <View style = {styles.discover}>
      {/* {search} */}    
      <Search />
      {/* {categories} */}
      <Text style={{...styles.subtitle, color: darkTheme ?  "white" : "black" }}>Categories</Text>
      <Carousel 
      layout={"default"}
      data={categories}
      renderItem={({ item, index }) =>{
        return (
          <TouchableOpacity
            style={styles.category}
            // setting the category to the item name
            onPress={() => setCategory(item.name)}>
            <Image source={{ uri: item.pic }} style={styles.categoryImage} />
            {/* Styles for item */}
            <Text style={{ ...styles.name, color: darkTheme ? "white" : "black" }}>{item.name}</Text>
          </TouchableOpacity>
          );}}
        // height and width of the Window 
        sliderWidth={windowWidth} 
        itemWidth={SLIDE_WIDTH}
        activeSlideAlignment={"start"}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
      {/* {sources} */}
      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}
      >
        Sources
      </Text>
        <View style={styles.sources}>
          {sources.map((s) => (
            <TouchableOpacity
            // setting the Source for the item name
              onPress={() => setSource(s.id)}
              key={s.id}
              style={styles.sourceContainer}>

              <Image source={{ uri: s.pic }} style={styles.sourceImage} />
            </TouchableOpacity>
          ))}
        </View>
      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}
      >
        Local News
      </Text>
      <View style={styles.sources}>
            {local.map((s) => (
            <TouchableOpacity
            // setting the Source for the item name
              onPress={() => Linking.openURL('https://news.google.com/topics/CAAqHAgKIhZDQklTQ2pvSWJHOWpZV3hmZGpJb0FBUAE/sections/CAQiUENCSVNOam9JYkc5allXeGZkakpDRUd4dlkyRnNYM1l5WDNObFkzUnBiMjV5Q3hJSkwyMHZNREU1YW14eGVnc0tDUzl0THpBeE9XcHNjU2dBKjEIACotCAoiJ0NCSVNGem9JYkc5allXeGZkako2Q3dvSkwyMHZNREU1YW14eEtBQVABUAE?hl=en-IN&gl=IN&ceid=IN%3Aen')}
              key={s.id}
              style={styles.sourceContainer}>
            <Image source={{ uri: s.pic }} style={styles.sourceImage} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.lout}>
          <TouchableOpacity
            onPress={SignOut} 
            style={styles.left}
            >
            <Text
            style={{ ...styles.subtitle, color: darkTheme ? "lightgrey" : "black" }}
          >
          
            <MaterialCommunityIcons
              name="logout"
              size={35}
              color="#007FFF"
            />
          </Text>

          </TouchableOpacity>
            
        </View>
     </View>
    </View>
    </ScrollView>
  );
};

// Styles and Dimensions for the category button

const styles = StyleSheet.create({
  discover: {
      padding: 20,
      alignItems: "center",
      color: 'yellow',
  },
  subtitle:{
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
    marginHorizontal: 5,
    borderBottomColor: "#007FFF",
    borderBottomWidth: 5,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  name: {
    fontSize: 11,
    paddingTop: 10,
    paddingLeft: 0,
    textTransform: "capitalize",
  },
  sname: {
    fontSize: 0,
    
    paddingTop: -2,
    paddingLeft: 15,
    paddingBottom: 125,
    textTransform: "capitalize",
  },
  lname: {
    fontSize: 12,
    
    paddingTop: -2,
    paddingLeft: 15,
    paddingBottom: 125,
    textTransform: "capitalize",
  },
  logoutname: {
    fontSize: 12,
    paddingTop: 2,
    paddingLeft: -1,
    textTransform: "capitalize",
  },
  // Dimensions of the category Image
  categoryImage: {
    height: "75%",
    width: "150%",
    resizeMode: "contain",
  },
  category: {
    height: 130,
    margin: 10,
    flexWrap : "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  // Dimensions of the SourceImage
  sourceImage: {
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },

  // Dimensions of the Sources
  sources: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  localsources: {
    // flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-around",
    paddingRight: 235,
    paddingVertical: 15,
  },

  // Dimensions of the Source-Container
  sourceContainer: {
    height: 150,
    width: "40%",
    borderRadius: 10,
    margin: 15,
    backgroundColor: "#cc313d",
  },
  lout: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  left: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "14.4%",
    justifyContent: "space-between",
  },
});

export default DiscoverScreen;