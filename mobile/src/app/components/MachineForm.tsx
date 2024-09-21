import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const MachineForm = ({ visible, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [location, setLocation] = useState('');
  const [maintenanceHistory, setMaintenanceHistory] = useState('');

  const handleSubmit = () => {
    if (onCreate) {
      const newMachine = { name, type, model, manufactureDate, serialNumber, location, maintenanceHistory };
      onCreate(newMachine);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Cadastro de Máquina</Text>
          <TextInput placeholder="Nome" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Tipo" value={type} onChangeText={setType} style={styles.input} />
          <TextInput placeholder="Modelo" value={model} onChangeText={setModel} style={styles.input} />
          <TextInput placeholder="Data de Fabricação" value={manufactureDate} onChangeText={setManufactureDate} style={styles.input} />
          <TextInput placeholder="Número de Série" value={serialNumber} onChangeText={setSerialNumber} style={styles.input} />
          <TextInput placeholder="Localização" value={location} onChangeText={setLocation} style={styles.input} />
          <TextInput placeholder="Histórico de Manutenção" value={maintenanceHistory} onChangeText={setMaintenanceHistory} style={styles.input} />

          <View style={styles.buttonContainer}>
            <Button title="Cadastrar" onPress={handleSubmit} />
            <View style={styles.spacing} />
            <Button title="Fechar" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  spacing: {
    height: 15, // Espaçamento entre os botões
  },
});

export default MachineForm;
