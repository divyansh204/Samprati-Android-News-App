import React, {useCallback, useState} from "react";
import {Text,TouchableOpacity,View,StyleSheet} from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import { useBackHandler } from "@react-native-community/hooks";

function Home({ navigation }) { //Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. 
                            //Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

        const [username, setUsername] = useState('');
                            
        function getUserZipCode(documentSnapshot) {
            return documentSnapshot.get('name');
        }

        firestore()
            .collection("users")
            .doc(auth().currentUser.uid)
            .get()
            .then(documentSnapshot => getUserZipCode(documentSnapshot))
            .then(zipCode => {
                    setUsername(zipCode);
                    console.log('Users name is: ', zipCode);
        });
    
        useBackHandler(useCallback(
           () => {
                navigation.goBack();
            return true;
           }
        ))

        const handleSignOut = () => {
        auth()
        .signOut()
        .then(() => {
            navigation.replace("Sign In")
        })
        .catch(error => alert(error.message))
    }
    
    return (
        <View style={styles.container}>
             <Text style={{fontSize: 17, color: "white"}}>USERNAME: {username}</Text> 
            <Text style={{fontSize: 17, color: "white"}}>EMAIL: {auth().currentUser?.email}</Text>
            <TouchableOpacity  
                onPress={handleSignOut}
                style={styles.button}>
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity  
               onPress={() => navigation.navigate("Password")}
                style={styles.button}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity  
                onPress={() => navigation.navigate("Email")}
                style={styles.button}>
                <Text style={styles.buttonText}>Change Email</Text>
            </TouchableOpacity>
            <TouchableOpacity  
                onPress={() => navigation.navigate("Name")}
                style={styles.button}>
                <Text style={styles.buttonText}>Change User Name</Text>
            </TouchableOpacity>
        </View>
    )     
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 80,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "royalblue",
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        // marginVertical: 0,
        marginBottom: -20,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
})

export default Home;