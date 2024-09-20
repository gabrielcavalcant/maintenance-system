import { useState } from "react";
import { View, Text, TextInput, Button, Image } from "react-native";

export function HomeScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      {/* Logotipo ou imagem no topo */}
      {/* <Image
        source={require("../images/logo.png")} // Usando require para imagens locais
        className="w-16 h-16 mb-6"
        resizeMode="contain"
      /> */}

      {/* Título de boas-vindas */}
      <Text className="text-3xl font-bold text-gray-800 mb-8">
        GV MANUTEÇÕES
      </Text>

      {/* Campo Nome */}
      <View className="w-full mb-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">Name</Text>
        <TextInput
          className="border border-gray-300 p-4 rounded-lg bg-white"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Campo Email */}
      <View className="w-full mb-6">
        <Text className="text-lg font-semibold text-gray-700 mb-2">Email</Text>
        <TextInput
          className="border border-gray-300 p-4 rounded-lg bg-white"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Botão de Submissão */}
      <Button
        title="Submit"
        onPress={() => navigation.navigate("Details", { name, email })}
        color="#4F46E5" // Cor personalizada para o botão
      />
    </View>
  );
}
