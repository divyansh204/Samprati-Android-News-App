import React, { useState } from 'react';
import { Text,View,StyleSheet,TextInput, TouchableOpacity, Alert, SafeAreaView, BackHandler, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useBackHandler } from '@react-native-community/hooks';

const Login = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function backActionHandler() {
      Alert.alert("Hold on!", "Are you sure you want to exit the app ?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp(),
       }]);
      return true;
    }

    useBackHandler(backActionHandler);

    const handleLogIn = async () => {

        //Check for both email and password
        if(!email.trim() && !password.trim())
        {
            alert('Please Enter Email and Password')
            return;
        }

        //Check for the Email TextInput
        if (!email.trim()) {
            alert('Please Enter Email');
            return;
        }
        //Check for the password TextInput
        if (!password.trim()) {
            alert('Please Enter Password');
            return;
        }
            const user = await auth().signInWithEmailAndPassword(email,password)
            .then(async (userCredentials) => {
                console.log(userCredentials.user);
                if(userCredentials.user.emailVerified) {
                navigation.replace("Tabs");
                } else {
                    alert('Please Verify Your Email Checkout Inbox');

                    await auth().currentUser.sendEmailVerification();
                } 
            })
            .catch(error => alert(error.message))
    
    }

    return (
        <SafeAreaView style={styles.mainContainer} behavior="padding">
             <View style={styles.inputContainer}>
                 <TextInput 
                    placeholder='Email'
                    style={styles.inputStyle}
                    autoCapitalize="none" 
                    autoCorrect={false}
                    value = {email}
                    onChangeText = {text => setEmail(text) }
                />

                 <TextInput 
                    placeholder='Password'
                    style={styles.inputStyle}
                    autoCapitalize="none" 
                    autoCorrect={false}
                    value = {password}
                    onChangeText = {text => setPassword(text)}
                    secureTextEntry={true}
                />
             </View>

            <View style={styles.wrapper}>

                <TouchableOpacity 
                    onPress={handleLogIn}
                    style={styles.button}    
                >
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => navigation.navigate("Sign Up")}
                    style={[styles.button, styles.buttonOutline]}    
                >
                    <Text style={styles.buttonOutlineText}>NEW ACCOUNT</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
      
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    inputStyle: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    wrapper: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    sourceContainer: {
        height: 80,
        width: "40%",
        borderRadius: 10,
        margin: 15,
    },
    anonymous: {
        position: "absolute",
        left: 0,
        height: "60%",
        width: "100%",
        resizeMode: "contain",
    }
})

export default Login;