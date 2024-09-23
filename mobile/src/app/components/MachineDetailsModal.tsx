// components/MachineDetailsModal.tsx
import React from 'react';
import { View, Text, Modal, Button, Image, StyleSheet, ScrollView } from 'react-native';

interface MachineDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  machine: any; // Tipar conforme necessário
}

const MachineDetailsModal: React.FC<MachineDetailsModalProps> = ({ visible, onClose, machine }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{machine.name}</Text>
          <ScrollView>
            <Text>Tipo: {machine.type}</Text>
            <Text>Modelo: {machine.model}</Text>
            <Text>Data de Fabricação: {machine.manufactureDate}</Text>
            <Text>Número de Série: {machine.serialNumber}</Text>
            <Text>Localização: {machine.location}</Text>

            <Text style={styles.subtitle}>Histórico de Manutenção</Text>
            {machine.maintenanceHistory.map((maintenance: any, index: number) => (
              <View key={index}>
                <Text>{maintenance.date} - {maintenance.description}</Text>
                <Text>Peças Utilizadas: {maintenance.parts.join(', ')}</Text>
              </View>
            ))}

            <Text style={styles.subtitle}>Imagens</Text>
            {machine.images && machine.images.map((image: string, index: number) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </ScrollView>

          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});

export default MachineDetailsModal;
