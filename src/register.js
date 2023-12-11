import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { TableList } from "./table";
import { Picker } from "@react-native-picker/picker";


const toastConfig = {
  
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        height:50
      }}
    />
  ),

}

export const Registering = ({ navigation, props}) => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [course, setcourse] = useState("Select Course");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [data, setData] = useState([]);
  const [idCounter, setIdCounter] = useState(1);

  const courseList = ["Select Course", "BS Information Technology", "BS Computer Science", "BS Criminology",
     "BSIT - Food Preparation and Services Management", "BS Electrical Technology", "BS Electronics Technology"];

  const getStoredIdCounter = async () => {
    try {
      const storedIdData = await AsyncStorage.getItem("idCounter");
      if (storedIdData) {
        return parseInt(storedIdData);
      } else {
        return 0;
      }
    } catch (err) {
      console.error("Error fetching ID counter from AsyncStorage:", err);
      return 1;
    }
  };

  const generateId = async () => {
    const idCounter = await getStoredIdCounter();
    const newId = idCounter + 1;

    try {
      await AsyncStorage.setItem("idCounter", newId.toString());
    } catch (err) {
      console.error("Error saving ID counter to AsyncStorage:", err);
    }

    return newId;
  };

  const save = async () => {
    if (course === "Select Course") {
      showToast("Please select a valid course");
      return;
    }

    const newId = await generateId();
    const newData = {
      id: newId,
      firstname,
      lastname,
      course,
      username,
      password,
    };

    try {
      await AsyncStorage.setItem(`Student_${newData.id}`, JSON.stringify(newData));
    } catch (err) {
      console.error("Error saving student data to AsyncStorage:", err);
    }

    setData([...data, newData]);

    showToast("Data added successfully");
    <Toast/>

    clearInputs();
  };

  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position:"bottom",
      contentContainerStyle:{
      marginTop:200
      }

    });
  };


  const clearInputs = () => {
    setfirstname('');
    setlastname('');
    setcourse('Select Course');
    setUsername('');
    setpassword('');
  };



    return (
        <View style={styles.container}>
            <View style={{marginTop:50}}></View>
            <TextInput placeholder='Firstname' placeholderTextColor={'gray'} style={styles.input} onChangeText={(firstname) => setfirstname(firstname)} onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)} />
            <TextInput placeholder="Lastname" placeholderTextColor={'gray'} style={styles.input} onChangeText={(lastname) => setlastname(lastname)}  onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}/>

            <Picker
                selectedValue={course}
                placeholderTextColor={'gray'}
                onValueChange={(course) => setcourse(course)}
                style={styles.input}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
            >
                {courseList.map((item, index) => (
                    <Picker.Item key={index} label={item} value={item} />
                ))}
            </Picker>

            <View style={styles.divider} />

            <TextInput placeholder="Username" placeholderTextColor={'gray'} style={styles.input} onChangeText={(username) => setUsername(username)} onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}/>
            <TextInput placeholder="Password" placeholderTextColor={'gray'} style={styles.input} onChangeText={(password) => setpassword(password)}  secureTextEntry={true} onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}/>

            <View style={{marginTop: 30}}></View>

            <TouchableOpacity style={styles.addStudent} onPress={() => save()}>
                <Text style={styles.text1}>Add Student</Text>
                <Toast/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.viewStudent} onPress={() => navigation.navigate('Table')}>
                <Text style={styles.text1}>View Student List</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      display:"flex",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding:50
    },
    
    input: {
      backgroundColor: 'white',
      borderColor: 'gray',
      width: 200,
      height: 50,
      borderRadius: 10,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      fontFamily: 'Arial',
      fontSize: 15
    },
    addStudent: {
      bottom: 10,
      width: 180,
      height: 50,
      marginTop: 40,
      backgroundColor: '#5D3FD3',
      paddingVertical: 13,
    },
    viewStudent: {
      bottom: 10,
      width: 180,
      height: 50,
      marginTop: 10,
      backgroundColor: '#5D3FD3',
      paddingVertical: 13,
    },
    text1: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
    },
    divider: {
      padding: 10,
    }
})