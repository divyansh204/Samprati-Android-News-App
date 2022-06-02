import React from 'react';
import {  StyleSheet, Text, View, TextInput, Alert, SafeAreaView ,TouchableOpacity} from 'react-native';
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class Password extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newEmail: "",
    };
  }

  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  // Changes user's Email...
  onChangeEmailPress = () => {
    
    if(!this.state.currentPassword.trim() && !this.state.newEmail.trim())
    {
        alert('Please Enter Current Password and New Email')
        return;
    }
     if(!this.state.currentPassword.trim())
    {
        alert('Please Enter Current Password')
        return;
    }
    if(!this.state.newEmail.trim())
    {
        alert('Please Enter New Email')
        return;
    }

    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
    user.updateEmail(this.state.newEmail).then( async () => {
        alert("Email is updated and a verification mail has been sent")

        firestore()
            .collection("users")            //The collection method returns a CollectionReference class, which provides properties and methods to query and fetch the data from Cloud Firestore. We can also directly reference a single document on the collection by calling the doc method:
            .doc(auth().currentUser.uid)
            .update({
                email: this.state.newEmail,
            })
            .then(() => {
                console.log('User Updated !');
            })
           await auth().currentUser.sendEmailVerification(); 

      }).catch((error) => { console.log(error.message); });
    }).catch((error) => { console.log(error.message) });
  }
  
  render() {
    return (
      <SafeAreaView style={styles.mainContainer} behavior="padding">
             <View style={styles.inputContainer}>
                 <TextInput 
                    placeholder='Current Password'
                    style={styles.inputStyle}
                    autoCapitalize="none" 
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText = {text => { this.setState({currentPassword: text}) }}
                />

                 <TextInput 
                    placeholder='New Email'
                    style={styles.inputStyle}
                    autoCapitalize="none" 
                    autoCorrect={false}
                    onChangeText = {text => { this.setState({newEmail: text}) }}
                />
             </View>

            <View style={styles.wrapper}>
                <TouchableOpacity 
                    onPress={this.onChangeEmailPress}
                    style={styles.button}    
                >
                    <Text style={styles.buttonText}>CHANGE EMAIL</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "royalblue",
        // backgroundImage
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
});