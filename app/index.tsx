import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Checkbox, HelperText, TextInput } from 'react-native-paper';
import { API } from "./service/api-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';


export default function Index() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false
  });
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showPass, setPass] = useState(false);
  const [cheked, setCheked] = useState(false);

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
    setTouched({ ...touched, [key]: true })
    setFormData({ ...formData, [key]: value });
  };

  const handleSignup = () => {
    setLoading(true);
    if (!(formData.name && formData.email && (formData.password.length >= 8))) {
      setLoading(false);
      return;
    }
    AsyncStorage.setItem("userDetails", JSON.stringify(formData));
    axios.post(API.USERS(), formData).then(e => {
      router.navigate('/(tabs)/home')
      setError(false);
    }).catch((e) => {
      setError(true);
      router.navigate('/(tabs)/home')
    }).finally(() => {
      setLoading(false);
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
      {touched.name && !formData.name && <HelperText type="error" visible={!formData.name}>
        This filed is required
      </HelperText>
      }
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
        left={<TextInput.Icon icon="email" />}
        keyboardType="email-address"
      />
      {touched.email && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) && <HelperText type="error" visible={!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))}>
        Email address is invalid!
      </HelperText>
      }
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
      {touched.password && <HelperText type="error" visible={formData.password.length <= 8}>
        Password should atleast 8 char
      </HelperText>
      }
      <ThemedView style={{ flexDirection: 'row', padding: 10, alignContent: 'stretch' }}>
        <ThemedText>
          <Checkbox color="#FF2E17" status={cheked ? "checked" : "unchecked"} onPress={() => {
            setCheked(!cheked)
          }} />
        </ThemedText>
        <ThemedText style={{ marginBottom: 25, marginStart: 10 }}>
          <ThemedText style={{ paddingBottom: 100 }}> By Clicking SIgnup you have agreed to our </ThemedText>
          <Link href="https://www.rakbank.ae/en/islamic/help-centre/product-terms-kfs/terms-and-conditions" >
            <ThemedText style={{ marginStart: 10 }} type="link" > Terms and Condition </ThemedText>
          </Link>
        </ThemedText>
      </ThemedView>
      {isError && <ThemedText style={{ color: 'red' }}>Someting went wrong please check the connection</ThemedText>}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        style={{ width: '100%', marginTop: 20 }}
        color={GoogleSigninButton.Color.Light}
      />
      <ThemedText style={{ marginTop: 20, width: '100%' }}>
        <ThemedText >Already have an account?</ThemedText>
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