import React, { useState, useCallback } from 'react';
import { Text,View,StyleSheet,TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useBackHandler } from "@react-native-community/hooks";

const Register = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    useBackHandler(useCallback(
           () => {
                navigation.goBack();
            return true;
           }
        ))

    const handleSignUp = async () => {
        //Check for both email and password
        if(!email.trim() && !password.trim() && !name.trim())
        {
            alert('Please Enter Email , Password and Name')
            return;
        }

        //Check for both email and password
        if(!email.trim() && !password.trim())
        {
            alert('Please Enter Email and Password')
            return;
        }
        //Check for both password and name
        if(!password.trim() && !name.trim())
        {
            alert('Please Enter Password and Name')
            return;
        }
        //Check for both email and password
        if(!email.trim() && !name.trim())
        {
            alert('Please Enter email and name')
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
        //Check for the Name TextInput
        if (!name.trim()) {
            alert('Please Enter Name');
            return;
        }
      
                      auth().createUserWithEmailAndPassword(email,password)
                      .then(async () => {
                           firestore()
                            .collection("users")            //The collection method returns a CollectionReference class, which provides properties and methods to query and fetch the data from Cloud Firestore. We can also directly reference a single document on the collection by calling the doc method:
                            .doc(auth().currentUser.uid)
                            .set({
                                name,
                                email,
                            })
                            .then(() => {
                                console.log('User Added !');
                            })

                            alert('Please Verify Your Email Checkout Inbox');

                            await auth().currentUser.sendEmailVerification();
                            navigation.navigate("Sign In");
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

                 <TextInput 
                    placeholder='Name'
                    style={styles.inputStyle}
                    autoCapitalize="none" 
                    autoCorrect={false}
                    value = {name}
                    onChangeText = {text => setName(text)}
                />
             </View>

            <View style={styles.wrapper}>
                <TouchableOpacity 
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}    
                >
                    <Text style={styles.buttonOutlineText}>SIGN UP</Text>
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
})

export default Register;