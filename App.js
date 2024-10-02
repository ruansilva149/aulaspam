import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import socket from "./socket"; // Certifique-se de que o socket está configurado corretamente

export default function App() {
  const [room] = useState('default'); // Define a sala padrão
  const [messageUser1, setMessageUser1] = useState('');
  const [messageUser2, setMessageUser2] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  const sendMessageUser1 = () => {
    if (messageUser1.trim()) { // Verifica se a mensagem não está vazia
      socket.emit('send_message_user1', { room, message: messageUser1 });
      setMessageUser1('');
    }
  };

  const sendMessageUser2 = () => {
    if (messageUser2.trim()) { // Verifica se a mensagem não está vazia
      socket.emit('send_message_user2', { room, message: messageUser2 });
      setMessageUser2('');
    }
  };

  useEffect(() => {
    socket.emit('join_room', room);

    socket.on('receive_message', (msg) => {
      setReceivedMessages(prevMessages => [...prevMessages, msg]); // Armazena a mensagem recebida
    });

    return () => {
      socket.off('receive_message'); // Remove o listener ao desmontar
    };
  }, [room]);

  const getLastMessage = (sender) => {
    const filteredMessages = receivedMessages.filter(msg => msg.sender === sender);
    return filteredMessages.length > 0 ? filteredMessages[filteredMessages.length - 1].message : 'Nenhuma mensagem recebida';
  };

  return (
    <View style={styles.container}>
      <View style={styles.formulario1}>
        <Text style={styles.title}>Canal: {room}</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem"
          value={messageUser1}
          onChangeText={setMessageUser1}
        />
        <Pressable style={styles.button} onPress={sendMessageUser1}>
          <Text style={styles.buttonText}>Enviar mensagem</Text>
        </Pressable>
        <Text style={styles.receivedMessageTitle}>Mensagem recebida:</Text>
        <Text style={styles.receivedMessage}>{getLastMessage('user2')}</Text> {/* Mensagem do usuário 2 */}
      </View>

      <View style={styles.formulario2}>
        <Text style={styles.title}>Canal: {room}</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem"
          value={messageUser2}
          onChangeText={setMessageUser2}
        />
        <Pressable style={styles.button} onPress={sendMessageUser2}>
          <Text style={styles.buttonText}>Enviar mensagem</Text>
        </Pressable>
        <Text style={styles.receivedMessageTitle}>Mensagem recebida:</Text>
        <Text style={styles.receivedMessage}>{getLastMessage('user1')}</Text> {/* Mensagem do usuário 1 */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#ffff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  receivedMessageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  receivedMessage: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
    textAlign: 'center',
  },
  formulario1: {
    marginBottom: 50,
  },
  formulario2: {
    marginBottom: 50,
  },
});
