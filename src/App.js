import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyC9HGRyVr_k0gPLmmRIlPG3434PixEnwnk",
  authDomain: "agamirproperty-3ab7c.firebaseapp.com",
  projectId: "agamirproperty-3ab7c",
  storageBucket: "agamirproperty-3ab7c.appspot.com",
  messagingSenderId: "595210585776",
  appId: "1:595210585776:web:a7b79bf97f5d07f0051d75",
};

firebase.initializeApp(firebaseConfig);

class SignInScreen extends Component {
  state = {
    isSignedIn: false,
  };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }));
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div className="container">
          <h1>FirebaseUI-React</h1>
          <h1> with Firebase Authentication</h1>

          <p>Please sign-in:</p>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    }
    return (
      <div className="container">
        <h1>FirebaseUI-React</h1>
        <h1> with Firebase Authentication</h1>
        <p>
          Welcome {firebase.auth().currentUser.displayName}! You are now
          signed-in!
        </p>
        <img
          id="photo"
          className="pic"
          src={firebase.auth().currentUser.photoURL}
        />
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );
  }
}

export default SignInScreen;
