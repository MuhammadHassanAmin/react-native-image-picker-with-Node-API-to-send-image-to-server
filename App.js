import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
export default class ButtonBasics extends Component {

  state = {
    photo: null,
    avatarSource: null,
    test:null,  
  }
  
  handleChoosePhoto = () => {
    const options = {
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {

        this.setState({ photo: response });
        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,

        });
        this.uploadImage(source);
        debugger;

      }

    })
  }
  uploadImage = (image_uri) => {

    let uploadData = new FormData();
    uploadData.append('file', this.state.avatarSource)



    uploadData.append('image', image_uri);
    var postData = {
     img: image_uri,
     
    };
    
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    
    axios.post('http://192.168.0.117:8000/upload', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })


    // axios("http://192.168.0.117:8000/upload" ,{
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    
    //   },
    //   uploadData
    // })
    //   .then(function (response) {
    //     //handle success

    //     console.log(response);
    //   })
    //   .catch(function (response) {
    //     //handle error

    //     console.log(response);
    //   });

    // axios.post("http://192.168.0.117:8000/upload="+image_uri, { // receive two parameter endpoint url ,form data 
    // })
    //   .then(res => {
    //     Alert.alert(res.statusText);
    //     console.log(res.statusText)
    //   })


    // fetch(base_url, {
    //   method: 'post',
    //   body: uploadData
    // }).then(response => response.json())
    //   .then(response => {
    //     //check response here
    //   }).catch(() => {
    //     Alert.alert("Error On Network...");
    //   })
  }

  render() {
    const { photo } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.h1}>
          <Text style={styles.Heading}>
            Upload Your Image
          </Text>
          <View style={styles.btnUploadImage}>
            <Button onPress={this.handleChoosePhoto}
              title="Upload Image"></Button>
          </View>
        </View>
        <View style={styles.h2}>
          <View style={styles.h2V1}>
            {
              photo &&
              (

                <Image source={this.state.avatarSource}
                  style={styles.imgContainer}
                />
              )
            }
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  h1: {
    flex: 1,
    justifyContent: 'center',
    alignContent: "center"
  },
  h2: {
    flex: 2,
    flexDirection: "row"
  },
  h2V1: {
    flex: 5,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
  },
  imgContainer: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignSelf: "center"
  },
  Heading: {
    color: 'red',
    flexDirection: "row",
    textAlign: "center",
    fontSize: 22,
    paddingBottom: 30
  },
  btnUploadImage: {
    paddingHorizontal: 20,
    justifyContent: "center"
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => ButtonBasics);
