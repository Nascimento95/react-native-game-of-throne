import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState }  from 'react';
import { StyleSheet, Text, View, FlatList, Image, Modal, Alert, Pressable, Button } from 'react-native';


export default function App() {
  const [ personnage , setPersonnage] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    fetch( `https://thronesapi.com/api/v2/Characters`)
        .then(reponse => reponse.json())
        .then(data => setPersonnage(data))
  }, []);

  console.log(personnage);
  if(personnage === null){
    return <Text>chargement ..</Text>
  }

  return (
    <View style={styles.container}>
      
        <Text>game of trone</Text>
        <StatusBar style="auto" />
        <FlatList 
          horizontal= {true}
          data={personnage}
          renderItem= {({item}) =>
            <View style={card.container}>
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles1.centeredView}>
                    <View style={styles1.modalView}>
                      <Text style={styles1.modalText}>okok</Text>
                      <View style={button.container}>
                        <Button
                          style={[styles1.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles1.textStyle}>Hide Modal</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                </Modal>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: `${item.imageUrl}`,
                }}
              />
              <Text>{item.fullName}</Text> 
            </View>
          } 

          keyExtractor={item => item.id}
        />

    </View>
  );
}
const button = StyleSheet.create({
  container: {
    
    borderColor: "black",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // display: 'flex',
  },
  tinyLogo: {
    
    width: 100,
    height: 100,
  },
});

const card = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "black",
  },
});
const styles1 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
