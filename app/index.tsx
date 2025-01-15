import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { TextInput } from 'react-native-paper';
import { API } from "./service/api-service";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Index() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isError, setError] = useState(false);
  const [showPass, setPass] = useState(false);

  useEffect(() => {
    checkUsers()
  }, [])

  const checkUsers = async () => {
    const userDetails = JSON.parse(await AsyncStorage.getItem("userDetails") || '{}');
    if (userDetails.name) {
      router.navigate('/(tabs)/home')
    }
  }

  const handleInputChange = (key: string, value: string) => {
    setError(false);
    setFormData({ ...formData, [key]: value });
  };

  const handleSignup = () => {
    AsyncStorage.setItem("userDetails", JSON.stringify(formData));
    axios.post(API.USERS(), formData).then(e => {
      router.navigate('/(tabs)/home')
      setError(false);
    }).catch((e) => {
      setError(true);
    })
  };

  return (
    <ThemedView style={styles.container}>
      <Image source={require('@/assets/images/rakbank.png')} style={{ alignSelf: 'center', height: 130, width: 350 }} />
      <ThemedText style={styles.title}>Create Account</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleInputChange("name", value)}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
        left={<TextInput.Icon icon="email" />}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => handleInputChange("password", value)}
        secureTextEntry={!showPass}
        right={<TextInput.Icon icon={!showPass ? 'eye' : 'eye-off'} onPress={() => {
          setPass(!showPass);
        }} />}
        left={<TextInput.Icon icon="lock" />}
      />
      <ThemedText style={{ marginBottom: 25, width: '100%' }}>By Clicking SIgnup you have agreed to our
        <Link href="/" >
          <ThemedText style={{ marginStart: 10 }} type="link"> Terms and Condition </ThemedText>
        </Link>
      </ThemedText>
      {isError && <ThemedText style={{ color: 'red' }}>Please check all the details are valid</ThemedText>}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <ThemedText style={{ marginTop: 20, width: '100%' }}>Already have an account?
        <Link href="/">
          <ThemedText type="link"> Login </ThemedText>
        </Link>
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    width: '100%',
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 30,
  },
  input: {
    width: "100%",
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#FF2E17",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});