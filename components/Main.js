import React, { Component } from 'react';
import { 
  Image,
  View, 
  Text,
  TextInput, 
  TouchableOpacity,
  StyleSheet,
  Button
  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Main extends Component {
  state = { name: '' }

  imageUrl = "https://cloud-cube.s3.amazonaws.com/ejxafk1ovc76/public/penguin.png";
  
  onChangeText = name => this.setState({ name });

  onPress = () => this.props.navigation.navigate('Chat', { name: this.state.name }); 

  render() {
    return <View>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>Enter your name :</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="John Cena"
              value={this.state.name}
              onChangeText={this.onChangeText}
            />
            <Image source={{ uri: this.imageUrl }} style={ styles.image } />
            
            <TouchableOpacity onPress={this.onPress}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <View style={ styles.buttonText } >
              <Button
              icon={
    <Icon
      name="arrow-right"
      size={15}
      color="white"
    />
  }
                onPress={this.onPress}
                title="Talk!"/>
            </View>
          </View>
          
    ;
  }
}

const offset = 24;
const styles = StyleSheet.create({
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
    color: '#F60'
  },
  subtitle: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset * 2/3,
    color: '#888'
  },
  buttonText: { // 5.
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
    marginRight: offset,
    maxWidth: offset * 5,
    borderColor: 'blue',
    borderWidth: 1
  },
  image: {
    marginLeft: offset,
    marginRight: offset,
    width: "100%",
    height: 159,
    resizeMode: 'contain'
  }
});

export default Main;
